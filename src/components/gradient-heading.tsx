interface GradientHeadingProps {
  title: string;
  level?: 1 | 2 | 3; // Allow different heading levels
}

export default function GradientHeading({ title, level = 1 }: GradientHeadingProps) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag className="-mt-1.5 w-fit text-5xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text mb-2.5 animate-scale-in">
      {title}
    </HeadingTag>
  );
}
