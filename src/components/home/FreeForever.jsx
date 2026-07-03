import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PILLS = [
  { label: "No sign-up", delay: 0 },
  { label: "No credit card", delay: 150 },
  { label: "Open instantly", delay: 300 },
];

export default function FreeForever() {
  const headingRef = useRef(null);
  const pillRefs = useRef([]);

  useEffect(() => {
    const headingST = ScrollTrigger.create({
      trigger: headingRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => headingRef.current.classList.add("visible"),
    });

    const pillSTs = PILLS.map((p, i) =>
      ScrollTrigger.create({
        trigger: pillRefs.current[i],
        start: "top 90%",
        once: true,
        onEnter: () => {
          const el = pillRefs.current[i];
          gsap.delayedCall(
            p.delay / 1000,
            () => el && el.classList.add("visible"),
          );
        },
      }),
    );

    return () => {
      headingST.kill();
      pillSTs.forEach((st) => st.kill());
    };
  }, []);

  return (
    <section id="free">
      <h2 className="free-h" ref={headingRef}>
        Open your vault in seconds.
        <br />
        No account. No noise.
      </h2>
      <div className="free-pills">
        {PILLS.map((p, i) => (
          <div
            key={p.label}
            className="free-pill"
            ref={(el) => (pillRefs.current[i] = el)}>
            <span className="fp-check">✓</span> {p.label}
          </div>
        ))}
      </div>
    </section>
  );
}
