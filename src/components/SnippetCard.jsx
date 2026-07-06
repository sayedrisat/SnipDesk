export default function SnippetCard({ note, index, onOpen, onCopy, onDelete }) {
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
      <div className="av-card-title">{note.title}</div>
      <div className="av-card-reason">{note.reason}</div>
      <div className="av-card-tags">
        {note.tags.map((t) => (
          <span key={t} className="av-card-tag">{t}</span>
        ))}
      </div>
    </div>
  );
}
