# SnipDesk

Save code the way you write code.

A developer-focused code notebook for saving, organizing, searching, and reusing code snippets.

SnipDesk gives developers a dedicated place to capture reusable snippets, add context, organize by tags and language, and quickly find code again when it matters.

## Quick Links

- [Live Demo](https://snipdesk-2sp.pages.dev/)
- [Features](#features)
- [Installation](#installation)
- [Contributing](#contributing)
- [Roadmap](#future-vision)
- [Discussions](https://github.com/sayedrisat/SnipDesk/discussions)
- [Issues](https://github.com/sayedrisat/SnipDesk/issues)

## Live Demo

Live Demo:
https://snipdesk-2sp.pages.dev/

Contributors should preview the live demo first, then run the project locally before opening a pull request.

## Screenshot Preview

![SnipDesk UI Preview](public/screenshots/snipdesk-preview.png)

## Project Status

Current Version: v0.1.0-alpha

Status: Active Development

Looking for Contributors: Yes

Primary Focus: Building a fast developer-focused code notebook.

## Features

- Save reusable code notes with title, reason, language, tags, and snippet body
- Search across note metadata and optional code content
- Browse snippets by language, collection, and tags
- Edit notes in a right-side drawer with syntax highlighting
- Copy snippets quickly from preview cards
- Responsive dark UI designed for developer workflows
- Alpha roadmap for persistence, deletion, import/export, and toast feedback

## Why SnipDesk?

Most note-taking apps treat code as a secondary feature.

SnipDesk is built around the idea that code is the note.

Instead of storing snippets inside documents, SnipDesk provides a dedicated workspace for organizing, searching, and reusing code efficiently.

## Tech Stack

- Vite
- React
- Tailwind CSS
- Ace Editor for syntax highlighting
- Lucide React icons

## Future Vision

SnipDesk is evolving from a simple code notebook into a complete developer knowledge workspace.

Planned roadmap:

### v0.2.0

- localStorage persistence
- delete notes
- copy success toast
- save success toast

### v0.3.0

- JSON export
- JSON import
- keyboard shortcuts
- improved search experience

### v0.4.0

- Monaco Editor (VS Code engine)
- syntax highlighted note previews
- improved mobile experience
- advanced filtering

### Future Features

- AI-powered snippet explanations
- AI-generated learning notes
- Semantic code search
- Smart code relationships
- Personal developer memory system
- favorite collections
- command palette
- GitHub Gist integration
- Notion integration
- browser extension
- VS Code extension
- cloud sync

Long-term goal:

> Become the personal knowledge base for developers.

Not just a place to store code, but a place to remember, organize, understand, and reuse knowledge.

## Installation

Clone the repository:

```bash
git clone https://github.com/sayedrisat/SnipDesk.git
cd SnipDesk
```

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open the local Vite URL shown in your terminal, usually:

```txt
http://localhost:5173
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Usage

1. Open SnipDesk in your browser.
2. Start from the landing page to understand the project and feature flow.
3. Open the workspace at `/app` to manage your code notes.
4. Use the search bar to find saved snippets by title, tag, language, explanation, or code body.
5. Select a language or tag from the sidebar to narrow the list.
6. Click **New Note** to create a reusable code note.
7. Add a short reason for saving the snippet so it is easier to remember later.
8. Use **Copy** on a note card to copy the snippet.
9. Use **Edit** to open the drawer editor and update a note.

## App Routes

- `/` - public landing page for the project
- `/app` - developer notebook workspace for creating, searching, and editing snippets

## Previewing Pull Requests Locally

Before reviewing or opening a pull request, preview the live demo first, then run the project locally:

```bash
git clone https://github.com/sayedrisat/snipdesk.git
cd snipdesk
npm install
npm run dev
```

Open the local Vite URL shown in your terminal, usually:

```txt
http://localhost:5173
```

Before opening a PR, please:

- run `npm run dev`
- test the UI locally
- take a screenshot if your change affects the UI
- mention what you changed in the PR description

## Cloudflare Pages Deployment

SnipDesk is prepared for Cloudflare Pages deployment from GitHub.

Recommended Cloudflare Pages settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Node version: use the version in `.node-version`

## Contributing

Contributions are welcome. Start with a small focused issue, especially one labeled `good first issue`.

Suggested workflow:

1. Pick an issue from the roadmap or GitHub issues.
2. Create a focused branch.
3. Run the app locally.
4. Make a small, reviewable change.
5. Test the affected UI or feature.
6. Add screenshots for UI changes.
7. Open a pull request with a clear before/after explanation.

Read the full contributor guide in [CONTRIBUTING.md](CONTRIBUTING.md).

## Looking for Contributors

Contributions are welcome.

Current areas where contributors can help:

- React
- Tailwind CSS
- Monaco Editor
- Search and Filtering
- Accessibility
- Developer Tooling
- Documentation
- Future AI Integrations

Check:

- [Issues](https://github.com/sayedrisat/SnipDesk/issues)
- [Discussions](https://github.com/sayedrisat/SnipDesk/discussions)
- [Good First Issues](https://github.com/sayedrisat/SnipDesk/labels/good%20first%20issue)
- [Help Wanted](https://github.com/sayedrisat/SnipDesk/labels/help%20wanted)

If you are looking to make your first open-source contribution, this project is beginner-friendly.

## Good First Issues

Good first improvements include:

- Add localStorage persistence
- Add note deletion
- Add copy success toast notification
- Improve mobile sidebar behavior
- Update README screenshots

## Core Maintainers

- Sayed Risat
- Aushah Gowhar

## Support the Project

If you find SnipDesk useful:

- Star the repository
- Share feedback
- Open feature requests
- Join Discussions
- Contribute improvements

Every contribution helps improve the developer experience.

## License

SnipDesk is released under the [MIT License](LICENSE).
