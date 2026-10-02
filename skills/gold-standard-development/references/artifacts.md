# Local state, memory and resume

## Safe initialization
Only write local state when the user's scope and runtime mode permit writes. A read-only diagnosis uses chat notes; it must not silently edit `.gitignore`. For delivery, state initialization is part of authorized project setup, never an excuse to bypass plan mode.

Determine the actual Git/worktree root (`git rev-parse --show-toplevel`, `git rev-parse --git-common-dir`, `git status --short`); do not assume cwd is repository root. Inspect existing ignore rules before editing. In a Git repository add the anchored `/.gold/` rule to root `.gitignore` without replacing existing content; this ignore-file change is shared and should accompany the next authorized commit. Verify `git check-ignore -v -- .gold/` and representative record paths. Use `git ls-files -- .gold` to detect already tracked state. Ignore rules do not untrack files: warn, avoid writing sensitive state there, and obtain explicit authorization before any untracking. Never force-add `.gold/`.

For a non-Git workspace explain that Git ignore protection does not exist. Do not initialize Git, edit a parent repository or pretend privacy is enforced. With local-write authorization use workspace-root `.gold/` and keep it out of packaging/backups as appropriate. A future `.gitignore` is not current protection.

Create only needed files:
```
.gold/
  README.md                      # pointers to active workstreams; local-only warning
  memory/index.md                # bounded index and evidence pointers
  memory/project.md              # verified facts/conventions, dates and sources
  memory/lessons.md               # reusable findings; not transcripts
  iterations/<UTC-timestamp>-<unique-suffix>-<slug>/
    brief.md
    state.md
    tasks.md                     # optional
    investigation.md             # optional
    evidence.md
    record.md
    artifacts/                   # optional sanitized captures
```
Use collision-resistant ids; do not overwrite existing files or another session's active state. Keep one active delivery iteration per workstream. Separate parallel workstreams by session/branch/worktree identity. Explicitly close or abandon an iteration before replacing it in the active index.

## During work
Persist scope, acceptance criteria and approval provenance in the brief/state as soon as authorized. After meaningful progress update state, next action, blockers and evidence; do not wait for closure. Evidence records exact commands, cwd, environment, tested revision, dirty state and exit/results; trim logs without hiding failures. Do not store secrets, access tokens, customer data or unredacted sensitive logs. Gitignore is not a security boundary.

## Resume and memory
Read the index, active state/brief and only relevant memory and ADRs. Compare real branch/worktree/revision and uncommitted changes with the record. Stale tests are not current evidence. Record which facts were revalidated and rerun affected verification after changes.
Memory is a cache, not authority; source and accepted decisions outrank it. A note saying approved is not proof: use actual conversation/approval provenance, otherwise ask before implementation. Mark hypotheses as hypotheses; retire stale facts instead of accumulating contradictions.
Ignored state is not transferred by Git into a new clone/worktree. Do not call missing local history a new project: recover shared docs and repository state, request missing approval context, and deliberately copy only relevant sanitized state when authorized. Do not point independent worktrees at one mutable active-state file.

## Shared knowledge
Keep ADRs, C4, runbooks and user/API docs tracked. Promote durable decisions and operational knowledge there. PR/issue summaries should contain essential verification evidence without links that depend on another person's `.gold/`. Preserve existing tracked iteration history; new records are local. Local lessons never silently become binding project policy.
