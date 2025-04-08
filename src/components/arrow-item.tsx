import type { ReactNode } from "react";

interface ArrowItemProps {
  children: ReactNode;
  delay?: 100 | 200 | 300 | 400 | 500;
}

export default function ArrowItem({ children, delay = 100 }: ArrowItemProps) {
  return (
    <p
      className={`relative pl-7 text-xl before:content-['↳'] before:text-neutral-300
      dark:before:text-neutral-600 before:absolute before:block before:left-0
      before:top-1/2 before:-translate-y-1/2 animate-fade-in animate-delay-${delay}
      hover-lift transition-all duration-300`}
    >
      {children}
    </p>
  );
}
