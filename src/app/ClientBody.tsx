"use client";

import { useEffect } from "react";
import RemoveVercelBadge from "@/components/remove-vercel-badge";
import VercelBadgeRemover from "@/components/vercel-badge-remover";
import ClientBadgeRemover from "@/components/client-badge-remover";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";

    // Direct DOM manipulation to remove Vercel badge
    const removeVercelBadge = () => {
      // Target all possible selectors for the Vercel badge
      const selectors = [
        'a[href*="vercel.com"]',
        '[data-vercel-badge]',
        'body > div:last-child > a',
        'body > div > a[style*="position: fixed"][style*="bottom"][style*="left"]'
      ];
      
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (el && el.parentNode) {
            (el as HTMLElement).style.display = 'none';
            try {
              el.parentNode.removeChild(el);
            } catch (e) {}
          }
        });
      });

      // Find any element with just 'N' text in the bottom left
      document.querySelectorAll('*').forEach(el => {
        if (el.textContent === 'N' && el.children.length === 0) {
          const rect = el.getBoundingClientRect();
          if (rect.bottom > window.innerHeight - 100 && rect.left < 100) {
            let current = el;
            for (let i = 0; i < 3; i++) {
              if (!current.parentNode || current.parentNode === document.body) break;
              current = current.parentNode as HTMLElement;
            }
            if (current && current.parentNode) {
              (current as HTMLElement).style.display = 'none';
              try { current.parentNode.removeChild(current); } catch (e) {}
            }
          }
        }
      });
    };

    // Run immediately and then periodically to ensure it's removed
    removeVercelBadge();
    const interval = setInterval(removeVercelBadge, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <body className="antialiased bg-background text-foreground" suppressHydrationWarning>
      <RemoveVercelBadge />
      <VercelBadgeRemover />
      <ClientBadgeRemover />
      {children}
      <style jsx global>{`
        /* Hide Vercel badge with CSS */
        [data-vercel-badge],
        a[href*="vercel.com"],
        body > div:last-child > a,
        body > div > a[style*="position: fixed"][style*="bottom"][style*="left"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `}</style>
    </body>
  );
}
