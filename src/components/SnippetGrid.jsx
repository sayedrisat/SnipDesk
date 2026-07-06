import SnippetCard from './SnippetCard.jsx';
import EmptyState from './EmptyState.jsx';

export default function SnippetGrid({ notes, view, onOpen, onCopy, onDelete, onNewNote }) {
  if (notes.length === 0) {
    return <EmptyState onNewNote={onNewNote} />;
  }

  return (
    <div className={`av-grid${view === 'list' ? ' list-view' : ''}`}>
      {notes.map((note, i) => (
        <SnippetCard
          key={note.id}
          note={note}
          index={i}
          onOpen={onOpen}
          onCopy={onCopy}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
