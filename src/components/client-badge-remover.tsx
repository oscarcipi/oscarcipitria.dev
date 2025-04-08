"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import the VercelBadgeKiller with no SSR
const VercelBadgeKiller = dynamic(
  () => import("./vercel-badge-killer"),
  { ssr: false }
);

export default function ClientBadgeRemover() {
  useEffect(() => {
    // Function to find and remove the Vercel badge
    const removeVercelBadge = () => {
      // Method 1: Direct DOM traversal to find the badge
      const allDivs = document.querySelectorAll("body > div");
      allDivs.forEach((div) => {
        // Skip if div is part of the main content
        if (div.id || 
            div.className || 
            div.getAttribute('role') || 
            div.querySelector('nav') || 
            div.querySelector('header') ||
            div.querySelector('main') ||
            div.querySelector('footer')) {
          return;
        }
        
        // Check if it's a div with a single anchor child
        if (div.children.length === 1 && div.children[0].tagName === "A") {
          const anchor = div.children[0] as HTMLAnchorElement;
          
          // Check if it has the Vercel URL or just the letter N
          if (anchor.href?.includes("vercel.com") || anchor.textContent === "N") {
            (div as HTMLElement).style.display = "none";
            div.remove();
            console.log("Removed Vercel badge (method 1)");
            return;
          }
          
          // Check if it's positioned at the bottom left
          const rect = anchor.getBoundingClientRect();
          if (rect.bottom > window.innerHeight - 100 && rect.left < 100) {
            (div as HTMLElement).style.display = "none";
            div.remove();
            console.log("Removed Vercel badge (method 1 - position)");
            return;
          }
        }
      });
      
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
              (parent as HTMLElement).style.display = "none";
              parent.remove();
              console.log("Removed Vercel badge (method 2)");
            } else {
              (el as HTMLElement).style.display = "none";
              el.remove();
              console.log("Removed Vercel badge element (method 2)");
            }
          }
        });
      });
    };

    // Run immediately
    removeVercelBadge();
    
    // Run after a short delay to ensure the DOM is fully loaded
    setTimeout(removeVercelBadge, 500);
    setTimeout(removeVercelBadge, 1000);
    
    // Run when the window loads
    window.addEventListener("load", removeVercelBadge);
    
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
    
    // Clean up
    return () => {
      observer.disconnect();
      window.removeEventListener("load", removeVercelBadge);
    };
  }, []);

  return (
    <>
      <VercelBadgeKiller />
      <style jsx global>{`
        /* Hide Vercel badge */
        a[href*="vercel.com"],
        [data-vercel-badge],
        body > div:last-child > a,
        body > div > a[style*="position: fixed"][style*="bottom"][style*="left"],
        body > div:has(> a:only-child) {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }
      `}</style>
    </>
  );
}
