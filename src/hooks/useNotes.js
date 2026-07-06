import { useMemo, useState } from "react";
import useLocalStorage from "./useLocalStorage.js";

export const LANGUAGES = [
  "TypeScript",
  "JavaScript",
  "Python",
  "Bash",
  "Go",
  "Rust",
  "SQL",
  "CSS",
];
export const COLLECTIONS = [
  "React Hooks",
  "Docker Configs",
  "Python Scripts",
  "Utilities",
];

const SEED_NOTES = [
  {
    id: 1,
    title: "useDebounce",
    lang: "TypeScript",
    collection: "React Hooks",
    reason:
      "Custom hook to debounce fast-changing values without external deps",
    tags: ["hooks", "performance"],
    code: `import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value)

  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(value)
    }, delay)
    return () => clearTimeout(t)
  }, [value, delay])

  return debounced
}`,
  },
  {
    id: 2,
    title: "flatten_dict",
    lang: "Python",
    collection: "Python Scripts",
    reason: "Recursively flatten nested dictionaries with a custom separator",
    tags: ["utils", "dict"],
    code: `def flatten_dict(d, parent_key='', sep='.'):
    items = []
    for k, v in d.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.extend(flatten_dict(v, new_key, sep).items())
        else:
            items.append((new_key, v))
    return dict(items)`,
  },
  {
    id: 3,
    title: "git-clean-branches",
    lang: "Bash",
    collection: "Utilities",
    reason: "Remove all local branches already merged into main",
    tags: ["git", "cleanup"],
    code: `#!/usr/bin/env bash
git branch --merged main | grep -v "\\* main" | xargs -n 1 git branch -d`,
  },
  {
    id: 4,
    title: "useLocalStorage",
    lang: "TypeScript",
    collection: "React Hooks",
    reason: "useState with automatic localStorage sync and JSON parsing",
    tags: ["hooks", "storage"],
    code: `import { useState } from 'react'

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initial
  })

  const set = (v: T) => {
    setValue(v)
    localStorage.setItem(key, JSON.stringify(v))
  }

  return [value, set] as const
}`,
  },
  {
    id: 5,
    title: "docker-compose base",
    lang: "Bash",
    collection: "Docker Configs",
    reason: "Minimal compose file for a node + postgres dev stack",
    tags: ["docker", "devops"],
    code: `version: "3.9"
services:
  app:
    build: .
    ports: ["3000:3000"]
    depends_on: [db]
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: devpass`,
  },
];

function nextIdFrom(notes) {
  return notes.reduce((max, n) => Math.max(max, n.id), 0) + 1;
}

export default function useNotes() {
  const [notes, setNotes] = useLocalStorage("codevault:notes", SEED_NOTES);
  const [activeCollection, setActiveCollection] = useState("All");
  const [activeLang, setActiveLang] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const counts = useMemo(() => {
    const c = { All: notes.length };
    COLLECTIONS.forEach((col) => {
      c[col] = notes.filter((n) => n.collection === col).length;
    });
    return c;
  }, [notes]);

  const filteredNotes = useMemo(() => {
    return notes.filter((n) => {
      if (activeCollection !== "All" && n.collection !== activeCollection)
        return false;
      if (activeLang && n.lang !== activeLang) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const haystack =
          `${n.title} ${n.reason} ${n.tags.join(" ")} ${n.code}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [notes, activeCollection, activeLang, searchQuery]);

  const saveNote = (payload, editingId) => {
    if (editingId) {
      setNotes((prev) =>
        prev.map((n) => (n.id === editingId ? { ...n, ...payload } : n)),
      );
    } else {
      setNotes((prev) => [{ id: nextIdFrom(prev), ...payload }, ...prev]);
    }
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return {
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
  };
}
