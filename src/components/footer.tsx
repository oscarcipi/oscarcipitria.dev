import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-4 sm:flex-row justify-between mt-12 border-dashed font-mono">
      <h3>ocipitria.dev ✨ 2023</h3>
      <div className="flex gap-6">
        <Link
          href="/blog"
          className="relative hover:underline after:content-['/'] after:absolute after:text-gray-500 after:right-[-16px] after:top-0 last:after:content-none"
        >
          Blog
        </Link>
        <Link
          href="/memento-mori"
          className="relative hover:underline after:content-['/'] after:absolute after:text-gray-500 after:right-[-16px] after:top-0 last:after:content-none"
        >
          Memento mori
        </Link>
      </div>
    </footer>
  );
}
