import { RECALL_COLLECTION } from "../hooks/useNotes.js";

export default function Topbar({
  activeCollection,
  view,
  setView,
  onMenuClick,
}) {
  const currentCollection =
    activeCollection === "All"
      ? "All snippets"
      : activeCollection === RECALL_COLLECTION
        ? "147 Recall"
        : activeCollection;

  return (
    <div className="av-topbar">
      <button
        className="av-menu-btn"
        onClick={onMenuClick}
        aria-label="Open menu">
        ☰
      </button>
      <div className="av-crumb">
        Collections /{" "}
        <span className="av-cur">
          {currentCollection}
        </span>
      </div>
      <div className="av-view-toggle">
        <button
          className={`av-view-btn${view === "grid" ? " active" : ""}`}
          onClick={() => setView("grid")}
          aria-label="Grid view">
          ▦
        </button>
        <button
          className={`av-view-btn${view === "list" ? " active" : ""}`}
          onClick={() => setView("list")}
          aria-label="List view">
          ☰
        </button>
      </div>
    </div>
  );
}
