const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Status proxy - handles login and returns parsed status data
app.get('/api/status', async (req, res) => {
  try {
    const brand = req.query.brand || 'all';
    const base = 'https://support.cosmotickets.com/status/';
    const loginUrl = `${base}status.php?brand=${brand}`;
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

    let sessionId = '';

    // Step 1: GET login page to get a fresh PHPSESSID
    const initRes = await fetch(loginUrl, {
      headers: { 'User-Agent': userAgent },
      redirect: 'manual'
    });
    const initCookie = initRes.headers.get('set-cookie') || '';
    const initMatch = initCookie.match(/PHPSESSID=([^;]+)/);
    if (initMatch) sessionId = initMatch[1];
    console.log('Step 1 - sessionId:', sessionId);

    // Step 2: POST credentials with the session cookie
    const loginRes = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': `PHPSESSID=${sessionId}`,
        'User-Agent': userAgent,
        'Referer': loginUrl,
        'Origin': 'https://support.cosmotickets.com'
      },
      body: 'password=support',
      redirect: 'manual'
    });
    console.log('Step 2 - login status:', loginRes.status);
    const loginSetCookie = loginRes.headers.get('set-cookie') || '';
    const loginMatch = loginSetCookie.match(/PHPSESSID=([^;]+)/);
    if (loginMatch) sessionId = loginMatch[1];
    const location = loginRes.headers.get('location') || '';
    console.log('Step 2 - redirect location:', location, 'sessionId:', sessionId);

    // Step 3: Try multiple approaches to get authenticated data
    const headers = {
      'Cookie': `PHPSESSID=${sessionId}`,
      'User-Agent': userAgent,
      'Referer': loginUrl
    };

    // Try the redirect target first, then the original URL
    const urlsToTry = [];
    if (location) {
      const fullLoc = location.startsWith('http') ? location : base + location.replace(/^\//, '');
      urlsToTry.push(fullLoc);
    }
    urlsToTry.push(loginUrl);
    urlsToTry.push(base + 'index.php');
    urlsToTry.push(`${base}status.php`);

    let html = '';
    for (const url of urlsToTry) {
      try {
        const r = await fetch(url, { headers });
        const t = await r.text();
        console.log(`Trying ${url}: len=${t.length} hasLogin=${t.includes('Status Login')}`);
        if (!t.includes('Status Login') && t.length > 1000) {
          html = t;
          break;
        }
        if (t.length > html.length) html = t;
      } catch(e) { console.warn('URL error:', e.message); }
    }

    if (!html || html.includes('Status Login') || html.length < 500) {
      return res.json({ success: false, error: 'Auth failed - server may be IP-restricted', rawHtml: html });
    }

    const statuses = parseStatusHtml(html);
    res.json({ success: true, statuses, rawHtml: html, timestamp: Date.now() });

  } catch (err) {
    console.error('Status proxy error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

function parseStatusHtml(html) {
  const statuses = [];

  // Common patterns for status pages
  const patterns = [
    // Pattern: product name + status in table rows or divs
    /<tr[^>]*>.*?<td[^>]*>([^<]+)<\/td>.*?<td[^>]*>([^<]+)<\/td>/gis,
    /<div[^>]*class="[^"]*product[^"]*"[^>]*>.*?<span[^>]*>([^<]+)<\/span>.*?<span[^>]*class="[^"]*status[^"]*"[^>]*>([^<]+)<\/span>/gis,
    /<div[^>]*class="[^"]*item[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
  ];

  // Try to extract product-status pairs from HTML
  const clean = (str) => str.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

  // Look for any status-related content
  const statusMatches = html.matchAll(/<[^>]*class="[^"]*(?:status|product|item)[^"]*"[^>]*>([\s\S]*?)<\/(?:div|td|li|span)>/gi);
  for (const m of statusMatches) {
    const text = clean(m[1]);
    if (text.length > 2 && text.length < 200) {
      const statusKeywords = ['online', 'offline', 'updating', 'testing', 'maintenance', 'down', 'operational'];
      const lowerText = text.toLowerCase();
      for (const kw of statusKeywords) {
        if (lowerText.includes(kw)) {
          statuses.push({ raw: text });
          break;
        }
      }
    }
  }

  // Fallback: extract text blocks
  if (statuses.length === 0) {
    const textBlocks = html.matchAll(/<(?:td|div|li|span)[^>]*>([^<]{3,100})<\/(?:td|div|li|span)>/gi);
    for (const m of textBlocks) {
      const text = clean(m[1]);
      if (text && text.length > 2) {
        statuses.push({ raw: text });
      }
    }
  }

  return statuses;
}

// Serve all pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/guide', (req, res) => res.sendFile(path.join(__dirname, 'public', 'guide.html')));
app.get('/status', (req, res) => res.sendFile(path.join(__dirname, 'public', 'status.html')));
app.get('/commands', (req, res) => res.sendFile(path.join(__dirname, 'public', 'commands.html')));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Cosmo Support running on port ${PORT}`);
});
