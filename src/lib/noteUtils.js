export const createEmptyDraft = () => ({
  title: "",
  why: "",
  language: "JavaScript",
  tags: "",
  code: "",
  favorite: false,
});

export function countLanguages(notes) {
  const counts = notes.reduce((totals, note) => {
    totals[note.language] = (totals[note.language] || 0) + 1;
    return totals;
  }, {});

  return Object.entries(counts)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, count]) => ({ name, count }));
}

export function parseTagInput(value) {
  return value
    .split(",")
    .map((tag) => tag.trim().replace(/^#/, ""))
    .filter(Boolean);
}

export function draftFromNote(note) {
  return {
    title: note.title,
    why: note.why,
    language: note.language,
    tags: note.tags.join(", "),
    code: note.code,
    favorite: note.favorite,
  };
}

export function noteFromDraft(draft, id) {
  return {
    id: id || makeNoteId(),
    title: draft.title.trim() || "Untitled snippet",
    why: draft.why.trim() || "Reusable code memory",
    language: draft.language,
    tags: parseTagInput(draft.tags),
    code: draft.code.trim() || "// Write the snippet you want to remember",
    favorite: draft.favorite,
    updatedAt: "Just now",
  };
}

export function noteMatchesSearch(note, query, includeCode) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  const searchableParts = [
    note.title,
    note.why,
    note.language,
    note.tags.join(" "),
  ];

  if (includeCode) {
    searchableParts.push(note.code);
  }

  return searchableParts.join(" ").toLowerCase().includes(normalizedQuery);
}

export function getGreeting(date = new Date()) {
  const hour = date.getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 18) {
    return "Good afternoon";
  }

  return "Good evening";
}

function makeNoteId() {
  if (globalThis.crypto?.randomUUID) {
    return crypto.randomUUID();
  }

  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
