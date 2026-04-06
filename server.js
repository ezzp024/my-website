const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const BRANDS = [
  { id: 'all', name: 'All Brands', url: 'status.php?brand=all' },
  { id: 'AstroZoom', name: 'AstroZoom', url: 'status.php?brand=AstroZoom' },
  { id: 'Athena', name: 'Athena', url: 'status.php?brand=Athena' },
  { id: 'Atlas', name: 'Atlas', url: 'status.php?brand=Atlas' },
  { id: 'Forge', name: 'Forge', url: 'status.php?brand=Forge' },
  { id: 'Hero', name: 'Hero', url: 'status.php?brand=Hero' },
  { id: 'Kane', name: 'Kane', url: 'status.php?brand=Kane' },
  { id: 'Liquid', name: 'Liquid', url: 'status.php?brand=Liquid' },
  { id: 'Pulse', name: 'Pulse', url: 'status.php?brand=Pulse' },
  { id: 'Vex', name: 'Vex', url: 'status.php?brand=Vex' },
  { id: 'Viper', name: 'Viper', url: 'status.php?brand=Viper' },
  { id: 'Volt', name: 'Volt', url: 'status.php?brand=Volt' }
];

let statusCache = { data: null, timestamp: 0 };
const CACHE_DURATION = 30000; // 30 seconds

async function fetchBrandStatus(brand) {
  const base = 'https://support.cosmotickets.com/status/';
  const loginUrl = base + brand.url;
  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

  try {
    let sessionId = '';

    const initRes = await fetch(loginUrl, {
      headers: { 'User-Agent': userAgent },
      redirect: 'manual'
    });
    const initCookie = initRes.headers.get('set-cookie') || '';
    const initMatch = initCookie.match(/PHPSESSID=([^;]+)/);
    if (initMatch) sessionId = initMatch[1];

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

    const loginSetCookie = loginRes.headers.get('set-cookie') || '';
    const loginMatch = loginSetCookie.match(/PHPSESSID=([^;]+)/);
    if (loginMatch) sessionId = loginMatch[1];
    const location = loginRes.headers.get('location') || '';

    const headers = {
      'Cookie': `PHPSESSID=${sessionId}`,
      'User-Agent': userAgent,
      'Referer': loginUrl
    };

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
        if (!t.includes('Status Login') && t.length > 1000) {
          html = t;
          break;
        }
        if (t.length > html.length) html = t;
      } catch(e) { }
    }

    if (!html || html.includes('Status Login') || html.length < 500) {
      return { brand: brand.name, status: 'unknown', products: [], error: 'Auth failed' };
    }

    const products = parseStatusHtml(html, brand.name);
    const overallStatus = determineOverallStatus(products);
    
    return { brand: brand.name, status: overallStatus, products, error: null };
  } catch (err) {
    return { brand: brand.name, status: 'error', products: [], error: err.message };
  }
}

function determineOverallStatus(products) {
  if (products.length === 0) return 'unknown';
  const hasUpdating = products.some(p => p.status.toLowerCase().includes('updat'));
  const hasTesting = products.some(p => p.status.toLowerCase().includes('test'));
  const hasOffline = products.some(p => p.status.toLowerCase().includes('offline') || p.status.toLowerCase().includes('down'));
  const hasMaintenance = products.some(p => p.status.toLowerCase().includes('maintenance'));
  
  if (hasUpdating) return 'updating';
  if (hasTesting) return 'testing';
  if (hasMaintenance) return 'maintenance';
  if (hasOffline) return 'offline';
  return 'online';
}

function parseStatusHtml(html, brandName) {
  const products = [];
  const clean = (str) => str.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

  // Try to find product name and status in table rows
  const tableRows = html.matchAll(/<tr[^>]*>[\s\S]*?<td[^>]*>([^<]+)<\/td>[\s\S]*?<td[^>]*>([^<]+)<\/td>[\s\S]*?<\/tr>/gi);
  for (const row of tableRows) {
    const name = clean(row[1]);
    const statusRaw = clean(row[2]);
    const status = normalizeStatus(statusRaw);
    if (name && status && name.length < 50) {
      products.push({ name, status });
    }
  }

  // Try div-based patterns
  if (products.length === 0) {
    const divItems = html.matchAll(/<div[^>]*class="[^"]*(?:product|item|status)[^"]*"[^>]*>([\s\S]*?)<\/div>/gi);
    for (const item of divItems) {
      const text = clean(item[1]);
      if (text.length > 3 && text.length < 100) {
        const statusKeywords = ['online', 'offline', 'updating', 'testing', 'maintenance', 'down', 'operational'];
        const lowerText = text.toLowerCase();
        for (const kw of statusKeywords) {
          if (lowerText.includes(kw)) {
            products.push({ name: text.split(kw)[0].trim() || brandName, status: normalizeStatus(kw) });
            break;
          }
        }
      }
    }
  }

  // Fallback: look for any text with status keywords
  if (products.length === 0) {
    const allText = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (allText) {
      const text = clean(allText[1]);
      const statusKeywords = ['updating', 'testing', 'online', 'offline', 'maintenance', 'operational'];
      for (const kw of statusKeywords) {
        const regex = new RegExp(`(${kw})`, 'gi');
        let match;
        while ((match = regex.exec(text)) !== null) {
          const start = Math.max(0, match.index - 30);
          const end = Math.min(text.length, match.index + 50);
          const context = text.substring(start, end);
          const nameMatch = context.match(/([A-Za-z]{3,30})/);
          if (nameMatch) {
            products.push({ name: nameMatch[1], status: normalizeStatus(kw) });
          }
        }
      }
    }
  }

  return products;
}

function normalizeStatus(status) {
  const s = status.toLowerCase();
  if (s.includes('updat')) return 'Updating';
  if (s.includes('test')) return 'Testing';
  if (s.includes('online') || s.includes('operational') || s.includes('working')) return 'Online';
  if (s.includes('offline') || s.includes('down') || s.includes('unavail')) return 'Offline';
  if (s.includes('maintenance')) return 'Maintenance';
  return status || 'Unknown';
}

// Combined status endpoint - fetches all brands
app.get('/api/status', async (req, res) => {
  // Check cache
  const now = Date.now();
  if (statusCache.data && (now - statusCache.timestamp) < CACHE_DURATION) {
    return res.json(statusCache.data);
  }

  try {
    // Fetch all brands in parallel
    const results = await Promise.all(BRANDS.map(brand => fetchBrandStatus(brand)));
    
    const response = {
      success: true,
      brands: results,
      lastUpdated: new Date().toISOString(),
      nextUpdate: new Date(now + CACHE_DURATION).toISOString()
    };

    // Cache the result
    statusCache = { data: response, timestamp: now };
    
    res.json(response);
  } catch (err) {
    console.error('Status proxy error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Single brand status endpoint
app.get('/api/status/:brand', async (req, res) => {
  const brand = BRANDS.find(b => b.id === req.params.brand);
  if (!brand) {
    return res.status(404).json({ success: false, error: 'Brand not found' });
  }

  try {
    const result = await fetchBrandStatus(brand);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get list of all brands
app.get('/api/brands', (req, res) => {
  res.json({ brands: BRANDS.map(b => ({ id: b.id, name: b.name })) });
});

// Serve all pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/guide', (req, res) => res.sendFile(path.join(__dirname, 'public', 'guide.html')));
app.get('/status', (req, res) => res.sendFile(path.join(__dirname, 'public', 'status.html')));
app.get('/commands', (req, res) => res.sendFile(path.join(__dirname, 'public', 'commands.html')));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Cosmo Support running on port ${PORT}`);
});
