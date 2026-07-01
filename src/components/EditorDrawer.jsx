import { useEffect, useMemo } from "react";
import AceEditor from "react-ace";
import { Check, Code2, Save, X } from "lucide-react";
import { aceModes, editorPlaceholders, languageOptions } from "../data/languages.js";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/snippets/css";
import "ace-builds/src-noconflict/snippets/html";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/snippets/json";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/theme-tomorrow_night";

const fieldClassName =
  "w-full rounded-lg border border-vault-border bg-vault-card text-sm text-vault-text outline-none transition placeholder:text-vault-muted/70 focus:border-vault-accent focus:ring-4 focus:ring-vault-accent/10";

const secondaryButtonClassName =
  "h-10 rounded-lg border border-vault-border px-4 text-sm font-medium text-vault-muted transition hover:bg-vault-card hover:text-vault-text focus:outline-none focus:ring-2 focus:ring-vault-accent focus:ring-offset-2 focus:ring-offset-vault-surface";

const primaryButtonClassName =
  "inline-flex h-10 items-center gap-2 rounded-lg bg-vault-accent px-4 text-sm font-semibold text-white transition hover:bg-vault-accentSoft focus:outline-none focus:ring-2 focus:ring-vault-accent focus:ring-offset-2 focus:ring-offset-vault-surface";

function EditorDrawer({
  draft,
  isEditing,
  onClose,
  onDraftChange,
  onSave,
  open,
}) {
  const mode = useMemo(() => aceModes[draft.language] || "javascript", [draft.language]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  const updateDraft = (key, value) => {
    onDraftChange((current) => ({ ...current, [key]: value }));
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
      inert={open ? undefined : ""}
    >
      <div
        className={`absolute inset-0 bg-black/62 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-[840px] flex-col border-l border-vault-border bg-vault-surface shadow-drawer transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={isEditing ? "Edit code note" : "New code note"}
      >
        <div className="flex items-center justify-between border-b border-vault-border px-5 py-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-vault-accent" aria-hidden="true" />
              <h2 className="truncate text-base font-semibold text-vault-text">
                {isEditing ? "Edit Code Note" : "New Code Note"}
              </h2>
            </div>
            <p className="mt-1 text-sm text-vault-muted">Save a reusable snippet</p>
          </div>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-vault-border text-vault-muted transition hover:bg-vault-card hover:text-vault-text focus:outline-none focus:ring-2 focus:ring-vault-accent focus:ring-offset-2 focus:ring-offset-vault-surface"
            onClick={onClose}
            type="button"
            aria-label="Close drawer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-[320px_minmax(0,1fr)] lg:overflow-hidden">
          <form
            className="flex flex-col border-b border-vault-border bg-[#101010] lg:min-h-0 lg:border-b-0 lg:border-r"
            onSubmit={(event) => {
              event.preventDefault();
              onSave(draft);
            }}
          >
            <div className="space-y-5 p-5 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
              <Field label="Title">
                <input
                  value={draft.title}
                  onChange={(event) => updateDraft("title", event.target.value)}
                  className={`${fieldClassName} h-11 px-3`}
                  placeholder="How Array.reduce works"
                />
              </Field>

              <Field label="Why saved?">
                <textarea
                  value={draft.why}
                  onChange={(event) => updateDraft("why", event.target.value)}
                  className={`${fieldClassName} min-h-[92px] resize-none px-3 py-3`}
                  placeholder="I kept forgetting accumulator pattern"
                />
              </Field>

              <Field label="Language">
                <select
                  value={draft.language}
                  onChange={(event) => updateDraft("language", event.target.value)}
                  className={`${fieldClassName} h-11 px-3`}
                >
                  {languageOptions.map((language) => (
                    <option key={language}>{language}</option>
                  ))}
                </select>
              </Field>

              <Field label="Tags">
                <input
                  value={draft.tags}
                  onChange={(event) => updateDraft("tags", event.target.value)}
                  className={`${fieldClassName} h-11 px-3`}
                  placeholder="arrays, reduce, functional"
                />
              </Field>

              <label className="flex items-center justify-between rounded-lg border border-vault-border bg-vault-card px-3 py-3 text-sm text-vault-text">
                <span>Favorite</span>
                <span
                  className={`flex h-6 w-11 items-center rounded-full border transition ${
                    draft.favorite
                      ? "border-vault-accent bg-vault-accent"
                      : "border-vault-border bg-vault-surface"
                  }`}
                >
                  <input
                    checked={draft.favorite}
                    onChange={(event) => updateDraft("favorite", event.target.checked)}
                    className="sr-only"
                    type="checkbox"
                  />
                  <span
                    className={`ml-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-vault-bg transition ${
                      draft.favorite ? "translate-x-5" : "translate-x-0"
                    }`}
                  >
                    {draft.favorite && <Check className="h-3 w-3" aria-hidden="true" />}
                  </span>
                </span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-vault-border p-4">
              <button
                className={secondaryButtonClassName}
                onClick={onClose}
                type="button"
              >
                Cancel
              </button>
              <button
                className={primaryButtonClassName}
                type="submit"
              >
                <Save className="h-4 w-4" aria-hidden="true" />
                Save Note
              </button>
            </div>
          </form>

          <div className="flex min-h-[420px] flex-col">
            <div className="flex items-center justify-between border-b border-vault-border px-5 py-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-vault-muted">
                  Code Editor
                </p>
                <p className="mt-1 text-sm text-vault-text">
                  {draft.language || "JavaScript"} snippet
                </p>
              </div>
              <span className="rounded-md border border-vault-border bg-vault-card px-2 py-1 text-xs uppercase text-vault-muted">
                {mode}
              </span>
            </div>

            <div className="min-h-0 flex-1">
              <AceEditor
                mode={mode}
                theme="tomorrow_night"
                value={draft.code}
                onChange={(value) => updateDraft("code", value)}
                name="snipdesk-editor"
                width="100%"
                height="100%"
                fontSize={14}
                showPrintMargin={false}
                showGutter
                highlightActiveLine
                placeholder={editorPlaceholders[draft.language]}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 2,
                  useWorker: false,
                  wrap: true,
                }}
              />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({ children, label }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-vault-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

export default EditorDrawer;
