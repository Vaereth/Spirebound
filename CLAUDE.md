# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Deploying

Claude deploys. The workflow for **every change**:

1. Edit the files.
2. Run `npm run build` and confirm it passes.
3. Show the diff and the commit message before pushing.
4. Commit with a clear, imperative message.
5. Push to `origin main`.

- **NEVER push a failing build.** Build green is the gate for every push.
- This repo has no `deploy` script — `npm run build` is the deploy gate. (If a
  `npm run deploy` script is added later, run it after the push.)
