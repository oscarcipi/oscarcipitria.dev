"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

interface CommandItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  shortcut?: string;
  action?: () => void;
  href?: string;
}

export default function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Define all command items
  const navigationItems: CommandItem[] = [
    {
      id: "home",
      icon: <span className="w-4 h-4 flex items-center justify-center">🏠</span>,
      label: "Home",
      shortcut: "(esc)",
      href: "/",
    },
    {
      id: "blog",
      icon: <span className="w-4 h-4 flex items-center justify-center">📝</span>,
      label: "Blog",
      href: "/blog",
    },
    {
      id: "memento-mori",
      icon: <span className="w-4 h-4 flex items-center justify-center">☠️</span>,
      label: "Memento Mori",
      href: "/memento-mori",
    },
  ];

  const themeItems: CommandItem[] = [
    {
      id: "dark-theme",
      icon: <span className="w-4 h-4 flex items-center justify-center">🌙</span>,
      label: "Set theme to dark",
      action: () => {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setIsOpen(false);
      },
    },
    {
      id: "system-theme",
      icon: <span className="w-4 h-4 flex items-center justify-center">💻</span>,
      label: "Set theme to system",
      action: () => {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.classList.toggle("dark", prefersDark);
        localStorage.removeItem("theme");
        setIsOpen(false);
      },
    },
  ];

  const allItems = [...navigationItems, ...themeItems];

  // Filter items based on search term
  const filteredItems = searchTerm
    ? allItems.filter(item =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allItems;

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open menu with CMD+K or CTRL+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }

      // Close menu with ESC
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Handle item selection
  const handleItemClick = (item: CommandItem) => {
    if (item.action) {
      item.action();
    } else if (item.href) {
      router.push(item.href);
      setIsOpen(false);
    }
  };

  // State to track if we're on the client side (for SSR compatibility)
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Search button only
  if (!isOpen) {
    return (
      <button
        title="Command menu (cmd + k)"
        onClick={() => setIsOpen(true)}
        className="border border-primary hover:border-primary p-2 rounded-md transition-all duration-300 hover:rotate-12 bg-background/50"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#000' }}>⌘</div>
      </button>
    );
  }

  // Only render the portal on the client side
  if (!mounted) return null;

  // Use createPortal to render outside the normal DOM hierarchy
  return createPortal(
    <>
      {/* Overlay with extremely high z-index */}
      <div 
        className="fixed inset-0" 
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.8)', 
          backdropFilter: 'blur(4px)',
          zIndex: 99998,
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        onClick={() => setIsOpen(false)}
      />
      {/* Command menu with even higher z-index */}
      <div 
        className="animate-scale-in" 
        style={{ 
          zIndex: 99999,
          position: 'fixed',
          top: '20%',
          left: '50%',
          width: '100%',
          maxWidth: '28rem',
          transform: 'translateX(-50%)',
          backgroundColor: document.documentElement.classList.contains('dark') ? '#262626' : 'white',
          borderRadius: '0.375rem',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid ' + (document.documentElement.classList.contains('dark') ? '#404040' : '#e5e5e5'),
          overflow: 'hidden'
        }}
      >
        <div className="p-4">
          <div className="flex items-center border-b border-border pb-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-2 text-muted-foreground"
            >
              <path
                d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <div className="max-h-[300px] overflow-y-auto">
          {filteredItems.length > 0 ? (
            <>
              {navigationItems.some(item => filteredItems.includes(item)) && (
                <div className="px-2 pt-2 pb-1">
                  <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
                    Navigation
                  </div>
                  {navigationItems
                    .filter(item => filteredItems.includes(item))
                    .map(item => (
                      <button
                        key={item.id}
                        className="w-full flex items-center justify-between px-2 py-2 text-sm rounded-md hover:bg-accent/50 transition-colors"
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="flex items-center">
                          <div className="mr-2 text-muted-foreground">{item.icon}</div>
                          <span>{item.label}</span>
                        </div>
                        {item.shortcut && (
                          <span className="text-xs text-muted-foreground">{item.shortcut}</span>
                        )}
                      </button>
                    ))}
                </div>
              )}

              {themeItems.some(item => filteredItems.includes(item)) && (
                <div className="px-2 pt-2 pb-1">
                  <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
                    Theme
                  </div>
                  {themeItems
                    .filter(item => filteredItems.includes(item))
                    .map(item => (
                      <button
                        key={item.id}
                        className="w-full flex items-center justify-between px-2 py-2 text-sm rounded-md hover:bg-accent/50 transition-colors"
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="flex items-center">
                          <div className="mr-2 text-muted-foreground">{item.icon}</div>
                          <span>{item.label}</span>
                        </div>
                        {item.shortcut && (
                          <span className="text-xs text-muted-foreground">{item.shortcut}</span>
                        )}
                      </button>
                    ))}
                </div>
              )}
            </>
          ) : (
            <div className="px-4 py-8 text-center text-muted-foreground">
              No results found
            </div>
          )}
        </div>

        <div className="p-2 border-t border-border text-xs text-muted-foreground flex items-center justify-center">
          Press <kbd className="mx-1 px-1.5 py-0.5 bg-muted rounded text-[10px]">↑</kbd>
          <kbd className="mx-1 px-1.5 py-0.5 bg-muted rounded text-[10px]">↓</kbd> to navigate,
          <kbd className="mx-1 px-1.5 py-0.5 bg-muted rounded text-[10px]">Enter</kbd> to select
        </div>
      </div>
    </>,
    document.body
  );
}
