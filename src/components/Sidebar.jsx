import { useEffect, useRef, useState } from "react";
import { LANGUAGES, RECALL_COLLECTION } from "../hooks/useNotes.js";

export default function Sidebar({
  open,
  onClose,
  counts,
  collections,
  activeCollection,
  setActiveCollection,
  activeLang,
  setActiveLang,
  searchQuery,
  setSearchQuery,
  onNewNote,
  onAddCollection,
  onRenameCollection,
  onDeleteCollection,
}) {
  const [menuFor, setMenuFor] = useState(null);
  const [draftMode, setDraftMode] = useState(null);
  const [draftCollection, setDraftCollection] = useState(null);
  const [draftName, setDraftName] = useState("");
  const [draftError, setDraftError] = useState("");
  const holdRef = useRef(null);
  const skipClickRef = useRef(false);

  useEffect(() => {
    const closeMenu = () => setMenuFor(null);
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  useEffect(() => {
    return () => clearTimeout(holdRef.current);
  }, []);
  
  const clearDraft = () => {
    setDraftMode(null);
    setDraftCollection(null);
    setDraftName("");
    setDraftError("");
  };

  const selectCollection = (c) => {
    if (skipClickRef.current) {
      skipClickRef.current = false;
      return;
    }
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

  const openMenu = (e, c) => {
    e.preventDefault();
    e.stopPropagation();
    clearDraft();
    setMenuFor((current) => (current === c ? null : c));
  };

  const startHold = (c) => {
    clearTimeout(holdRef.current);
    holdRef.current = setTimeout(() => {
      skipClickRef.current = true;
      clearDraft();
      setMenuFor(c);
    }, 550);
  };

  const stopHold = () => {
    clearTimeout(holdRef.current);
    holdRef.current = null;
  };

  const startAdd = (e) => {
    e.stopPropagation();
    setMenuFor(null);
    setDraftMode("add");
    setDraftCollection(null);
    setDraftName("");
    setDraftError("");
  };

  const startRename = (c) => {
    setMenuFor(null);
    setDraftMode("rename");
    setDraftCollection(c);
    setDraftName(c);
    setDraftError("");
  };

  const saveCollection = (e) => {
    e.preventDefault();
    const name = draftName.trim();

    if (!name) {
      setDraftError("Name required");
      return;
    }

    const saved =
      draftMode === "rename"
        ? onRenameCollection(draftCollection, name)
        : onAddCollection(name);

    if (!saved) {
      setDraftError("Name already exists");
      return;
    }

    clearDraft();
  };

  const removeCollection = (c) => {
    setMenuFor(null);
    if (window.confirm(`Delete "${c}"? Snippets will move to another collection.`)) {
      onDeleteCollection(c);
      clearDraft();
    }
  };

  const collectionForm = () => (
    <form className="av-collection-editor" onSubmit={saveCollection}>
      <input
        autoFocus
        type="text"
        value={draftName}
        placeholder="Collection name"
        onChange={(e) => {
          setDraftName(e.target.value);
          setDraftError("");
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") clearDraft();
        }}
      />
      <div className="av-collection-editor-actions">
        <button type="submit">{draftMode === "rename" ? "Save" : "Add"}</button>
        <button type="button" onClick={clearDraft}>Cancel</button>
      </div>
      {draftError && <span className="av-collection-error">{draftError}</span>}
    </form>
  );

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

      <div className="av-side-label-row">
        <div className="av-side-label">Collections</div>
        <button
          className="av-collection-add-btn"
          type="button"
          onClick={startAdd}
          aria-label="Add collection"
          title="Add collection">
          +
        </button>
      </div>
      <div className="av-side-list">
        {draftMode === "add" && collectionForm()}

        <button
          className={`av-side-item${activeCollection === "All" ? " active" : ""}`}
          onClick={() => selectCollection("All")}>
          <span className="av-side-dot" />
          <span className="av-side-name">All snippets</span>
          <span className="av-side-count">{counts.All ?? 0}</span>
        </button>
        <button
          className={`av-side-item${activeCollection === "Favorites" ? " active" : ""}`}
          onClick={() => selectCollection("Favorites")}>
          <span className="av-side-dot av-side-heart" />
          <span className="av-side-name">Favorites</span>
          <span className="av-side-count">{counts.Favorites ?? 0}</span>
        </button>
        <button
          className={`av-side-item${activeCollection === RECALL_COLLECTION ? " active" : ""}`}
          onClick={() => selectCollection(RECALL_COLLECTION)}>
          <span className="av-side-dot av-side-recall" />
          <span className="av-side-name">147 Recall</span>
          <span className="av-side-count">{counts[RECALL_COLLECTION] ?? 0}</span>
        </button>
        {collections.map((c) => (
          <div className="av-collection-row" key={c}>
            {draftMode === "rename" && draftCollection === c ? (
              collectionForm()
            ) : (
              <>
                <button
                  className={`av-side-item${activeCollection === c ? " active" : ""}`}
                  onClick={() => selectCollection(c)}
                  onContextMenu={(e) => openMenu(e, c)}
                  onTouchStart={() => startHold(c)}
                  onTouchEnd={stopHold}
                  onTouchMove={stopHold}
                  onTouchCancel={stopHold}>
                  <span className="av-side-dot" />
                  <span className="av-side-name">{c}</span>
                  <span className="av-side-count">{counts[c] ?? 0}</span>
                </button>
                {menuFor === c && (
                  <div
                    className="av-collection-menu"
                    onClick={(e) => e.stopPropagation()}>
                    <button type="button" onClick={() => startRename(c)}>
                      Rename
                    </button>
                    <button
                      className="danger"
                      type="button"
                      onClick={() => removeCollection(c)}>
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
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
