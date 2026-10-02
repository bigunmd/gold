# Shared architecture and decisions

Shared location: `docs/architecture/c4.md`, optional focused views under `docs/architecture/components/`, and `docs/adr/`. Preserve established equivalent repository locations rather than creating duplicate authorities; record the mapping locally.

## Baseline and impact
When adopting GOLD for a new or existing project, establish accurate C4 system-context and container views as part of authorized delivery. If baseline creation is outside scope, state the gap and obtain scope approval or explicitly record deferral. Scale to the real system: a library may have a consumer/library context and no independently deployed container view; mark that level not applicable with a reason. Do not invent services.

At every feature/fix/refactor/release/spike closure and diagnosis report assess:
- actors/system boundaries and external integrations;
- runnable/deployable units, stores, ownership/responsibilities;
- communication/data flows, protocols and important trust boundaries.

Record `updated`, `reviewed-no-change`, or `not-applicable` with evidence/reason. If a required update is not authorized or cannot be completed, record `update-required/deferred` with the exact discrepancy and blocker; never mislabel it no-change. Delivery acceptance must explicitly acknowledge any deferred required documentation.

Update affected diagrams when the implementation changes OR investigation proves existing documentation inaccurate. A factual correction is allowed without an ADR; do not manufacture a decision to satisfy documentation ceremony. Diagnosis-only authorization does not allow tracked edits: report the correction needed and ask for scope to apply it. Every iteration needs an assessment, not a gratuitous diagram edit.

Use Level 3 component views only where internal structure matters. Add sequence/dynamic diagrams for complex failure paths, retries or races when useful. Link diagram relationships to actual source/config evidence; keep secrets/production credentials out. Validate diagram syntax/rendering with existing tooling where available; disclose when only manual/source review was possible. Do not install a renderer implicitly.

## ADRs
Create a timestamped, uniquely numbered ADR for a consequential decision with meaningful alternatives/tradeoffs. Routine work and factual discoveries need no ADR. Accepted ADRs guide work until superseded. Keep substantive historical content immutable; correct status/supersession metadata and indexes as necessary, pointing to the new decision. Draft decisions may be revised before acceptance. Record date, status, context, alternatives, decision, consequences and relevant links.

Diagrams describe current architecture, ADRs explain decisions, local records describe execution. A diagram change log can reference an ADR, issue, commit or factual source; it must not depend solely on private local records.
