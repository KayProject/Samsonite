# Next Tasks

## Current Status

- ✅ `nexttask.md` created and pushed to `kayproject/main`.
- ✅ Recent rebrand commits were rewritten to `kayproject` for the top two commits.
- ✅ `kayproject` remote is configured over SSH.
- ⚠️ The latest `nexttask.md` commit itself is currently authored by `jadonamite`; I can rewrite that if you want.

## Remaining Work

1. Cleanup remaining Automata text references
   - Search the repo for `Automata`/`automata`, update remaining textual occurrences, and commit.

2. Verify commit authorship on remote
   - Confirm recent commits on `kayproject/main` show `kayproject` as author/committer.

3. Rewrite older commits to kayproject (optional)
   - If desired, use `git filter-repo` to rewrite older `jadonamite` commits to `kayproject`, then force-push.

4. Update or remove `origin` remote
   - Decide whether to keep `origin` (Automata upstream) or remove/rename it to avoid confusion.

5. Run build and tests
   - Run `npm --workspace=frontend run build` and project tests; fix any issues and commit fixes.

6. Finish README and docs rebranding
   - Update links, licenses, and references; confirm documentation reflects Samsonite branding.

Notes:
- I tracked these tasks in the workspace todo list so we can mark progress.
- Tell me which tasks you want me to tackle first and I'll start.
