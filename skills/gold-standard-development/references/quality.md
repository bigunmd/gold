# GOLD execution and quality core

Self-contained fallback when optional process skills are absent. When present, load the relevant process skill for deeper technique; GOLD artifact/gate/no-automatic-Git constraints still apply.

## Design and execution
Understand intended outcome and existing code before proposing behavior. Compare plausible approaches and rejection reasons; use the approved brief as the design contract. Break large work into independently verifiable steps in the local tasks file. Respect approved execution method. Parallelize only independent work with clear ownership and bounded context. Subagents inherit scope and safety rules; they cannot approve a changed brief. Read `delegation.md` before assignment/integration and `execution.md` for budgets, multi-milestone envelopes or outstanding child/job reconciliation.

## TDD and debugging
For behavior changes write a failing test first, run it and confirm the failure demonstrates the defect/missing behavior rather than test setup errors. Implement the smallest passing change, run it, then refactor under green tests. Exercise boundary, negative and relevant integration cases. Record actual RED and GREEN evidence. An aggregate “test failed” followed by green does not establish defect-specific RED; require the relevant assertion/error or label causal RED unproven. If approval names an exact command, alternate flags, environment overrides or isolation modes need scope clarification before execution, even when they seem diagnostic. For documentation/configuration or infeasible automated repro, propose an appropriate validation substitute in the brief and explain limitations instead of pretending TDD occurred.

On unexpected failures inspect full errors, reproduce and trace root cause, compare known-good behavior, form one hypothesis and run one discriminating test at a time. Avoid stacked speculative patches. Stop and revisit the approach when repeated attempts do not improve evidence. Fix the causal issue, not just symptoms; add regression coverage. Follow debug scope boundaries for potentially destructive experiments.

## Verification and review
Read command exit codes and actual output. A stale run, partial suite, skipped check or unavailable tool is not proof. Follow `evidence.md`: bind scoped checks to tested content identity, verify acceptance criteria individually with criterion-to-evidence links, and record gaps. Reconcile concurrent writers and rerun affected checks after integration; revision/dirty labels alone do not establish freshness. Seek independent review for significant changes where available. Review feedback technically against code/evidence before implementing it; resolve material findings and rerun affected checks. Never claim live behavior from registration or static tests alone.

## Definition of Done (scale obligations in the approved brief)
- Acceptance criteria met with current evidence; regression and promised broader tests pass.
- Static checks (format/lint/types) pass where applicable; new warnings addressed.
- Security/dependency/secret checks appropriate to changed surfaces; exceptions explicit.
- Auth/input/network/PII changes include threat assumptions, abuse cases and mitigations.
- Operational changes have useful logs/metrics/health signals, not sensitive payload logs.
- User/API/config docs and runbook updated for changed contracts/operations.
- Schema/data/config changes state backward compatibility, migration and rollback; flag coordinated deployment requirements.
- C4 assessment recorded; affected views updated or deferral explicitly accepted.
- Consequential decisions recorded in shared ADRs; durable knowledge promoted out of private memory.
- User-visible changes have a changelog entry if the project uses one.
- No debug leftovers, accidental files or unresolved material review findings.
- Evidence limitations and waived obligations are explicit; no silent N/A checkboxes.

## Delivery actions
Use conventional branch/commit names when such actions are authorized; do not create branches/worktrees or commits automatically. Follow `git-policy.md` for names, scope, identity/signing and no-model-authorship rules; preserve approved human attribution and legal notices. Preserve user work. Never commit ignored local artifacts. Merge, push, release, remote issue closure, deployment and destructive cleanup need explicit authorization. SemVer follows actual public compatibility impact: breaking major, compatible capability minor, compatible fixes patch, subject to repository policy. Verification is not publication permission.
