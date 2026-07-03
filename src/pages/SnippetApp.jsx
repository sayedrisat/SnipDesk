import { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import NoteGrid from "../components/NoteGrid.jsx";
import EditorDrawer from "../components/EditorDrawer.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { initialNotes } from "../data/notes.js";
import {
  countLanguages,
  createEmptyDraft,
  draftFromNote,
  getGreeting,
  noteFromDraft,
  noteMatchesSearch,
} from "../lib/noteUtils.js";

function SnippetApp() {
  const [notes, setNotes] = useState(initialNotes);
  const [query, setQuery] = useState("");
  const [includeCodeInSearch, setIncludeCodeInSearch] = useState(true);
  const [activeCollection, setActiveCollection] = useState("All");
  const [activeLanguage, setActiveLanguage] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [draft, setDraft] = useState(() => createEmptyDraft());
  const [editingId, setEditingId] = useState(null);
  const searchInputRef = useRef(null);
  const greeting = getGreeting();

  const languages = useMemo(() => countLanguages(notes), [notes]);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const collectionMatch = activeCollection === "All" || note.favorite;
      const languageMatch =
        activeLanguage === "All" || note.language === activeLanguage;

      return (
        collectionMatch &&
        languageMatch &&
        noteMatchesSearch(note, query, includeCodeInSearch)
      );
    });
  }, [activeCollection, activeLanguage, includeCodeInSearch, notes, query]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const openNewDrawer = () => {
    setDraft(createEmptyDraft());
    setEditingId(null);
    setDrawerOpen(true);
  };

  const openEditDrawer = (note) => {
    setDraft(draftFromNote(note));
    setEditingId(note.id);
    setDrawerOpen(true);
  };

  const copyNote = async (note) => {
    try {
      await navigator.clipboard.writeText(note.code);
    } catch {
      window.prompt("Copy this snippet", note.code);
    }
  };

  const saveNote = (noteDraft) => {
    const nextNote = noteFromDraft(noteDraft, editingId);

    setNotes((current) => {
      if (editingId) {
        return current.map((note) => (note.id === editingId ? nextNote : note));
      }

      return [nextNote, ...current];
    });

    setDrawerOpen(false);
    setDraft(createEmptyDraft());
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-vault-bg text-vault-text">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 py-4 sm:px-6 lg:px-8">
        <Header onNewNote={openNewDrawer} />

        <main className="grid flex-1 grid-cols-1 gap-4 py-4 lg:grid-cols-[236px_minmax(0,1fr)]">
          <Sidebar
            activeCollection={activeCollection}
            activeLanguage={activeLanguage}
            languages={languages}
            notes={notes}
            onSelectCollection={(collection) => {
              setActiveCollection(collection);
              if (collection === "All") {
                setActiveLanguage("All");
              }
            }}
            onSelectLanguage={(language) => {
              setActiveLanguage(language);
              setActiveCollection("All");
            }}
            onSelectTag={(tag) => {
              setQuery(tag);
              setActiveCollection("All");
            }}
          />

          <section className="min-w-0 rounded-lg border border-vault-border bg-vault-surface/84 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.28)] sm:p-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <p className="text-sm text-vault-muted">{greeting}</p>
                  <h1 className="mt-2 text-2xl font-semibold tracking-normal text-vault-text sm:text-3xl">
                    Your saved code memory
                  </h1>
                </div>

                <div className="w-full xl:max-w-[640px]">
                  <SearchBar
                    includeCode={includeCodeInSearch}
                    inputRef={searchInputRef}
                    value={query}
                    onChange={setQuery}
                    onClear={() => setQuery("")}
                    onToggleCode={() =>
                      setIncludeCodeInSearch((current) => !current)
                    }
                  />
                </div>
              </div>

              <NoteGrid
                notes={filteredNotes}
                onCopy={copyNote}
                onEdit={openEditDrawer}
                query={query}
              />
            </div>
          </section>
        </main>
      </div>

      <EditorDrawer
        draft={draft}
        isEditing={Boolean(editingId)}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onDraftChange={setDraft}
        onSave={saveNote}
      />
    </div>
  );
}

export default SnippetApp;
