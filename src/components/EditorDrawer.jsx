import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import {
  getRecallSummary,
  LANGUAGES,
  RECALL_INTERVALS,
} from "../hooks/useNotes.js";
import TagsInput from "./TagsInput.jsx";
import CodeField from "./CodeField.jsx";

const EMPTY_FORM = {
  title: "",
  lang: "TypeScript",
  collection: "Utilities",
  reason: "",
  tags: [],
  favorite: false,
  recallEnabled: false,
  code: "",
};

export default function EditorDrawer({
  open,
  editingNote,
  collections = [],
  defaultLang,
  defaultCollection,
  onClose,
  onSave,
  onDelete,
  onRecall = () => {},
  onResetRecall = () => {},
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const titleRef = useRef(null);
  const availableCollections =
    form.collection && !collections.includes(form.collection)
      ? [form.collection, ...collections]
      : collections;
  const recallSummary = editingNote ? getRecallSummary(editingNote) : null;

  useEffect(() => {
    if (!open) return undefined;

    if (editingNote) {
      setForm({
        title: editingNote.title,
        lang: editingNote.lang,
        collection: editingNote.collection,
        reason: editingNote.reason,
        tags: [...editingNote.tags],
        favorite: Boolean(editingNote.favorite),
        recallEnabled: Boolean(editingNote.recall?.enabled),
        code: editingNote.code,
      });
    } else {
      const firstCollection = collections[0] || "Uncategorized";
      setForm({
        ...EMPTY_FORM,
        lang: defaultLang || "TypeScript",
        collection:
          defaultCollection &&
          defaultCollection !== "All" &&
          defaultCollection !== "Favorites" &&
          collections.includes(defaultCollection)
            ? defaultCollection
            : firstCollection,
      });
    }

    const focusTimer = setTimeout(() => titleRef.current?.focus(), 350);
    return () => clearTimeout(focusTimer);
  }, [open, editingNote, defaultLang, defaultCollection, collections]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape" && open) onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  const setField = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));
  const setTags = (tags) => setForm((current) => ({ ...current, tags }));
  const setCode = (code) => setForm((current) => ({ ...current, code }));
  const toggleFavorite = () =>
    setForm((current) => ({ ...current, favorite: !current.favorite }));
  const toggleRecall = () =>
    setForm((current) => ({
      ...current,
      recallEnabled: !current.recallEnabled,
    }));

  const handleSave = () => {
    const payload = {
      title: form.title.trim() || "Untitled snippet",
      lang: form.lang,
      collection: form.collection,
      reason: form.reason.trim(),
      tags: form.tags,
      favorite: form.favorite,
      recallEnabled: form.recallEnabled,
      code: form.code,
    };

    onSave(payload, editingNote ? editingNote.id : null);
  };

  return (
    <>
      <div className={`av-overlay${open ? " open" : ""}`} onClick={onClose} />
      <div className={`av-drawer${open ? " open" : ""}`}>
        <div className="av-drawer-head">
          <h2>{editingNote ? "Edit snippet" : "New snippet"}</h2>
          <div className="av-drawer-actions">
            <button
              className={`av-heart-btn${form.favorite ? " active" : ""}`}
              onClick={toggleFavorite}
              type="button"
              aria-label={
                form.favorite ? "Remove from favorites" : "Add to favorites"
              }
              title={
                form.favorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Heart size={15} fill={form.favorite ? "currentColor" : "none"} />
            </button>
            <button
              className="av-drawer-close"
              onClick={onClose}
              type="button"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        <div className="av-drawer-body">
          <div className="av-field">
            <label>Title</label>
            <input
              ref={titleRef}
              type="text"
              placeholder="e.g. useDebounce"
              value={form.title}
              onChange={setField("title")}
            />
          </div>

          <div className="av-row-2">
            <div className="av-field">
              <label>Language</label>
              <select
                className="appearance-none bg-[#1b1b1b]"
                value={form.lang}
                onChange={setField("lang")}
              >
                {LANGUAGES.map((language) => (
                  <option
                    className="bg-[#1b1b1b] focus:bg-black"
                    key={language}
                  >
                    {language}
                  </option>
                ))}
              </select>
            </div>
            <div className="av-field">
              <label>Collection</label>
              <select
                value={form.collection}
                className="appearance-none bg-[#1b1b1b]"
                onChange={setField("collection")}
              >
                {availableCollections.map((collection) => (
                  <option
                    className="bg-[#1b1b1b] focus:bg-black"
                    key={collection}
                  >
                    {collection}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="av-field">
            <label>Reason</label>
            <textarea
              rows={2}
              placeholder="Why did you save this?"
              value={form.reason}
              onChange={setField("reason")}
            />
          </div>

          <div className="av-field">
            <label>Tags</label>
            <TagsInput tags={form.tags} setTags={setTags} />
          </div>

          <div className={`av-recall-panel${form.recallEnabled ? " active" : ""}`}>
            <div className="av-recall-panel-head">
              <div>
                <span>1-4-7 Memory Recall</span>
                <strong>
                  {form.recallEnabled ? "Learning mode on" : "Optional learning mode"}
                </strong>
              </div>
              <button
                className={`av-recall-toggle${form.recallEnabled ? " active" : ""}`}
                type="button"
                onClick={toggleRecall}
                aria-pressed={form.recallEnabled}
              >
                {form.recallEnabled ? "On" : "Off"}
              </button>
            </div>
            <p>
              Enable this only for snippets you want to actively remember. It
              schedules recall checkpoints using the 1 day, 4 day, and 7 day
              rule.
            </p>

            {form.recallEnabled && (
              <div className="av-recall-panel-body">
                <div className="av-recall-steps">
                  {RECALL_INTERVALS.map((interval, step) => (
                    <span
                      key={interval}
                      className={
                        recallSummary &&
                        (step < recallSummary.completedSteps ||
                          recallSummary.mastered)
                          ? "complete"
                          : ""
                      }
                    >
                      Day {interval}
                    </span>
                  ))}
                </div>
                {editingNote?.recall?.enabled ? (
                  <div className="av-recall-status-row">
                    <div>
                      <strong>{recallSummary.title}</strong>
                      <span>{recallSummary.detail}</span>
                    </div>
                    {!recallSummary.mastered && (
                      <button
                        type="button"
                        onClick={() => onRecall(editingNote.id)}
                      >
                        Remembered
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onResetRecall(editingNote.id)}
                    >
                      Restart
                    </button>
                  </div>
                ) : (
                  <span className="av-recall-save-note">
                    Recall schedule starts after you save this note.
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="av-field">
            <label>Code</label>
            <CodeField
              language={form.lang}
              value={form.code}
              onChange={setCode}
            />
          </div>
        </div>

        <div className="av-drawer-foot">
          {editingNote ? (
            <button
              className="av-btn-danger-text"
              onClick={() => onDelete(editingNote.id)}
              type="button"
            >
              Delete
            </button>
          ) : (
            <span />
          )}
          <div style={{ display: "flex", gap: 10, marginLeft: "auto" }}>
            <button className="av-btn-ghost" onClick={onClose} type="button">
              Cancel
            </button>
            <button className="av-btn-primary" onClick={handleSave} type="button">
              Save note
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
