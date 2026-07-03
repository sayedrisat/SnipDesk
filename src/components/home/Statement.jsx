import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATEMENT =
  "Your best code deserves a place you trust. SnipDesk keeps it close.";

export default function Statement() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  const words = STATEMENT.split(" ");

  useEffect(() => {
    const section = sectionRef.current;
    const wordEls = textRef.current.querySelectorAll(".word");

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      once: true,
      onEnter: () => {
        section.classList.add("in-view");
        wordEls.forEach((w, i) => {
          gsap.delayedCall((i * 60) / 1000, () => w.classList.add("shown"));
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section id="statement" ref={sectionRef}>
      <div className="statement-glow" />
      <p className="statement-text" ref={textRef}>
        {words.map((w, i) => (
          <span
            key={i}
            className={`word${w.includes("SnipDesk") || w.includes("doesn't.") ? " accent" : ""}`}>
            {w}
          </span>
        ))}
      </p>
    </section>
  );
}
