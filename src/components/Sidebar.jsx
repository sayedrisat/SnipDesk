import { BookOpen, Hash, Inbox, Star } from "lucide-react";

function Sidebar({
  activeCollection,
  activeLanguage,
  languages,
  notes,
  onSelectCollection,
  onSelectLanguage,
  onSelectTag,
}) {
  const favoriteCount = notes.filter((note) => note.favorite).length;
  const tags = Array.from(new Set(notes.flatMap((note) => note.tags))).slice(0, 6);

  return (
    <aside className="rounded-lg border border-vault-border bg-vault-surface/88 p-3 lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)]">
      <div className="flex h-full flex-col gap-5 overflow-hidden">
        <div>
          <p className="px-2 text-xs font-medium uppercase tracking-[0.16em] text-vault-muted">
            Library
          </p>
          <div className="mt-3 space-y-1">
            <SidebarButton
              active={activeCollection === "All" && activeLanguage === "All"}
              onClick={() => onSelectCollection("All")}
            >
              <Inbox className="h-4 w-4" aria-hidden="true" />
              <span>All Notes</span>
              <span className="ml-auto text-xs text-vault-muted">{notes.length}</span>
            </SidebarButton>
            <SidebarButton
              active={activeCollection === "Favorites"}
              onClick={() => onSelectCollection("Favorites")}
            >
              <Star className="h-4 w-4" aria-hidden="true" />
              <span>Favorites</span>
              <span className="ml-auto text-xs text-vault-muted">{favoriteCount}</span>
            </SidebarButton>
          </div>
        </div>

        <div>
          <p className="px-2 text-xs font-medium uppercase tracking-[0.16em] text-vault-muted">
            Languages
          </p>
          <div className="mt-3 space-y-1">
            {languages.map((language) => (
              <SidebarButton
                active={activeLanguage === language.name}
                key={language.name}
                onClick={() => onSelectLanguage(language.name)}
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                <span>{language.name}</span>
                <span className="ml-auto text-xs text-vault-muted">{language.count}</span>
              </SidebarButton>
            ))}
          </div>
        </div>

        <div className="min-h-0">
          <p className="px-2 text-xs font-medium uppercase tracking-[0.16em] text-vault-muted">
            Tags
          </p>
          <div className="mt-3 flex flex-wrap gap-2 px-2">
            {tags.map((tag) => (
              <button
                className="inline-flex max-w-full items-center gap-1 rounded-md border border-vault-border bg-vault-card px-2 py-1 text-xs text-vault-muted transition hover:border-vault-accent/60 hover:text-vault-text"
                key={tag}
                onClick={() => onSelectTag(tag)}
                type="button"
              >
                <Hash className="h-3 w-3 shrink-0" aria-hidden="true" />
                <span className="truncate">{tag}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarButton({ active = false, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-10 w-full items-center gap-2 rounded-lg px-2.5 text-left text-sm transition focus:outline-none focus:ring-2 focus:ring-vault-accent focus:ring-offset-2 focus:ring-offset-vault-surface ${
        active
          ? "border border-vault-border bg-vault-card text-vault-text"
          : "text-vault-muted hover:bg-vault-card/70 hover:text-vault-text"
      }`}
    >
      {children}
    </button>
  );
}

export default Sidebar;
