import type { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="p-6 sm:p-12 md:p-16 animate-fade-in">
      <div className="mx-auto md:max-w-[37.5rem]">
        <Header />
        <div className="min-h-screen">
          {children}
        </div>
        <Footer />
      </div>
    </main>
  );
}
