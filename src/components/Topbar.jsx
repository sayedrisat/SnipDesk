export default function Topbar({
  activeCollection,
  view,
  setView,
  onMenuClick,
}) {
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
          {activeCollection === "All" ? "All snippets" : activeCollection}
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
