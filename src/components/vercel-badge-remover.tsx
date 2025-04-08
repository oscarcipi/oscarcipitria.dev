"use client";

import { useEffect } from "react";

export default function VercelBadgeRemover() {
  useEffect(() => {
    // Function to remove the Vercel badge
    const removeVercelBadge = () => {
      // This is the exact structure of the Vercel badge in Next.js 15
      // It's a fixed position element at the bottom left with the letter N
      const vercelBadgeElements = Array.from(document.querySelectorAll('body > div')).filter(div => {
        // Check if it's a direct child of body
        if (div.parentElement !== document.body) return false;
        
        // Check if it has a single anchor child
        if (div.children.length !== 1 || div.children[0].tagName !== 'A') return false;
        
        const anchor = div.children[0] as HTMLAnchorElement;
        
        // Check if it has the Vercel URL or N text content
        if (anchor.href?.includes('vercel.com') || anchor.textContent === 'N') return true;
        
        // Check if it's positioned at bottom left
        const style = window.getComputedStyle(anchor);
        if (style.position === 'fixed' && 
            (style.bottom === '0px' || parseInt(style.bottom) < 20) && 
            (style.left === '0px' || parseInt(style.left) < 20)) {
          return true;
        }
        
        return false;
      });

      // Remove all matching elements
      vercelBadgeElements.forEach(el => {
        (el as HTMLElement).style.display = 'none';
        (el as HTMLElement).style.visibility = 'hidden';
        (el as HTMLElement).style.opacity = '0';
        (el as HTMLElement).style.pointerEvents = 'none';
        el.setAttribute('aria-hidden', 'true');
        
        try {
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        } catch (e) {
          console.error("Failed to remove Vercel badge:", e);
        }
      });
      
      // Also try a more direct approach - find any element with just 'N' text in bottom left
      document.querySelectorAll('*').forEach(el => {
        if (el.textContent === 'N' && el.children.length === 0) {
          const rect = el.getBoundingClientRect();
          if (rect.bottom > window.innerHeight - 100 && rect.left < 100) {
            // Walk up to find a suitable parent to remove
            let current = el;
            for (let i = 0; i < 3; i++) {
              if (!current.parentNode || current.parentNode === document.body) break;
              current = current.parentNode as HTMLElement;
            }
            
            if (current) {
              (current as HTMLElement).style.display = 'none';
              try {
                if (current.parentNode) {
                  current.parentNode.removeChild(current);
                }
              } catch (e) {}
            }
          }
        }
      });
      
      // Additional approach: target the specific structure of the Vercel badge
      // The badge is usually a div with a fixed position anchor containing an N
      const allAnchors = document.querySelectorAll('a');
      allAnchors.forEach(anchor => {
        const style = window.getComputedStyle(anchor);
        if (style.position === 'fixed' && 
            parseInt(style.bottom || '1000') < 50 && 
            parseInt(style.left || '1000') < 50) {
          // This is likely the Vercel badge
          const parent = anchor.parentElement;
          if (parent) {
            parent.style.display = 'none';
            try {
              if (parent.parentNode) {
                parent.parentNode.removeChild(parent);
              }
            } catch (e) {}
          }
        }
      });
    };

    // Run immediately
    removeVercelBadge();
    
    // Run after a short delay to ensure the DOM is fully loaded
    setTimeout(removeVercelBadge, 500);
    
    // Set up a mutation observer to detect if the badge is added dynamically
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
          removeVercelBadge();
        }
      });
    });
    
    // Start observing the document body for DOM changes
    observer.observe(document.body, { 
      childList: true,
      subtree: true 
    });
    
    // Also run periodically for the first few seconds
    const interval = setInterval(removeVercelBadge, 200);
    setTimeout(() => clearInterval(interval), 5000);
    
    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return null;
}
