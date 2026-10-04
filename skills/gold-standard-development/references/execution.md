# Execution envelope, budgets and resume

Load for multi-milestone delivery, open-ended execution, background jobs or interrupted work. Keep simple work lightweight. These are instruction-level controls, not a scheduler or runtime enforcement. Persist only with local-write authorization; otherwise keep a compact chat record. Reuse actual scoped approval, not memory assertions.

## Explicit multi-milestone envelope
Use `../templates/execution-envelope.md` alongside the brief when a task spans milestones. Identify the outcome, approved scope/targets/exclusions and provenance, criterion IDs, milestone dependencies, owners, budget and stop conditions. Classify each checkpoint before execution:
- **Internal steps:** implementation/test/review activities inside an approved iteration; no extra approval for phase changes.
- **Informational milestones:** report evidence/progress inside that iteration; not acceptance and not authority to start a separate delivery iteration.
- **Human acceptance:** present current criterion-linked evidence at Gate 2; stay awaiting-acceptance until explicit acceptance. Default: do not start the next delivery iteration before acceptance or explicit abandonment.

A broad request, Delegated style or an envelope is not a silent gate waiver. If the user explicitly changes the process (for example batching acceptance across named milestones), record the exact process change, affected gates/milestones, exclusions and approval provenance. Resolve ambiguity before crossing a gate; retain every unchanged gate and all higher-priority safety boundaries. Do not relabel already independent delivery iterations as internal steps merely to bypass acceptance. Gate 1 still requires the presented goal, approach and criteria; reopen affected scope when new risks invalidate it. No automatic Git, publication, production mutation or cleanup.

## Configurable execution budget
Extend the debug playbook's stopping/time budget, rather than creating a second policy. Set task-appropriate limits in the brief/state: elapsed investigation/execution time, retry/experiment count, no-progress threshold, child/job concurrency, and tool/cost limits when measurable. Use explicit user limits first, applicable project limits next; otherwise propose a bounded task-specific budget with the brief (not arbitrary universal numbers). Runtime caps remain binding. Record units, current consumption, reset conditions and who can authorize an extension; unavailable counters stay unknown, not zero.

Count retries across resume, child work and approach changes against the same relevant budget; do not reset it silently. A retry needs a new discriminating hypothesis or changed condition, not just another chance at green. At a limit or repeated no-progress: stop launching affected work, collect useful evidence, reconcile outstanding work, and report the limit, findings and next discriminating option. Ask for an extension or changed scope only where required; do not silently skip promised tests, lower criteria or declare success. Budgets are stopping controls, not permission to mutate.

## Outstanding child/job ledger
Use `../templates/state.md` to record each assignment/job immediately: logical and runtime IDs, parent/owner, objective, owned paths or operation target, scope/provenance, baseline content identity, dependencies, start/last observation, budget used, status, possible effects, output pointer and next collect/cancel action. Distinguish queued, running, completed-uncollected, collected, cancellation-requested, cancelled-confirmed, failed and unknown. Track descendants where observable; stopping a parent does not prove its children stopped.

On resume, before new overlapping work:
1. Revalidate actual workspace/worktree/revision/content and approval provenance per `artifacts.md`. Read the ledger, not just the last prose summary.
2. Query available runtime status and collect completed outputs by exact ID. Do not duplicate a running child/job. Work on independent authorized tasks instead of busy-polling.
3. Reconcile changed files and external targets against baseline and returned results. Lost IDs, failed collection, a timeout or an unreachable runtime mean unknown status and **unknown effects**, not no effect. Inspect safely; avoid replaying non-idempotent actions until effects are known or an explicitly approved recovery accounts for uncertainty.
4. Cancel irrelevant work when permitted; record the request and confirm terminal status where possible. Cancellation is not rollback. Reconcile partial writes, external effects and descendants separately; do not remove user work or undo mutations without recovery scope.
5. Update evidence freshness and budget consumption. Keep unresolved effects as blockers for overlapping work, verification and acceptance; report remaining uncertainty and an owner/next reconciliation action. Do not claim a clean completion while relevant work is uncollected or effects remain unknown.
