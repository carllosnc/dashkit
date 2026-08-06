# AGENTS.md

## Git Workflow

- **Never commit directly to `master`.** The `master` branch is protected: direct pushes are blocked and changes are only merged via pull request.
- Always create a dedicated branch for your work (e.g. `chore/update-deps`, `feat/button`, `fix/modal-close`).
- Push the branch and open a pull request targeting `master`.
- Pull requests require the `build_test_lint` CI check to pass and 1 approving review before merge.

## Commands

- `bun run test` — run the test suite
- `bun run lint` — run ESLint
- `bun run build` — typecheck and build
- `bun run check:all` — test + lint + build
- `bun run build:cli` — build the CLI bundle
