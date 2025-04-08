import MainLayout from "@/components/main-layout";
import SectionHeading from "@/components/section-heading";

export default function TheBeginningPost() {
  return (
    <MainLayout>
      <article className="max-w-2xl mx-auto">
        <SectionHeading title="blog" />
        
        <p className="text-sm font-mono text-neutral-500 dark:text-neutral-400 mt-8 mb-2">
          March 19, 2023
        </p>
        
        <h1 className="text-5xl font-bold text-[#ff9580] mb-8">
          The beginning
        </h1>

        <div className="space-y-6 text-lg"> 
          <p>
            Yep, first entry, after 36 years of life, and more than half of it online on 
            the internet, under different alias and with different hobbies and time 
            fillers.
          </p>
          
          <p>
            Today is the day I start blogging and journaling.
          </p>
          
          <h2 className="text-2xl font-bold mt-12 mb-6">Why?</h2>
          
          <p>
            These last years I tried very hard to a journal, manually, with paper and 
            pencil, and as expected I have failed spectacularly, so if something is 
            not working, try a different approach, and this is what I plan to do with 
            this blog/journal.
          </p>
          
          <h2 className="text-2xl font-bold mt-12 mb-6">Objectives</h2>
          
          <p>Ordered by how important are to me (DESC):</p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>Have fun.</li>
            <li>Save my brain state for any given day. As some kind of save file.</li>
            <li>Share and receive knowledge.</li>
            <li>Improve my writing skills in english.</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-12 mb-6">Fin</h2>
          
          <p>
            Really, this is all; I don't want to procrastinate trying to be smart on my 
            first ever post. So I will keep it simple for now.
          </p>
        </div>
      </article>
    </MainLayout>
  );
}
