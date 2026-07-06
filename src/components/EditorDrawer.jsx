import { useEffect, useRef, useState } from "react";
import { COLLECTIONS, LANGUAGES } from "../hooks/useNotes.js";
import TagsInput from "./TagsInput.jsx";
import CodeField from "./CodeField.jsx";

const EMPTY_FORM = {
  title: "",
  lang: "TypeScript",
  collection: "Utilities",
  reason: "",
  tags: [],
  code: "",
};

export default function EditorDrawer({
  open,
  editingNote,
  defaultLang,
  defaultCollection,
  onClose,
  onSave,
  onDelete,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const titleRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    if (editingNote) {
      setForm({
        title: editingNote.title,
        lang: editingNote.lang,
        collection: editingNote.collection,
        reason: editingNote.reason,
        tags: [...editingNote.tags],
        code: editingNote.code,
      });
    } else {
      setForm({
        ...EMPTY_FORM,
        lang: defaultLang || "TypeScript",
        collection:
          defaultCollection && defaultCollection !== "All"
            ? defaultCollection
            : "Utilities",
      });
    }
    const t = setTimeout(
      () => titleRef.current && titleRef.current.focus(),
      350,
    );
    return () => clearTimeout(t);
  }, [open, editingNote, defaultLang, defaultCollection]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  const setField = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));
  const setTags = (tags) => setForm((f) => ({ ...f, tags }));
  const setCode = (code) => setForm((f) => ({ ...f, code }));

  const handleSave = () => {
    const payload = {
      title: form.title.trim() || "Untitled snippet",
      lang: form.lang,
      collection: form.collection,
      reason: form.reason.trim(),
      tags: form.tags,
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
          <button
            className="av-drawer-close"
            onClick={onClose}
            aria-label="Close">
            ✕
          </button>
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
                className="appearance-none bg-[#1b1b1b] "
                value={form.lang}
                onChange={setField("lang")}>
                {LANGUAGES.map((l) => (
                  <option className="bg-[#1b1b1b] focus:bg-black " key={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div className="av-field">
              <label>Collection</label>
              <select
                value={form.collection}
                className="appearance-none bg-[#1b1b1b] "
                onChange={setField("collection")}>
                {COLLECTIONS.map((c) => (
                  <option className="bg-[#1b1b1b] focus:bg-black " key={c}>
                    {c}
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
              onClick={() => onDelete(editingNote.id)}>
              🗑 Delete
            </button>
          ) : (
            <span />
          )}
          <div style={{ display: "flex", gap: 10, marginLeft: "auto" }}>
            <button className="av-btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button className="av-btn-primary" onClick={handleSave}>
              Save note
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
