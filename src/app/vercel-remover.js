// This script removes the Vercel badge as soon as possible
(function() {
  function removeVercelBadge() {
    // Try to find the badge with various selectors
    const selectors = [
      'a[href*="vercel.com"]',
      '[data-vercel-badge]',
      'div[class*="Vercel"]',
      'a[rel="noopener noreferrer"][target="_blank"]'
    ];
    
    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);
      for (const el of elements) {
        // Check if this is the Vercel badge (it's usually in the bottom-left corner)
        const rect = el.getBoundingClientRect();
        const isBottomLeft = rect.bottom > window.innerHeight - 100 && rect.left < 100;
        
        if (isBottomLeft || el.innerHTML.includes('N') || el.getAttribute('href')?.includes('vercel.com')) {
          el.style.display = 'none';
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        }
      }
    }
  }

  // Run immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeVercelBadge);
  } else {
    removeVercelBadge();
  }

  // Also run after window loads and periodically
  window.addEventListener('load', removeVercelBadge);
  setInterval(removeVercelBadge, 500);
})();
