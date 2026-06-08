import { useEffect, useId, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

function SearchBar({
  includeCode,
  inputRef,
  value,
  onChange,
  onClear,
  onToggleCode,
}) {
  const inputId = useId();
  const menuId = useId();
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    if (!filterOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setFilterOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [filterOpen]);

  return (
    <div className="group relative">
      <label className="sr-only" htmlFor={inputId}>
        Search snippets
      </label>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-vault-muted transition group-focus-within:text-vault-accent"
        aria-hidden="true"
      />
      <input
        id={inputId}
        ref={inputRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-14 w-full rounded-lg border border-vault-border bg-[#0d0d0d] pl-11 pr-24 text-sm text-vault-text outline-none transition placeholder:text-vault-muted/78 hover:border-vault-muted/40 focus:border-vault-accent focus:bg-[#101010] focus:shadow-[0_0_0_4px_rgba(139,92,246,0.12)]"
        placeholder="Search snippets, tags, language, or code..."
        type="search"
      />

      <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-transparent text-vault-muted transition hover:border-vault-border hover:bg-vault-card hover:text-vault-text focus:outline-none focus:ring-2 focus:ring-vault-accent focus:ring-offset-2 focus:ring-offset-vault-bg"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}

        <button
          type="button"
          onClick={() => setFilterOpen((current) => !current)}
          className={`flex h-10 w-10 items-center justify-center rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-vault-accent focus:ring-offset-2 focus:ring-offset-vault-bg ${
            filterOpen
              ? "border-vault-accent/70 bg-vault-card text-vault-text"
              : "border-transparent text-vault-muted hover:border-vault-border hover:bg-vault-card hover:text-vault-text"
          }`}
          aria-controls={menuId}
          aria-expanded={filterOpen}
          aria-label="Search filters"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {filterOpen && (
        <div
          id={menuId}
          className="absolute right-0 top-[calc(100%+0.5rem)] z-20 w-64 rounded-lg border border-vault-border bg-vault-card p-3 shadow-[0_18px_50px_rgba(0,0,0,0.42)]"
        >
          <label className="flex items-start gap-3 rounded-md p-2 text-sm text-vault-text hover:bg-vault-surface">
            <input
              checked={includeCode}
              onChange={onToggleCode}
              className="mt-1 h-4 w-4 accent-vault-accent"
              type="checkbox"
            />
            <span>
              <span className="block font-medium">Search code body</span>
              <span className="mt-1 block text-xs leading-5 text-vault-muted">
                Include snippet text along with titles, tags, and language.
              </span>
            </span>
          </label>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
