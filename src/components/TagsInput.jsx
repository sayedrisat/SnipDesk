import { useState } from 'react';

export default function TagsInput({ tags, setTags }) {
  const [entry, setEntry] = useState('');

  const addTag = () => {
    const val = entry.trim();
    if (val && !tags.includes(val)) {
      setTags([...tags, val]);
    }
    setEntry('');
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && entry.trim()) {
      e.preventDefault();
      addTag();
    }
    if (e.key === 'Backspace' && !entry && tags.length) {
      setTags(tags.slice(0, -1));
    }
  };

  return (
    <div className="av-tags-input">
      {tags.map((t) => (
        <span key={t} className="av-tag-chip">
          {t}
          <button type="button" onClick={() => removeTag(t)}>✕</button>
        </span>
      ))}
      <input
        type="text"
        placeholder="Add a tag, press Enter"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
