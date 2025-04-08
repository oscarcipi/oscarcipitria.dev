import Link from "next/link";
import MainLayout from "@/components/main-layout";
import SectionHeading from "@/components/section-heading";
import GradientHeading from "@/components/gradient-heading";

export default function Blog() {
  return (
    <MainLayout>
      <div>
        <SectionHeading title="blog" />
        <GradientHeading title="Posts" />

        <div className="mt-6 space-y-2">
          <div className="relative pl-7 text-xl before:content-['↳'] before:text-neutral-300 dark:before:text-neutral-600 before:absolute before:block before:left-0 before:top-1/2 before:-translate-y-1/2 animate-fade-in animate-delay-100 hover-lift">
            <span className="opacity-50 font-medium">2025-01-15</span>
            <Link className="ml-2 font-medium hover:underline colored-link" href="/blog/do-try-polish-repeat">
              The UI secret ingredient, do-try-polish-repeat
            </Link>
          </div>

          <div className="relative pl-7 text-xl before:content-['↳'] before:text-neutral-300 dark:before:text-neutral-600 before:absolute before:block before:left-0 before:top-1/2 before:-translate-y-1/2 animate-fade-in animate-delay-200 hover-lift">
            <span className="opacity-50 font-medium">2023-03-19</span>
            <Link className="ml-2 font-medium hover:underline colored-link" href="/blog/the-beginning">
              The beginning
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}