# Review / Audit

Use for review-only code, design, security or quality assessment. Review is not repair permission. Follow `collaboration.md`; read only relevant engineering references and `security-privacy.md` when sensitive surfaces change.

1. Identify reviewed revision/diff and scope, acceptance requirements, relevant callers/tests/contracts, and existing user changes. Read implementation and surrounding behavior; do not judge only the diff.
2. Trace suspected defects to a concrete failure path. Inspect test side effects before scoped execution; read `test-validate.md` if running checks. Do not install tools, mutate shared environments, or write findings files without appropriate scope.
3. Use the project's severity scale. If absent, state this impact-based convention: Critical = immediate severe security/data-loss risk; Important = correctness, compatibility or operational defect needing repair before acceptance; Minor = limited-impact maintainability/usability improvement. Confidence is separate from severity.
4. Report findings first, ordered by impact. Each finding includes severity, location, triggering conditions, expected versus actual behavior, evidence, consequence, confidence and a minimal repair direction. Mark unverified suspicions as questions, not proven bugs. Avoid style-only churn and invented findings.
5. Summarize reviewed scope, checks performed, gaps and residual risks. “No findings” is not proof of correctness. Apply `architecture.md` to observed documentation discrepancies; report needed corrections instead of editing under review-only scope.

Output is a review report, not an implemented/accepted resolution. No delivery Gate 2 is needed merely to report findings. Transition to `resolve-issue.md` or `develop.md` only for requested and approved changes; internal review within an approved delivery stays in that iteration.
