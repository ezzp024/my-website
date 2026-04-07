// DevTools Blocker
(function() {
  var blocker = document.createElement('div');
  blocker.id = 'devtoolsBlocker';
  blocker.style.cssText = 'display:none;position:fixed;inset:0;background:#0b0c12;z-index:999999;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px;';
  blocker.innerHTML = '<div style="font-size:64px;margin-bottom:20px;">🚫</div><h1 style="color:#ef4444;font-size:32px;margin-bottom:20px;">Access Denied</h1><p style="color:#8f96ae;font-size:16px;max-width:400px;line-height:1.6;">Developer tools are not allowed on this system. This is a restricted internal portal.</p>';
  document.body.appendChild(blocker);
  
  var show = function() { blocker.style.display = 'flex'; };
  
  setInterval(function() {
    var w = window.outerWidth - window.innerWidth;
    var h = window.outerHeight - window.innerHeight;
    if (w > 100 || h > 100) show();
  }, 500);
  
  document.addEventListener('keydown', function(e) {
    if ((e.key === 'F12') || ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') || ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J') || ((e.ctrlKey || e.metaKey) && e.key === 'u')) {
      e.preventDefault();
      show();
    }
  });
  
  document.addEventListener('contextmenu', function(e) { e.preventDefault(); show(); });
})();

// Auth check
(async function initAuthUI() {
  try {
    const resp = await cosmoFetch('/api/auth/me');
    const data = await resp.json();
    if (!data || !data.authenticated) {
      window.location.href = 'index.html';
      return;
    }

    if (data.canAdmin) {
      document.querySelectorAll('.admin-only').forEach((el) => {
        el.style.display = '';
      });
    }

    document.querySelectorAll('[data-logout]').forEach((el) => {
      el.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
          await cosmoFetch('/api/auth/logout', { method: 'POST' });
        } catch (_) {}
        window.location.href = 'index.html';
      });
    });
  } catch (_) {
    window.location.href = 'index.html';
  }
})();