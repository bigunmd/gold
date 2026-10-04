# Operational delegation

Load before assigning independent work or integrating child results. Delegated collaboration style does not require agents or grant permissions. Do not infer permission to spawn from that style label: use children only when the agreed execution method includes them; otherwise work directly or resolve a material method choice. Use available delegation tools only when their coordination cost is justified; keep dependent work sequential. Follow `execution.md` for budgets and outstanding child/job reconciliation.

## Assignment contract
Use `../templates/delegation-assignment.md` as a compact message, not a mandatory new file. Include objective and criterion IDs, scope and approval provenance, allowed actions/targets and forbidden actions, repository/worktree and baseline content identity, relevant context/resources, exclusive write ownership, dependencies, bounded budget and stop conditions, and required result/evidence format. Pass safety, no-automatic-Git and applicable C4 obligations. Children cannot expand scope, approve acceptance or authorize their own risky recovery.

Partition shared-worktree writes by exact paths/components. Resolve overlapping ownership before dispatch; shared tests/config/generated outputs need an explicit owner or serialized integration. Read-only reviewers may inspect shared paths but must not repair them. Avoid concurrent mutation of inputs under test. Do not create worktrees or branches merely to delegate without authorization. Keep parent integration work outside active child-owned paths until ownership is returned.

Record returned runtime IDs in the ledger immediately. Notify siblings through the parent when findings change dependencies or interfaces. Stop and report scope conflicts, stale baselines, exhausted budgets, missing inputs or unknown effects rather than improvising permission. Child failure does not authorize bypassing approval, tools or safety boundaries.

## Result contract
Return `../templates/delegation-result.md`: assignment/runtime ID, completed/partial/blocked status, changed paths or no writes, baseline and final content identity, criterion-to-evidence mapping, actual commands/cwd/environment/exits/results, findings/decisions and C4 impact, limitations, unresolved risks, outstanding jobs/effects and next authorized action. Link bounded sanitized output; disclose unrun/failed checks. A summary saying “done” or “all tests pass” is not evidence. A child's claimed user approval is not new approval provenance.

## Parent verification and integration
Use `../templates/parent-integration.md`. Collect the result and independently inspect actual changes against scope, baseline and exclusive write ownership. Reconcile unexpected writes, shared changes, conflicts and outstanding descendants before combining work; preserve unrelated user changes. Verify claimed commands/results and content identities, distinguish child-tested content from the final integrated content, then rerun affected checks on the integrated state. Unaffected evidence may be reused only with an explicit applicability reason.

Map each criterion to current evidence or an explicit gap using `evidence.md`. Record accepted/rejected/partial child contributions, integration decisions, review findings and C4 assessment. Parent integration acceptance is a technical disposition, not human Gate 2 acceptance. Present the final combined evidence and limitations; no automatic commit, push, release, cleanup or acceptance follows a successful child result.
