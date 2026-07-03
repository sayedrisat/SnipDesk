import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SnippetGrid from "./SnippetGrid.jsx";
import CodeDrawer from "./CodeDrawer.jsx";
import HomeSidebar from "../home/HomeSidebar.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function Showcase() {
  const scrollerRef = useRef(null);
  const stickyRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const sidebarRef = useRef(null);
  const gridRef = useRef(null);
  const drawerRef = useRef(null);
  const cardRefs = useRef([]);

  const [showGrid, setShowGrid] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    const label = labelRef.current;
    const heading = headingRef.current;

    const introST = ScrollTrigger.create({
      trigger: scrollerRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        label.classList.add("visible");
        heading.classList.add("visible");
      },
    });

    const pinST = ScrollTrigger.create({
      trigger: scrollerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: stickyRef.current,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        sidebarRef.current.classList.toggle("in", progress > 0.05);

        const grid = progress > 0.3;
        setShowGrid(grid);
        if (grid) {
          cardRefs.current.forEach((c, i) => {
            gsap.delayedCall(
              (i * 80) / 1000,
              () => c && c.classList.add("shown"),
            );
          });
        } else {
          cardRefs.current.forEach((c) => c && c.classList.remove("shown"));
        }

        setShowDrawer(progress > 0.65);
      },
    });

    return () => {
      introST.kill();
      pinST.kill();
    };
  }, []);

  return (
    <section id="showcase" style={{ paddingTop: 60 }}>
      <div className="showcase-scroller" ref={scrollerRef}>
        <div className="showcase-sticky-wrapper" ref={stickyRef}>
          <p className="showcase-label" ref={labelRef}>
            // product
          </p>
          <h2 className="showcase-heading" ref={headingRef}>
            A cleaner home for code you reuse.
          </h2>

          <div className="app-window">
            <div className="window-bar">
              <span className="dot dot-r" />
              <span className="dot dot-y" />
              <span className="dot dot-g" />
              <span className="window-tab">~/projects/codevault</span>
            </div>
            <div className="window-body">
              <HomeSidebar ref={sidebarRef} />

              <div className="app-main">
                <SnippetGrid
                  ref={gridRef}
                  cardRefs={cardRefs}
                  focusedIndex={showDrawer ? 0 : null}
                  inView={showGrid}
                />
                <CodeDrawer ref={drawerRef} active={showDrawer} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
