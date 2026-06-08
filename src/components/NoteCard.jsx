import { Copy, Edit3, Star } from "lucide-react";

const actionButtonClassName =
  "inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-vault-border bg-vault-surface text-xs font-medium text-vault-text transition hover:border-vault-accent/55 hover:bg-[#181818] focus:outline-none focus:ring-2 focus:ring-vault-accent focus:ring-offset-2 focus:ring-offset-vault-card";

function NoteCard({ note, onCopy, onEdit }) {
  const previewLines = note.code.split("\n").slice(0, 6);

  return (
    <article className="group flex min-h-[238px] flex-col rounded-lg border border-vault-border bg-vault-card p-4 transition duration-200 hover:-translate-y-1 hover:border-vault-accent/45 hover:shadow-glow">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-2">
            {note.favorite && (
              <Star className="h-3.5 w-3.5 shrink-0 fill-vault-warning text-vault-warning" aria-hidden="true" />
            )}
            <h2 className="truncate text-sm font-semibold text-vault-text">{note.title}</h2>
          </div>
          <p className="mt-1 text-xs text-vault-muted">{note.language}</p>
        </div>
        <span className="shrink-0 rounded-md border border-vault-border bg-vault-surface px-2 py-1 text-[11px] text-vault-muted">
          {note.updatedAt}
        </span>
      </div>

      <p className="mt-4 line-clamp-2 min-h-[2.5rem] text-sm text-vault-muted">
        Why: {note.why}
      </p>

      <pre className="mt-4 max-h-[8.8rem] overflow-hidden rounded-lg border border-vault-border bg-[#0c0c0c] p-3 font-mono text-xs leading-5 text-vault-text/88">
        <code>{previewLines.join("\n")}</code>
      </pre>

      <div className="mt-4 flex flex-wrap gap-2">
        {note.tags.slice(0, 3).map((tag) => (
          <span
            className="rounded-md border border-vault-border bg-vault-surface px-2 py-1 text-[11px] text-vault-muted"
            key={tag}
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2 pt-4">
        <button
          type="button"
          onClick={() => onCopy(note)}
          className={actionButtonClassName}
        >
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          Copy
        </button>
        <button
          type="button"
          onClick={() => onEdit(note)}
          className={actionButtonClassName}
        >
          <Edit3 className="h-3.5 w-3.5" aria-hidden="true" />
          Edit
        </button>
      </div>
    </article>
  );
}

export default NoteCard;
