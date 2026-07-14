import { useEffect, useRef, useState } from "react";
import { LANGUAGES, RECALL_COLLECTION } from "../hooks/useNotes.js";

const DRAFT_ADD = "add";
const DRAFT_RENAME = "rename";

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
  const [menuCollection, setMenuCollection] = useState(null);
  const [draft, setDraft] = useState(null);
  const [draftName, setDraftName] = useState("");
  const [draftError, setDraftError] = useState("");
  const touchTimerRef = useRef(null);
  const touchMenuOpenedRef = useRef(false);

  useEffect(() => {
    const closeMenu = () => setMenuCollection(null);
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  useEffect(() => {
    return () => {
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    };
  }, []);

  const resetDraft = () => {
    setDraft(null);
    setDraftName("");
    setDraftError("");
  };

  const selectCollection = (collection) => {
    setActiveCollection(collection);
    onClose();
  };

  const selectEditableCollection = (collection) => {
    if (touchMenuOpenedRef.current) {
      touchMenuOpenedRef.current = false;
      return;
    }

    selectCollection(collection);
  };

  const selectLang = (language) => {
    setActiveLang(activeLang === language ? null : language);
    onClose();
  };

  const handleNewNote = () => {
    onNewNote();
    onClose();
  };

  const openCollectionMenu = (event, collection) => {
    event.preventDefault();
    event.stopPropagation();
    resetDraft();
    setMenuCollection((current) =>
      current === collection ? null : collection,
    );
  };

  const startTouchMenu = (collection) => {
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);

    touchTimerRef.current = setTimeout(() => {
      touchMenuOpenedRef.current = true;
      resetDraft();
      setMenuCollection(collection);
    }, 550);
  };

  const clearTouchMenu = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = null;
    }
  };

  const startAddCollection = (event) => {
    event.stopPropagation();
    setMenuCollection(null);
    setDraft({ type: DRAFT_ADD });
    setDraftName("");
    setDraftError("");
  };

  const startRenameCollection = (collection) => {
    setMenuCollection(null);
    setDraft({ type: DRAFT_RENAME, collection });
    setDraftName(collection);
    setDraftError("");
  };

  const submitDraft = (event) => {
    event.preventDefault();
    const name = draftName.trim();

    if (!name) {
      setDraftError("Name required");
      return;
    }

    const saved =
      draft?.type === DRAFT_RENAME
        ? onRenameCollection(draft.collection, name)
        : onAddCollection(name);

    if (!saved) {
      setDraftError("Name already exists");
      return;
    }

    resetDraft();
  };

  const deleteCollection = (collection) => {
    setMenuCollection(null);

    const confirmed = window.confirm(
      `Delete "${collection}"? Snippets will move to another collection.`,
    );

    if (confirmed) {
      onDeleteCollection(collection);
      resetDraft();
    }
  };

  const renderDraft = () => (
    <form className="av-collection-editor" onSubmit={submitDraft}>
      <input
        autoFocus
        type="text"
        value={draftName}
        placeholder="Collection name"
        onChange={(event) => {
          setDraftName(event.target.value);
          setDraftError("");
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") resetDraft();
        }}
      />
      <div className="av-collection-editor-actions">
        <button type="submit">
          {draft?.type === DRAFT_RENAME ? "Save" : "Add"}
        </button>
        <button type="button" onClick={resetDraft}>
          Cancel
        </button>
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
          aria-label="Close menu"
        >
          x
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
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>

      <div className="av-side-label-row">
        <div className="av-side-label">Collections</div>
        <button
          className="av-collection-add-btn"
          type="button"
          onClick={startAddCollection}
          aria-label="Add collection"
          title="Add collection"
        >
          +
        </button>
      </div>

      <div className="av-side-list">
        {draft?.type === DRAFT_ADD && renderDraft()}

        <button
          className={`av-side-item${activeCollection === "All" ? " active" : ""}`}
          onClick={() => selectCollection("All")}
        >
          <span className="av-side-dot" />
          <span className="av-side-name">All snippets</span>
          <span className="av-side-count">{counts.All ?? 0}</span>
        </button>
        <button
          className={`av-side-item${activeCollection === "Favorites" ? " active" : ""}`}
          onClick={() => selectCollection("Favorites")}
        >
          <span className="av-side-dot av-side-heart" />
          <span className="av-side-name">Favorites</span>
          <span className="av-side-count">{counts.Favorites ?? 0}</span>
        </button>
        <button
          className={`av-side-item${activeCollection === RECALL_COLLECTION ? " active" : ""}`}
          onClick={() => selectCollection(RECALL_COLLECTION)}
        >
          <span className="av-side-dot av-side-recall" />
          <span className="av-side-name">147 Recall</span>
          <span className="av-side-count">
            {counts[RECALL_COLLECTION] ?? 0}
          </span>
        </button>

        {collections.map((collection) => (
          <div className="av-collection-row" key={collection}>
            {draft?.type === DRAFT_RENAME &&
            draft.collection === collection ? (
              renderDraft()
            ) : (
              <>
                <button
                  className={`av-side-item${activeCollection === collection ? " active" : ""}`}
                  onClick={() => selectEditableCollection(collection)}
                  onContextMenu={(event) =>
                    openCollectionMenu(event, collection)
                  }
                  onTouchStart={() => startTouchMenu(collection)}
                  onTouchEnd={clearTouchMenu}
                  onTouchMove={clearTouchMenu}
                  onTouchCancel={clearTouchMenu}
                >
                  <span className="av-side-dot" />
                  <span className="av-side-name">{collection}</span>
                  <span className="av-side-count">
                    {counts[collection] ?? 0}
                  </span>
                </button>

                {menuCollection === collection && (
                  <div
                    className="av-collection-menu"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => startRenameCollection(collection)}
                    >
                      Rename
                    </button>
                    <button
                      className="danger"
                      type="button"
                      onClick={() => deleteCollection(collection)}
                    >
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
        {LANGUAGES.map((language) => (
          <button
            key={language}
            className={`av-lang-chip${activeLang === language ? " active" : ""}`}
            title={language}
            onClick={() => selectLang(language)}
          >
            {language.slice(0, 2).toUpperCase()}
          </button>
        ))}
      </div>

      <div className="av-sidebar-foot">
        v0.1.0-alpha · stored locally in your browser
      </div>
    </aside>
  );
}
