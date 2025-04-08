"use client";

import { useEffect } from "react";

export default function RemoveVercelBadge() {
  useEffect(() => {
    // Function to remove the Vercel badge
    const removeVercelBadge = () => {
      // Try multiple selectors to find and remove the badge
      const selectors = [
        '[data-vercel-badge]',
        'a[href*="vercel.com"]',
        '[class*="vercel"]',
        '[aria-label*="Vercel"]',
        // The most specific selector for the badge
        'a[href*="vercel.com"][target="_blank"][rel="noreferrer noopener"]',
      ];

      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (el && el.parentNode) {
            el.parentNode.removeChild(el);
          }
        });
      });
    };

    // Remove immediately
    removeVercelBadge();

    // Set up a mutation observer to remove it if it gets added later
    const observer = new MutationObserver((mutations) => {
      removeVercelBadge();
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, { 
      childList: true,
      subtree: true 
    });

    // Clean up the observer when the component unmounts
    return () => observer.disconnect();
  }, []);

  return null; // This component doesn't render anything
}
