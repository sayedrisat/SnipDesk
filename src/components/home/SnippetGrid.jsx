import { forwardRef } from "react";

const SNIPPETS = [
  {
    lang: "TypeScript",
    title: "useDebounce",
    reason:
      "Polished hook for delaying fast-changing values without extra deps",
    tags: ["hooks", "performance"],
  },
  {
    lang: "Python",
    title: "flatten_dict",
    reason: "Flatten nested dictionaries with a separator that fits your data",
    tags: ["utils", "dict"],
  },
  {
    lang: "Bash",
    title: "git-clean-branches",
    reason: "Prune merged local branches before your repo gets noisy",
    tags: ["git", "cleanup"],
  },
  {
    lang: "TypeScript",
    title: "useLocalStorage",
    reason: "Persist React state with localStorage sync and safe JSON parsing",
    tags: ["hooks", "storage"],
  },
];

const SnippetGrid = forwardRef(function SnippetGrid(
  { cardRefs, focusedIndex, inView },
  ref,
) {
  return (
    <div ref={ref} className={`app-grid${inView ? " in" : ""}`}>
      {SNIPPETS.map((s, i) => (
        <div
          key={s.title}
          ref={(el) => (cardRefs.current[i] = el)}
          className={`snippet-card${focusedIndex === i ? " focused" : ""}`}>
          <span className="card-lang">{s.lang}</span>
          <div className="card-title">{s.title}</div>
          <div className="card-reason">{s.reason}</div>
          <div className="card-tags">
            {s.tags.map((t) => (
              <span key={t} className="card-tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

export default SnippetGrid;
