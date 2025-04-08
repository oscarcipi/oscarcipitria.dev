import type { ReactNode } from "react";

interface LinkContainerProps {
  children: ReactNode;
  colored?: boolean;
}

export default function LinkContainer({ children, colored = false }: LinkContainerProps) {
  return (
    <p className={`flex flex-wrap text-lg gap-4 ${colored ? 'animate-fade-in' : 'text-foreground'} mb-3 container-ch`}>
      {children}
    </p>
  );
}
