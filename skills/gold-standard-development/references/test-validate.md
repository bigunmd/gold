# Test / Validate

Use for standalone test strategy, test authoring or execution. Distinguish these outcomes before acting: reading tests is not running them; running them is not permission to edit tests or fix product code. Read `testing-qa.md` for technique and `collaboration.md` for cadence.

1. Define tested behavior, revision/dirty state, environment and requested evidence. Inspect scripts, setup/teardown, network access, credentials, fixtures, migrations and resets before executing; resolve discoverable target facts without exposing secrets.
2. Confirm scope for any state-changing execution. “Just tests” does not authorize writes to an unspecified shared database. Unknown target or ambiguous reset scope means stop before execution and ask. Prefer isolated deterministic fixtures when already authorized.
3. Select relevant layers and negative/boundary/regression cases. State unavailable services/tools, cost limits and coverage gaps. Installing dependencies or introducing fixtures needs appropriate scope; do not quietly substitute mocks and claim live integration coverage.
4. For test authoring, approve goal/approach/acceptance criteria through the delivery brief, then use `quality.md`. Prove the new test exposes the intended defect before claiming regression coverage. Product fixes need their own covered scope, not accidental permission from writing a test.
5. Run scoped commands, inspect exit status and output, record actual counts/failures/skips and evidence freshness. Investigate flaky outcomes rather than repeating until green and hiding earlier failures. Relevant changes after the run invalidate affected evidence.
6. Report tested scope, commands/results, environment/revision, coverage gaps and limitations. For execution-only reports, no delivery acceptance is implied or required to communicate results. Authored test changes use ordinary verification and delivery acceptance; apply `architecture.md` where changed behavior or discoveries affect documentation.

A failing test is evidence, not authorization to repair or operate production. Route requested repairs through `resolve-issue.md`; internal testing of an already approved delivery needs no duplicate gate.
