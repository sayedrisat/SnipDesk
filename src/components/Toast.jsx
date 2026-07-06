export default function Toast({ message }) {
  return (
    <div className={`av-toast${message ? ' show' : ''}`}>
      <span className="av-dot" />
      <span>{message || ''}</span>
    </div>
  );
}
