import { useEffect, useState } from "react";

const PHRASES = ["useDebounce", "authGuard", "flatten_dict", "git prune"];

export default function SearchDemo() {
  const [text, setText] = useState("");

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId;

    const tick = () => {
      const phrase = PHRASES[phraseIndex];
      if (!deleting) {
        if (charIndex < phrase.length) {
          charIndex += 1;
          setText(phrase.slice(0, charIndex));
          timeoutId = setTimeout(tick, 90);
        } else {
          deleting = true;
          timeoutId = setTimeout(tick, 1400);
        }
      } else if (charIndex > 0) {
        charIndex -= 1;
        setText(phrase.slice(0, charIndex));
        timeoutId = setTimeout(tick, 45);
      } else {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % PHRASES.length;
        timeoutId = setTimeout(tick, 400);
      }
    };

    const startId = setTimeout(tick, 1000);
    return () => {
      clearTimeout(startId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="search-demo">
      <span className="search-icon">⌕</span>
      <span className="search-text">
        {text}
        <span className="search-cursor" />
      </span>
    </div>
  );
}
