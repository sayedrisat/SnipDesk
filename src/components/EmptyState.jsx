import { RECALL_COLLECTION } from "../hooks/useNotes.js";

export default function EmptyState({ activeCollection, onNewNote }) {
  const isRecallView = activeCollection === RECALL_COLLECTION;

  return (
    <div className="av-empty-state">
      <div className="av-glyph">{isRecallView ? "147" : "Search"}</div>
      <h3>{isRecallView ? "No recall notes yet" : "Nothing here yet"}</h3>
      <p>
        {isRecallView
          ? "Enable 1-4-7 Memory Recall on specific snippets, then they will appear here with their next recall status."
          : "No snippets match this view. Try another collection, language, or search term, or save a new one."}
      </p>
      <button className="av-btn-primary" onClick={onNewNote}>
        + New note
      </button>
    </div>
  );
}
