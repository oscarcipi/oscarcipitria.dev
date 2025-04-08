"use client";

import { useEffect } from "react";

export default function VercelBadgeKiller() {
  useEffect(() => {
    // Function to find and remove the Vercel badge
    const killVercelBadge = () => {
      // Method 1: Find by direct DOM traversal
      const allDivs = document.querySelectorAll("body > div");
      allDivs.forEach((div) => {
        // Check if this div contains a single anchor with the Vercel badge
        if (div.children.length === 1 && div.children[0].tagName === "A") {
          const anchor = div.children[0] as HTMLAnchorElement;
          
          // Check if it's positioned at the bottom left
          const rect = anchor.getBoundingClientRect();
          const isBottomLeft = 
            rect.bottom > window.innerHeight - 100 && 
            rect.left < 100;
          
          // Check if it has the letter N or links to Vercel
          const hasVercelLink = anchor.href?.includes("vercel.com");
          const hasNLetter = anchor.textContent === "N";
          
          if (isBottomLeft || hasVercelLink || hasNLetter) {
            // Found the Vercel badge, remove it
            div.remove();
          }
        }
      });

      // Method 2: Find by specific attributes
      document.querySelectorAll('a[rel="noopener noreferrer"][target="_blank"]').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom > window.innerHeight - 100 && rect.left < 100) {
          if (el.parentElement) {
            el.parentElement.remove();
          }
        }
      });

      // Method 3: Find by position and style
      document.querySelectorAll('a').forEach(a => {
        const style = window.getComputedStyle(a);
        if (style.position === 'fixed' && 
            (style.bottom === '0px' || parseInt(style.bottom || '1000') < 20) && 
            (style.left === '0px' || parseInt(style.left || '1000') < 20)) {
          if (a.parentElement) {
            a.parentElement.remove();
          }
        }
      });

      // Method 4: Find by content
      document.querySelectorAll('*').forEach(el => {
        if (el.textContent === 'N' && el.children.length === 0) {
          let parent = el.parentElement;
          while (parent && parent !== document.body && parent.children.length === 1) {
            const grandparent = parent.parentElement;
            if (grandparent === document.body) {
              parent.remove();
              break;
            }
            parent = grandparent;
          }
        }
      });
    };

    // Run immediately and on load
    killVercelBadge();
    window.addEventListener('load', killVercelBadge);
    
    // Run periodically
    const interval = setInterval(killVercelBadge, 100);
    
    // Set up a mutation observer to detect if the badge is added dynamically
    const observer = new MutationObserver(() => {
      killVercelBadge();
    });
    
    // Start observing the document body for DOM changes
    observer.observe(document.body, { 
      childList: true,
      subtree: true 
    });
    
    // Clean up
    return () => {
      clearInterval(interval);
      observer.disconnect();
      window.removeEventListener('load', killVercelBadge);
    };
  }, []);

  return null;
}
