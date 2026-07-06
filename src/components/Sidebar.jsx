import { COLLECTIONS, LANGUAGES } from "../hooks/useNotes.js";

export default function Sidebar({
  open,
  onClose,
  counts,
  activeCollection,
  setActiveCollection,
  activeLang,
  setActiveLang,
  searchQuery,
  setSearchQuery,
  onNewNote,
}) {
  
  const selectCollection = (c) => {
    setActiveCollection(c);
    onClose();
  };
  const selectLang = (l) => {
    setActiveLang(activeLang === l ? null : l);
    onClose();
  };
  const handleNewNote = () => {
    onNewNote();
    onClose();
  };

  return (
    <aside className={`av-sidebar${open ? " open" : ""}`}>
      <div className="av-sidebar-head">
        <div className="av-brand">
          <span className="av-brand-dot" />
          CodeVault
        </div>
        <button
          className="av-sidebar-close"
          onClick={onClose}
          aria-label="Close menu">
          ✕
        </button>
      </div>

      <button className="av-new-note-btn" onClick={handleNewNote}>
        + New note
      </button>

      <div className="av-side-search">
        <span className="av-icon">⌕</span>
        <input
          type="text"
          placeholder="Search snippets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="av-side-label">Collections</div>
      <div className="av-side-list">
        <button
          className={`av-side-item${activeCollection === "All" ? " active" : ""}`}
          onClick={() => selectCollection("All")}>
          <span className="av-side-dot" />
          All snippets
          <span className="av-side-count">{counts.All ?? 0}</span>
        </button>
        {COLLECTIONS.map((c) => (
          <button
            key={c}
            className={`av-side-item${activeCollection === c ? " active" : ""}`}
            onClick={() => selectCollection(c)}>
            <span className="av-side-dot" />
            {c}
            <span className="av-side-count">{counts[c] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="av-side-divider" />

      <div className="av-side-label">Languages</div>
      <div className="av-lang-row">
        {LANGUAGES.map((l) => (
          <button
            key={l}
            className={`av-lang-chip${activeLang === l ? " active" : ""}`}
            title={l}
            onClick={() => selectLang(l)}>
            {l.slice(0, 2).toUpperCase()}
          </button>
        ))}
      </div>

      <div className="av-sidebar-foot">
        v0.1.0-alpha · stored locally in your browser
      </div>
    </aside>
  );
}
