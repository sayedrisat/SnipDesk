import { lazy, Suspense, useEffect, useState } from "react";
import useNotes from "../hooks/useNotes.js";
import useToast from "../hooks/useToast.js";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import SnippetGrid from "../components/SnippetGrid.jsx";
import Toast from "../components/Toast.jsx";
import "../styles/app.css";

const EditorDrawer = lazy(() => import("../components/EditorDrawer.jsx"));

export default function SnippetApp() {
  const {
    notes,
    filteredNotes,
    counts,
    activeCollection,
    setActiveCollection,
    activeLang,
    setActiveLang,
    searchQuery,
    setSearchQuery,
    saveNote,
    deleteNote,
  } = useNotes();

  const { message, show } = useToast();

  const [view, setView] = useState("grid");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hasOpenedDrawer, setHasOpenedDrawer] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 860) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && sidebarOpen) setSidebarOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [sidebarOpen]);

  const editingNote = editingId
    ? (notes.find((n) => n.id === editingId) ?? null)
    : null;

  const openNewNote = () => {
    setEditingId(null);
    setDrawerOpen(true);
    setHasOpenedDrawer(true);
  };

  const openEditNote = (id) => {
    setEditingId(id);
    setDrawerOpen(true);
    setHasOpenedDrawer(true);
  };

  const closeDrawer = () => setDrawerOpen(false);

  const handleSave = (payload, id) => {
    saveNote(payload, id);
    show(id ? "Note updated" : "Note saved");
    setDrawerOpen(false);
  };

  const handleDelete = (id) => {
    deleteNote(id);
    show("Note deleted");
    if (drawerOpen && editingId === id) setDrawerOpen(false);
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code).then(() => show("Copied to clipboard"));
  };

  return (
    <div className="app-shell">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        counts={counts}
        activeCollection={activeCollection}
        setActiveCollection={setActiveCollection}
        activeLang={activeLang}
        setActiveLang={setActiveLang}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNewNote={openNewNote}
      />

      <div
        className={`av-sidebar-backdrop${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <main className="av-main">
        <Topbar
          activeCollection={activeCollection}
          view={view}
          setView={setView}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <div className="av-content">
          <SnippetGrid
            notes={filteredNotes}
            view={view}
            onOpen={openEditNote}
            onCopy={handleCopy}
            onDelete={handleDelete}
            onNewNote={openNewNote}
          />
        </div>
      </main>

      {hasOpenedDrawer && (
        <Suspense fallback={null}>
          <EditorDrawer
            open={drawerOpen}
            editingNote={editingNote}
            defaultLang={activeLang}
            defaultCollection={activeCollection}
            onClose={closeDrawer}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        </Suspense>
      )}

      <Toast message={message} />
    </div>
  );
}
