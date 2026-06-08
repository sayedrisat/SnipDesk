# Contributing to CodeVault

Thanks for helping improve CodeVault. This project is a small frontend app, so the best contributions are focused, easy to review, and tested locally.

## Pick an Issue

Start with an open GitHub issue, especially one labeled `good first issue` or `enhancement`.

If you want to work on something that does not have an issue yet, open a feature request first so the scope can be discussed.

## Create a Branch

Use a short branch name that describes the change:

```bash
git checkout -b feature/localstorage-persistence
git checkout -b fix/mobile-sidebar-overflow
git checkout -b docs/update-readme
```

## Run the App Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the Vite URL shown in your terminal, usually:

```txt
http://localhost:5173
```

## Make Focused Commits

Keep commits small and related to one purpose. Good commit messages:

```bash
feat: add localStorage persistence
fix: improve mobile sidebar overflow
docs: update README screenshots
```

Avoid committing generated files such as `node_modules/`, `dist/`, cache folders, logs, or local environment files.

## Open a Pull Request

Before opening a pull request:

1. Review the live demo:

   ```txt
   https://codevault-2sp.pages.dev/
   ```

2. Run locally:

   ```bash
   npm install
   npm run dev
   ```

3. Test your changes.

4. Include screenshots for UI changes.

5. Explain:

- What changed
- Why it changed
- How it was tested

## Screenshots for UI Changes

If your change affects layout, colors, spacing, text, drawer behavior, cards, search, or mobile screens, include screenshots in the PR.

Useful screenshots:

- desktop view
- mobile view
- before/after comparison
- drawer or modal state if changed

## Describe Before and After

In your PR description, explain:

- what behavior existed before
- what behavior exists after
- how you tested the change
- any known limitations or follow-up work

Small, clear PRs are much easier to review and merge.
