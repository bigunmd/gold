# Six practical task recipes

These are illustrative prompts and expected contracts—not observed transcripts or guarantees of model compliance. Replace project-specific details yourself. See [style selection](choosing.md) and [limitations](../validation.md).

## 1. Understand an unfamiliar repository

**Use when:** onboarding or deciding where a change belongs. Start with Auto, Balanced.

> Inspect this repository read-only. Explain its purpose, important directories, entry points, data flows, build/test commands, and known architecture decisions. Cite source evidence and separate facts from assumptions. Do not write notes, install packages, run tests, or fix anything.

**Expected output:** concise repository map, commands with their source, current-system description, uncertainties and suggested next investigation.

**Checkpoint:** ask only for user-owned ambiguity that inspection cannot resolve. Ask for separate scope before experiments or edits.

**Common mistake:** treating absent local notes as a new project, inventing services for a diagram, or executing a command merely because it appears in a script.

## 2. Design a feature before coding

**Use when:** requirements or architecture are not settled. Start with Architect, Guided.

> Design organization-level permissions for this application. First inspect existing identity, authorization and data models. Compare viable approaches, recommend one, and describe contracts, trust boundaries, migrations, compatibility, risks and acceptance tests. Planning only: no code, dependency installation, shared documentation edits or production actions.

**Expected output:** verified baseline, requirements/assumptions, options and trade-offs, recommendation, proposed flows/contracts, delivery sequence and measurable acceptance criteria.

**Checkpoint:** meaningful trade-offs; implementation begins only after a brief covering implementation is approved. Do not repeat approval for phases already included in that brief.

**Common mistake:** assuming approval of an architecture discussion authorizes scaffolding or changing a database.

## 3. Fix a reproducible bug

**Use when:** you want an actual repair, not only a diagnosis. Start with Development, Balanced.

> The parser accepts an invalid empty identifier; expected behavior is a validation error. Inspect the cause and propose a minimal local fix with a regression test. Present scope and acceptance criteria before edits. After I approve, demonstrate the failing regression, implement the fix, and run relevant checks. No commits, remote issue closure or deployment.

**Expected output:** reproduction and causal explanation, approved minimal change, RED/GREEN evidence, nearby behavior checks and remaining limitations.

**Checkpoint:** fix brief approval, material scope change, and final evidence acceptance. Unknown cause routes through investigation without speculative patch stacking.

**Common mistake:** “Could not reproduce” reported as fixed, or a failing test caused by broken setup counted as a regression demonstration.

## 4. Review a change without editing

**Use when:** checking a PR/diff before acceptance. Start with Reviewer / QA, Balanced.

> Review the changes between the base and candidate revisions I identify. Read surrounding callers and tests. Report evidence-backed findings with severity, location, triggering conditions, impact and confidence. Do not edit files, install dependencies or run side-effecting tests. Explain coverage limits and suggested checks separately.

**Expected output:** findings first; project severity scale or stated fallback; evidence and confidence; reviewed revision/scope and gaps. No findings is not proof of correctness.

**Checkpoint:** clarify missing revisions or test-execution scope when necessary. A report does not require delivery acceptance before being shown.

**Common mistake:** automatically repairing findings, creating ignored notes during read-only review, or inventing low-value findings to fill a report.

## 5. Improve a test suite

**Use when:** coverage numbers are high but important risks remain untested. Start with Reviewer / QA, Balanced.

> Assess the tests around payment retries. Read-only first: identify behavior and failure risks, fixture isolation, deterministic timing, negative paths and integration gaps. Propose a small test-authoring scope with acceptance evidence. Before executing tests, inspect setup/teardown and external targets. Do not fix product code or access shared databases without separate approval.

**Expected output:** risk-to-test map, concrete proposed cases, side-effect/environment analysis, test-authoring brief, then actual results only after approval.

**Checkpoint:** test writes/execution and exact shared targets if any. Product bugs discovered during test authoring do not imply product-repair permission.

**Common mistake:** targeting a coverage percentage alone, silently replacing integration with mocks, or rerunning flaky tests until green and hiding failures.

## 6. Prepare a release safely

**Use when:** preparing a publication or deployment decision. Start with DevOps, Guided.

> Prepare a release-readiness assessment for this revision. Inspect compatibility, dependencies, package contents, CI evidence, migration requirements, rollback feasibility and health checks. Propose version impact from public behavior and list missing evidence. Preparation only: no tags, publication, deployment, production mutations or destructive recovery.

**Expected output:** prepared/not-ready assessment, compatibility and migration risks, reproducible validation evidence, proposed release/version notes, rollout and recovery prerequisites.

**Checkpoint:** separate explicit authorization for publication/deployment, naming target and permitted effects/recovery. A failure log cannot authorize a destructive rollback.

**Common mistake:** claiming a healthy deployment from a successful build, assuming all schema changes are reversible, or publishing because preparation was accepted.

## Reuse the pattern

Good prompts name **outcome, context, style, allowed actions, exclusions, and evidence**. You do not need a large prompt for every task; these examples demonstrate boundaries for substantial work.
