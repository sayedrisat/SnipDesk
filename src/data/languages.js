export const languageOptions = ["JavaScript", "CSS", "HTML", "Python", "JSON"];

export const aceModes = {
  JavaScript: "javascript",
  CSS: "css",
  HTML: "html",
  Python: "python",
  JSON: "json",
};

export const editorPlaceholders = {
  JavaScript: `const total = [1, 2, 3].reduce((acc, cur) => {
  return acc + cur;
}, 0);`,
  CSS: `.snippet-card {
  border: 1px solid #2a2a2a;
  background: #161616;
}`,
  HTML: `<section class="vault">
  <h1>SnipDesk</h1>
</section>`,
  Python: `total = sum([1, 2, 3])
print(total)`,
  JSON: `{
  "title": "Reusable snippet"
}`,
};
