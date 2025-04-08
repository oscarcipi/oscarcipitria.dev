// This script is specifically designed to remove the Vercel "N" badge
(function() {
  function removeVercelBadge() {
    // Find the exact structure of the Vercel badge
    // In Next.js 15, it's usually a div directly under body with a single anchor child
    // The anchor has a fixed position in the bottom left corner
    
    // Method 1: Direct DOM traversal to find the badge
    const bodyChildren = document.body.children;
    for (let i = 0; i < bodyChildren.length; i++) {
      const child = bodyChildren[i];
      
      // Skip if this element is part of the main content
      if (child.id || 
          child.className || 
          child.getAttribute('role') || 
          child.querySelector('nav') || 
          child.querySelector('header') ||
          child.querySelector('main') ||
          child.querySelector('footer') ||
          child.querySelector('button')) {
        continue;
      }
      
      // Check if it's a div with a single anchor child
      if (child.tagName === 'DIV' && child.children.length === 1 && child.children[0].tagName === 'A') {
        const anchor = child.children[0];
        
        // Check if it has the Vercel URL or just the letter N
        if (anchor.href?.includes('vercel.com') || anchor.textContent === 'N') {
          child.style.display = 'none';
          child.remove();
          console.log('Removed Vercel badge (method 1)');
          continue;
        }
        
        // Check if it's positioned at the bottom left
        const rect = anchor.getBoundingClientRect();
        if (rect.bottom > window.innerHeight - 100 && rect.left < 100) {
          child.style.display = 'none';
          child.remove();
          console.log('Removed Vercel badge (method 1 - position)');
          continue;
        }
      }
    }
    
    // Method 2: Find by specific selectors
    const vercelSelectors = [
      'a[href*="vercel.com"]',
      '[data-vercel-badge]',
      'a[rel="noopener noreferrer"][target="_blank"]'
    ];
    
    vercelSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom > window.innerHeight - 100 && rect.left < 100) {
          // This is likely the Vercel badge
          let parent = el.parentElement;
          if (parent) {
            parent.style.display = 'none';
            parent.remove();
            console.log('Removed Vercel badge (method 2)');
          } else {
            el.style.display = 'none';
            el.remove();
            console.log('Removed Vercel badge element (method 2)');
          }
        }
      });
    });
    
    // Method 3: Find by computed style
    document.querySelectorAll('a').forEach(a => {
      const style = window.getComputedStyle(a);
      if (style.position === 'fixed' && 
          (style.bottom === '0px' || parseInt(style.bottom || '1000') < 20) && 
          (style.left === '0px' || parseInt(style.left || '1000') < 20)) {
        
        // This is likely the Vercel badge
        let parent = a.parentElement;
        if (parent) {
          parent.style.display = 'none';
          parent.remove();
          console.log('Removed Vercel badge (method 3)');
        } else {
          a.style.display = 'none';
          a.remove();
          console.log('Removed Vercel badge element (method 3)');
        }
      }
    });
    
    // Method 4: Find by content
    document.querySelectorAll('*').forEach(el => {
      if (el.textContent === 'N' && el.children.length === 0) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom > window.innerHeight - 100 && rect.left < 100) {
          // Walk up to find a suitable parent to remove
          let current = el;
          for (let i = 0; i < 3; i++) {
            if (!current.parentElement || current.parentElement === document.body) break;
            current = current.parentElement;
          }
          
          if (current) {
            current.style.display = 'none';
            current.remove();
            console.log('Removed Vercel badge (method 4)');
          }
        }
      }
    });
  }

  // Run immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeVercelBadge);
  } else {
    removeVercelBadge();
  }
  
  // Run after a short delay to ensure the DOM is fully loaded
  setTimeout(removeVercelBadge, 500);
  setTimeout(removeVercelBadge, 1000);
  setTimeout(removeVercelBadge, 2000);
  
  // Run when the window loads
  window.addEventListener('load', removeVercelBadge);
  
  // Set up a mutation observer to detect if the badge is added dynamically
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        removeVercelBadge();
        return;
      }
    }
  });
  
  // Start observing the document body for DOM changes
  observer.observe(document.body, { 
    childList: true,
    subtree: true 
  });
  
  // Also run periodically for the first few seconds
  const interval = setInterval(removeVercelBadge, 100);
  setTimeout(() => clearInterval(interval), 5000);
})();
