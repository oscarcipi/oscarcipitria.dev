import Link from "next/link";
import CommandMenu from "./command-menu";

export default function Header() {
  return (
    <header className="animate-fade-in">
      <nav className="flex items-center justify-between">
        <Link
          href="/"
          className="block bg-gradient-to-r from-primary to-accent w-8 h-8 transition border border-transparent hover:scale-110 duration-300"
        >
          <span className="sr-only">ocipitria.dev</span>
        </Link>
        <div>
          <CommandMenu />
        </div>
      </nav>
    </header>
  );
}
