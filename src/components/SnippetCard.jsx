import { getRecallSummary, RECALL_INTERVALS } from "../hooks/useNotes.js";

export default function SnippetCard({ note, index, onOpen, onCopy, onDelete, onRecall }) {
  const recall = getRecallSummary(note);

  return (
    <div
      className="av-card"
      style={{ animationDelay: `${index * 40}ms` }}
      onClick={() => onOpen(note.id)}
    >
      <div className="av-card-top">
        <span className="av-card-lang">{note.lang}</span>
        <div className="av-card-actions">
          <button
            className="av-icon-btn"
            title="Copy code"
            onClick={(e) => {
              e.stopPropagation();
              onCopy(note.code);
            }}
          >
            ⎘
          </button>
          <button
            className="av-icon-btn danger"
            title="Delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
          >
            🗑
          </button>
        </div>
      </div>
      <div className="av-card-title">
        {note.title}
        {note.favorite && (
          <span className="av-card-favorite" aria-label="Favorite snippet">
            ♥
          </span>
        )}
      </div>
      <div className="av-card-reason">{note.reason}</div>

      {recall.enabled && (
        <div className={`av-recall-card${recall.due ? " due" : ""}`}>
          <div>
            <span className="av-recall-kicker">1-4-7 Recall</span>
            <strong>{recall.title}</strong>
            <span>{recall.detail}</span>
          </div>
          <div className="av-recall-progress" aria-label="Recall progress">
            {RECALL_INTERVALS.map((interval, step) => (
              <span
                key={interval}
                className={
                  step < recall.completedSteps || recall.mastered
                    ? "complete"
                    : ""
                }
              />
            ))}
          </div>
          {!recall.mastered && (
            <button
              className="av-recall-action"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRecall(note.id);
              }}
            >
              {recall.due ? "Recall" : "Recall early"}
            </button>
          )}
        </div>
      )}

      <div className="av-card-tags">
        {note.tags.map((t) => (
          <span key={t} className="av-card-tag">{t}</span>
        ))}
      </div>
    </div>
  );
}
