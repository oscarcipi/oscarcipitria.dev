interface SectionHeadingProps {
  title: string;
}

export default function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <p className="mt-16 mb-4 font-mono text-neutral-500 dark:text-neutral-300 text-2xl opacity-75 animate-slide-up">
      /{title}
    </p>
  );
}
