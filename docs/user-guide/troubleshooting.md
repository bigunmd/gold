# Troubleshooting and recovery

Start with read-only inspection. Do not delete profile state, reset Git, reinstall packages or change permissions as a default troubleshooting step.

| Symptom | Check | Safe next action |
|---|---|---|
| Preset missing from selector | Installed bundle/revision, enabled state, activation diagnostics and runtime compatibility | List exact identifiers; resolve reported activation error before changing configuration. `v1.0.0` has only Development. |
| GOLD skill not found | Installed package resources and `customSkillDirs`; project skills shadowing bundled names | Inspect discovery diagnostics and selected preset; do not hardcode the author's filesystem path. |
| New behavior seems ignored | Existing session's preset revision, actual package/link target, applicable project instructions | Start a new session after authorized activation; distinguish on-demand resource reads from retained preset definition. |
| Too many approval questions | Selected style, actual approved brief, unresolved assumptions | State style and reference the approved scope. Report a reproducible duplicate gate; do not disable safety boundaries wholesale. |
| Agent acts beyond request | Current tools/jobs, diff, approved scope and external effects | Stop affected work, preserve evidence and inspect before choosing recovery. |
| Resumed work uses stale notes | Branch/worktree/revision/dirty state, dates and approval provenance | Revalidate facts and rerun affected checks; memory is a cache, not authorization. |
| Generated preset check fails | Shared source changes and generated artifact | In a maintainer checkout run `npm run build:presets`, inspect the diff, then test. Do not hand-edit generated output. |
| Tests need a shared database | Setup/teardown, migrations/resets, exact target and credentials handling | Withhold execution until writes/target are explicitly scoped; prefer authorized isolated fixtures. |
| Push over HTTPS returns 403 | Authenticated account and repository write access | Correct credentials or use an authorized SSH identity. Never print tokens or bypass repository permissions. |

## Agent overstep: recover deliberately

1. Stop affected execution and identify any continuing jobs/subagents. Cancellation may not undo completed effects.
2. Inspect the diff and operation evidence. Separate user changes from agent changes; redact sensitive output.
3. Assess local and external impact. A Git reset cannot undo deployed changes or database writes.
4. Propose the smallest recovery and obtain authorization for destructive or external effects. Do not auto-revert user work or assume rollback is safe.
5. Verify the recovered state and record remaining uncertainty. Report a sanitized reproduction through the bug form, or privately through the [security policy](../../SECURITY.md) for vulnerabilities.

## FAQ

**Is Architect read-only?** No. It starts with planning guidance but tools may mutate state. Explicit scope and runtime controls remain necessary.

**Does Delegated start a team?** No. It changes routine decision-making, not the execution method or permissions.

**Can I switch focus mid-task?** Yes. Preserve valid approval and ask only for missing or materially changed scope; no runtime preset remount is implied.

**Will my style persist forever?** No global persistence is promised. Task overrides expire; saved notes never grant action authority.

**Why is the community checklist still incomplete?** Files must exist on GitHub's default branch. Repository description is a separate GitHub setting. Local tests do not verify GitHub's rendered forms or checklist indexing.

**Why are release instructions cautious?** Building, accepting, committing, tagging, publishing and deploying are separate actions. See the [release checklist](../maintainers/releases.md).
