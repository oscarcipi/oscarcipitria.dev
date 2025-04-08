import Link from "next/link";
import MainLayout from "@/components/main-layout";
import SectionHeading from "@/components/section-heading";
import GradientHeading from "@/components/gradient-heading";
import ArrowItem from "@/components/arrow-item";
import LinkContainer from "@/components/link-container";
import ColoredLink from "@/components/colored-link";

export default function Home() {
  return (
    <MainLayout>
      <section>
        <SectionHeading title="me" />
        <GradientHeading title="Oscar Cipitria" />
        <p className="text-2xl text-foreground mb-3 container-ch animate-fade-in animate-delay-200">
          UX Engineer
        </p>
        <p className="text-neutral-600 dark:text-neutral-400 text-xl leading-7 animate-fade-in animate-delay-300">
          I build smooth apps that feel natural to use.
        </p>
      </section>

      <section>
        <SectionHeading title="elsewhere" />
        <LinkContainer colored>
          <ColoredLink href="https://github.com/oscarcipi">
            GitHub
          </ColoredLink>
          <ColoredLink href="https://twitter.com/oscarcipitria">
            Twitter
          </ColoredLink>
          <ColoredLink href="https://stackoverflow.com/users/9724551/josep-vidal?tab=profile">
            StackOverflow
          </ColoredLink>
          <ColoredLink href="https://www.linkedin.com/in/óscarcipitrialorenzo/">
            Linkedin
          </ColoredLink>
          <ColoredLink href="mailto:oscarzipitria+mysite@gmail.com">
            oscarzipitria@gmail.com
          </ColoredLink>
        </LinkContainer>
      </section>

      <section>
        <SectionHeading title="now" />
        <ArrowItem delay={100}>Learning while working on small side projects.</ArrowItem>
        <ArrowItem delay={200}>
          Growing as an engineer within a top{" "}
          <ColoredLink href="https://qonto.com/">
            european fintech unicorn
          </ColoredLink>
          .
        </ArrowItem>
      </section>

      <section>
        <SectionHeading title="before" />
        <ArrowItem delay={100}>
          Founder engineer on a{" "}
          <ColoredLink href="https://www.grafbase.com/">
            GraphQL startup.
          </ColoredLink>
          .
        </ArrowItem>
        <ArrowItem delay={200}>
          Leading the frontend team on a brand new electronic signature app
        </ArrowItem>
        <ArrowItem delay={300}>
          Automating processes as a full-stack dev on an{" "}
          <ColoredLink href="https://factorenergia.com">
            energy company
          </ColoredLink>
          .
        </ArrowItem>
      </section>

      <section>
        <SectionHeading title="projects" />
        <LinkContainer colored>
          <ColoredLink href="https://expofast.app">
            Expofast
          </ColoredLink>
          <ColoredLink href="https://100cims.app">
            100cims
          </ColoredLink>
          <ColoredLink href="https://chromewebstore.google.com/detail/mv-ignited/eajomfdkpghamhpfkoemijokpomnohef?authuser=0&hl=es">
            mv-ignited
          </ColoredLink>
          <ColoredLink href="https://github.com/jvidalv/astrale">
            Astrale
          </ColoredLink>
          <ColoredLink href="https://github.com/jvidalv/vital">
            Vital
          </ColoredLink>
          <ColoredLink href="https://github.com/jvidalv/nextal">
            Nextal
          </ColoredLink>
        </LinkContainer>
      </section>
    </MainLayout>
  );
}
