# Agent Workflow Rules for CornerStone

## 1. Always Push to GitHub
- Whenever any code edits, features, bug fixes, or modifications are completed and verified:
  - Automatically stage all relevant changes (`git add`).
  - Create a clean, descriptive commit following Conventional Commits (e.g., `feat: ...`, `fix: ...`).
  - **Always push directly to GitHub (`git push origin main`)** without waiting for the user to ask.
  - Verify that the working directory is clean (`git status`).

## 2. Preserve "My Work" Section
- Do NOT touch, rebuild, or modify the design, layout, content, or components of the "My Work" section.

## 3. Environment & Security
- Never commit actual `.env` files with private secrets (always adhere to `.gitignore`).
- Keep `.env.example` updated with safe placeholders and instructions whenever new environment variables are introduced.
