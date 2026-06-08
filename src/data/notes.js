export const initialNotes = [
  {
    id: "array-reduce",
    title: "Array.reduce accumulator",
    why: "Forgetting the accumulator pattern",
    language: "JavaScript",
    tags: ["array-methods", "reduce"],
    favorite: true,
    updatedAt: "2m ago",
    code: `const total = cart.reduce((sum, item) => {
  return sum + item.price * item.qty;
}, 0);

console.log(total);`,
  },
  {
    id: "dom-event-delegation",
    title: "DOM event delegation",
    why: "Dynamic list items need one listener",
    language: "JavaScript",
    tags: ["dom", "events"],
    favorite: false,
    updatedAt: "14m ago",
    code: `document.querySelector(".menu").addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  runAction(button.dataset.action);
});`,
  },
  {
    id: "flexbox-centering",
    title: "Flexbox centering",
    why: "Alignment fix for compact empty states",
    language: "CSS",
    tags: ["css", "layout"],
    favorite: false,
    updatedAt: "31m ago",
    code: `.panel {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 16rem;
}`,
  },
  {
    id: "fetch-api-get",
    title: "Fetch API GET",
    why: "API practice without extra wrapper",
    language: "JavaScript",
    tags: ["api", "fetch"],
    favorite: false,
    updatedAt: "1h ago",
    code: `async function loadUser(id) {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) throw new Error("Request failed");

  return response.json();
}`,
  },
  {
    id: "python-dedupe",
    title: "Python unique list",
    why: "Preserve order while removing duplicates",
    language: "Python",
    tags: ["python", "list"],
    favorite: true,
    updatedAt: "3h ago",
    code: `def unique(items):
    seen = set()
    return [item for item in items if not (item in seen or seen.add(item))]

print(unique(["a", "b", "a"]))`,
  },
  {
    id: "html-dialog",
    title: "Native dialog open",
    why: "Quick modal without a dependency",
    language: "HTML",
    tags: ["html", "dialog"],
    favorite: false,
    updatedAt: "Yesterday",
    code: `<dialog id="confirm">
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="ok">Confirm</button>
  </form>
</dialog>`,
  },
];
