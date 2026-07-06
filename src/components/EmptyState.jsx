export default function EmptyState({ onNewNote }) {
  return (
    <div className="av-empty-state">
      <div className="av-glyph">⌕</div>
      <h3>Nothing here yet</h3>
      <p>No snippets match this view. Try another collection, language, or search term — or save a new one.</p>
      <button className="av-btn-primary" onClick={onNewNote}>+ New note</button>
    </div>
  );
}
