import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BentoCard from "./BentoCard.jsx";
import SearchDemo from "./SearchDemo.jsx";
import { Search, Bookmark, Code2, FolderTree, Copy, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);

  useEffect(() => {
    const st1 = ScrollTrigger.create({
      trigger: headingRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => headingRef.current.classList.add("visible"),
    });
    const st2 = ScrollTrigger.create({
      trigger: subHeadingRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => subHeadingRef.current.classList.add("visible"),
    });

    return () => {
      st1.kill();
      st2.kill();
    };
  }, []);

  return (
    <section id="features">
      <div className="features-header">
        <h2 className="features-h" ref={headingRef}>
          Built for daily reuse.
        </h2>
        <span className="features-sub-h" ref={subHeadingRef}>
          Fast. Focused. Yours.
        </span>
      </div>

      <div className="bento">
        <BentoCard
          wide
          delay={0}
          icon={<Search size={26} />}
          title="Instant Recall"
          desc="Search titles, notes, tags, and raw code the moment a snippet comes to mind.">
          <SearchDemo />
        </BentoCard>

        <BentoCard
          delay={100}
          icon={<Bookmark size={26} />}
          title="Context That Stays"
          desc="Save the purpose, language, and tags with every snippet, so future-you knows why it mattered."
        />

        <BentoCard
          delay={0}
          icon={<Code2 size={26} />}
          title="Readable by Design"
          desc="Syntax highlighting keeps every snippet familiar, scannable, and ready to use."
        />

        <BentoCard
          delay={100}
          icon={<FolderTree size={26} />}
          title="Organized Your Way"
          desc="Browse by language, collection, or tag when you want structure without heavy setup."
        />

        <BentoCard
          delay={200}
          icon={<Copy size={26} />}
          title="One-Tap Copy"
          desc="Copy any snippet straight to your clipboard and return to the work without friction."
        />

        <BentoCard
          delay={300}
          icon={<Globe size={26} />}
          title="Browser-First"
          desc="No account or server required. Open it and keep your workflow moving."
        />
      </div>
    </section>
  );
}
