import { forwardRef } from "react";

const HomeSidebar = forwardRef(function Sidebar(_, ref) {
  return (
    <div ref={ref} className="app-sidebar">
      <div className="sidebar-label">Collections</div>
      <div className="sidebar-item active">
        <span className="si-dot" /> All snippets{" "}
        <span className="si-count">24</span>
      </div>
      <div className="sidebar-item">
        <span className="si-dot" /> React Hooks{" "}
        <span className="si-count">8</span>
      </div>
      <div className="sidebar-item">
        <span className="si-dot" /> Docker Configs{" "}
        <span className="si-count">5</span>
      </div>
      <div className="sidebar-item">
        <span className="si-dot" /> Python Scripts{" "}
        <span className="si-count">7</span>
      </div>
      <div className="sidebar-item">
        <span className="si-dot" /> Utilities{" "}
        <span className="si-count">4</span>
      </div>
      <div className="sidebar-divider" />
      <div className="sidebar-label">Languages</div>
      <div>
        <span className="lang-tag active">TS</span>
        <span className="lang-tag">JS</span>
        <span className="lang-tag">PY</span>
        <span className="lang-tag">SH</span>
      </div>
    </div>
  );
});

export default HomeSidebar;
