import type { ReactNode } from "react";

interface ColoredLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  newTab?: boolean;
}

export default function ColoredLink({ href, children, className = "", newTab = true }: ColoredLinkProps) {
  return (
    <a
      href={href}
      className={`font-medium colored-link hover-lift ${className}`}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
