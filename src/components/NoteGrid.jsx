import NoteCard from "./NoteCard.jsx";

function NoteGrid({ notes, onCopy, onEdit, query }) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-vault-text">Recently Saved</p>
          <p className="mt-1 text-xs text-vault-muted">
            {notes.length} {notes.length === 1 ? "snippet" : "snippets"} in view
          </p>
        </div>
      </div>

      {notes.length ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onCopy={onCopy} onEdit={onEdit} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[18rem] items-center justify-center rounded-lg border border-dashed border-vault-border bg-vault-card/48 p-6 text-center">
          <div>
            <p className="text-sm font-medium text-vault-text">No snippets found</p>
            <p className="mt-2 max-w-sm text-sm text-vault-muted">
              {query ? "Try another search term or language filter." : "Create a new note to start your vault."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteGrid;
