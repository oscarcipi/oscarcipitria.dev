import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./hide-vercel-badge.css";
import ClientBody from "./ClientBody";
import dynamic from "next/dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oscar Cipitria — UX engineer",
  description: "UX engineer with a product mindset",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Add the script with the highest priority to remove the Vercel badge */}
        <Script src="/remove-vercel.js" strategy="beforeInteractive" />
        <link rel="stylesheet" href="/no-vercel.css" />
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                const storedTheme = localStorage.getItem('theme');
                if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {
                console.error(e);
              }
            })();
          `
        }} />
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function removeVercelBadge() {
                // Target all possible selectors for the Vercel badge
                const selectors = [
                  'a[href*="vercel.com"]',
                  '[data-vercel-badge]',
                  'div[class*="vercel"]',
                  'a[rel="noopener noreferrer"][target="_blank"]',
                  'body > div:last-child > a',
                  'body > div > a[style*="position: fixed"][style*="bottom"][style*="left"]',
                  'body > div > a:has(> span:only-child)'
                ];
                
                for (const selector of selectors) {
                  try {
                    const elements = document.querySelectorAll(selector);
                    for (const el of elements) {
                      // Check if this is the Vercel badge (it's usually in the bottom-left corner)
                      const rect = el.getBoundingClientRect();
                      const isBottomLeft = rect.bottom > window.innerHeight - 100 && rect.left < 100;
                      const hasNLetter = el.textContent?.includes('N') || el.innerHTML?.includes('N');
                      
                      if (isBottomLeft || hasNLetter || (el.getAttribute('href') && el.getAttribute('href').includes('vercel.com'))) {
                        el.style.display = 'none';
                        el.style.opacity = '0';
                        el.style.visibility = 'hidden';
                        el.style.pointerEvents = 'none';
                        if (el.parentNode) {
                          try {
                            el.parentNode.removeChild(el);
                          } catch (e) {}
                        }
                      }
                    }
                  } catch (e) {}
                }
                
                // Direct approach - find any element with 'N' in the bottom left corner
                document.querySelectorAll('*').forEach(el => {
                  try {
                    if (el.textContent === 'N') {
                      const rect = el.getBoundingClientRect();
                      if (rect.bottom > window.innerHeight - 100 && rect.left < 100) {
                        let current = el;
                        // Walk up the DOM tree to find a suitable parent to remove
                        for (let i = 0; i < 5; i++) {
                          if (!current.parentNode) break;
                          current = current.parentNode;
                        }
                        if (current && current.parentNode) {
                          current.style.display = 'none';
                          try { current.parentNode.removeChild(current); } catch (e) {}
                        }
                      }
                    }
                  } catch (e) {}
                });
              }

              // Run immediately
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', removeVercelBadge);
              } else {
                removeVercelBadge();
              }

              // Also run after window loads and periodically
              window.addEventListener('load', removeVercelBadge);
              const interval = setInterval(removeVercelBadge, 100);
              // Stop the interval after 10 seconds to avoid performance issues
              setTimeout(() => clearInterval(interval), 10000);
            })();
          `
        }} />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Hide the Vercel badge */
            [data-vercel-badge],
            a[href*="vercel.com"],
            div[class*="vercel"],
            [class*="Vercel"],
            a[rel="noopener noreferrer"][target="_blank"],
            body > div:last-child > a,
            body > div > a[style*="position: fixed"][style*="bottom"][style*="left"] {
              display: none !important;
              opacity: 0 !important;
              visibility: hidden !important;
              pointer-events: none !important;
              position: absolute !important;
              width: 0 !important;
              height: 0 !important;
              overflow: hidden !important;
              clip: rect(0, 0, 0, 0) !important;
              margin: -1px !important;
              padding: 0 !important;
              border: 0 !important;
            }
          `
        }} />
      </head>
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
