# Cosmo Support — Staff Portal

A complete internal support website for Cosmo staff with:
- **Support Guide** — All 28 products with requirements, fixes, and keyboard navigation
- **Live Status** — Auto-refreshes every 30s from cosmotickets.com/status
- **Bot Commands** — All Discord bot commands with one-click copy

## Quick Start

### Option A: With Node.js (Full version with Status Proxy)
```bash
npm install
node server.js
```
Then open: http://localhost:5000

### Option B: Static Only (no proxy)
Open `public/index.html` directly in your browser, or serve with any static server:
```bash
npx serve public
```

## Pages
- `/` → Home
- `/guide.html` → Support Guide (28 products, keyboard navigable)
- `/status.html` → Live Status (auto-refreshes)
- `/commands.html` → Bot Commands

## Status Page
The status page tries to authenticate with cosmotickets.com using password `support`.
If authentication fails (due to server-side IP restrictions), a direct link to the live page is shown.

## Keyboard Shortcuts
- `← →` Arrow keys: Navigate products in the Support Guide
- `Ctrl/Cmd + K`: Focus search bar

## File Structure
```
public/
  index.html         - Home page
  guide.html         - Support Guide
  status.html        - Live Status
  commands.html      - Bot Commands
  css/main.css       - All styles
  data/products.js   - All 28 product data
  data/commands-data.js - Bot commands data
server.js            - Express server with status proxy
package.json         - Dependencies
```
