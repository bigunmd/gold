# Verification evidence
Date / environment / cwd: <...>
Revision / branch / worktree: <... or non-Git>
Dirty state tested: <user changes versus task changes; include relevant untracked inputs>
Content identity: <algorithm/tool or snapshot; covered paths/input manifest and exclusions; limitations>
Before / after identity: <digest/snapshot for each run; changing inputs require reconciliation/rerun>

| Evidence ID | Obligation | Exact command / observation | Exit code | Actual result | Tested identity / limitations |
|---|---|---|---|---|---|
| E-1 | Regression RED | ... | ... | demonstrated original failure | ... |
| E-2 | Regression GREEN | ... | ... | ... | ... |
| E-3 | Broader suites/static checks | ... | ... | ... | ... |

## Criterion-to-evidence linkage
| Criterion ID | Evidence IDs / exact assertions | Outcome | Remaining gap |
|---|---|---|---|
| AC-1 | E-2; ... | met / failed / partial / blocked / not-run | ... |
Uncovered criteria: <IDs and missing observation; none only with support>

## Sanitized output
<bounded actual summaries/output pointers; no secrets; no invented runs; retain failures/flaky/skipped checks>
## Freshness
<current vs tested identity/environment; concurrent writers; changes invalidating affected evidence; rerun or explicit reuse justification>
