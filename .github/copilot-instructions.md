# Copilot instructions for this repository

## Build, test, and lint commands

This repository does not define a local build/lint/test toolchain yet (`package.json` scripts and test runner config are not present).

- Install dependencies used by the exercise scaffold:
  ```bash
  npm install
  ```
- Validate exercise progress through the GitHub Actions step workflows (the primary verification mechanism in this repo):
  ```bash
  gh workflow run "Step 1"
  gh workflow run "Step 2"
  gh workflow run "Step 3"
  gh workflow run "Step 4"
  ```

There is currently no repository-defined "single test" command; Step 2 and Step 3 validations are workflow checks that inspect expected files/content patterns.

## High-level architecture

This codebase is a **GitHub Skills exercise orchestrator**, not a traditional app codebase. The "application work" (calculator code/tests) is produced by learners, and repository logic is mainly in workflow automation.

1. **Step orchestration via workflows**  
   `.github/workflows/0-start-exercise.yml` starts the exercise, posts step content, and enables Step 1.  
   `1-step.yml` → `2-step.yml` → `3-step.yml` → `4-step.yml` form a gated sequence; each successful step disables itself and enables the next.

2. **Validation model is event + content based**  
   Workflows are triggered by specific events/paths and then validate expected outcomes:
   - Step 1: issue title/body checks for calculator request quality.
   - Step 2: pushes to `create-calc-app` with `src/*.js`; checks for calculator operation keywords in `src/calculator.js`.
   - Step 3: pushes to `create-calc-app` with `src/tests/*.js`; requires `src/tests/calculator.test.js` or `calculator.tests.js`, then checks for extended-operation test keywords.
   - Step 4: on closed PR to `main`, verifies repository issue count and posts final review content.

3. **Shared toolkit integration**  
   Multiple workflows depend on `skills/exercise-toolkit` reusable workflows/templates and use `GrantBirki/comment` plus `peter-evans/find-comment` to update exercise issue comments.

## Key repository conventions

- Use `.github/ISSUE_TEMPLATE/feature_request.md` when creating calculator-related feature issues.
- In this repository, only add/commit/push when the user explicitly asks for it.
- Keep calculator implementation under `src/` and tests under `src/tests/` to match workflow triggers.
- Preserve expected naming/terms used by validators (`addition`, `subtraction`, `multiplication`, `division`, `modulo`, `power`, `square`).
- Use branch name `create-calc-app` for calculator implementation work expected by Step 2 and Step 3.
- Export calculator functions with `module.exports` (the exercise instructions and troubleshooting guidance assume CommonJS exports).
