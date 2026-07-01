import { Code2, Command, Plus, Sparkles } from "lucide-react";

function Header({ onNewNote }) {
  return (
    <header className="sticky top-0 z-30 border-b border-vault-border/80 bg-vault-bg/88 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-vault-border bg-vault-card">
            <Code2 className="h-4 w-4 text-vault-accent" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-semibold text-vault-text sm:text-base">
                SnipDesk
              </p>
              <Sparkles className="h-3.5 w-3.5 text-vault-accentSoft" aria-hidden="true" />
            </div>
            <p className="hidden text-xs text-vault-muted sm:block">
              Save code the way you write code.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-lg border border-vault-border bg-vault-surface px-2.5 py-2 text-xs text-vault-muted md:flex">
            <Command className="h-3.5 w-3.5" aria-hidden="true" />
            <span>K</span>
            <span className="text-vault-border">/</span>
            <span>Search</span>
          </div>

          <button
            type="button"
            onClick={onNewNote}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-vault-accent px-4 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(139,92,246,0.24)] transition hover:-translate-y-0.5 hover:bg-vault-accentSoft focus:outline-none focus:ring-2 focus:ring-vault-accent focus:ring-offset-2 focus:ring-offset-vault-bg"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>New Note</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
