import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HOVER_SELECTOR = 'a, button, .bento-card, .snippet-card, .sidebar-item';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });

    const handleMouseMove = (e) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest && e.target.closest(HOVER_SELECTOR)) {
        document.body.classList.add('hovered');
      }
    };
    const handleMouseOut = (e) => {
      if (e.target.closest && e.target.closest(HOVER_SELECTOR)) {
        document.body.classList.remove('hovered');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="c-dot" />
      <div ref={ringRef} className="c-ring" />
    </>
  );
}
