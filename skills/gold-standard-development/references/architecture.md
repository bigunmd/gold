# Shared architecture and decisions

## Discover and organize
Read the repository's architecture index, configured locations and relevant views before creating artifacts. Preserve established equivalent locations and names; do not create competing authorities. For a legacy monolith, mixed current/proposed content or partial split, read `architecture-migration.md` before proposing or applying migration. A small coherent document can remain valid; unrelated work does not authorize restructuring.

Default for new documentation: `docs/architecture/README.md` is a small navigation index, not a growing architecture diary. Create only useful views:

| Location under docs/architecture | Purpose |
|---|---|
| current/system-context.md | Actors, system boundary and external systems |
| current/containers.md | Actual applications, stores and communication |
| current/components/<boundary>.md | Optional focused internal structure |
| current/deployment/<environment>.md | Optional environment-specific deployment |
| use-cases/<scenario>.md | Current interactions: dynamic or sequence views |
| evolution/<change-id>-<name>/README.md | Consequential proposed change and transition |

Use `../templates/c4-architecture.md` for the index, `../templates/c4-view.md` for a focused view, and `../templates/c4-evolution.md` for a shared evolution proposal. Keep ADRs in `docs/adr/` or the established equivalent. Do not create empty folders, one diagram per feature, or a new documentation framework. C4 levels describe structural zoom; use cases and evolution are not additional levels. A container view is not a deployment view.

## Baseline and maintenance
At authorized adoption establish accurate system-context and container views where applicable. Initialization creates the first current views, not a permanent separate "initial" tree. If creation is outside scope, report the gap and request approval or explicit deferral. Scale to the real system: a library/configuration bundle may need context and resource structure, with no applicable container level; explain why rather than inventing services.

Keep one authoritative view per scope/purpose. Split by reader question or responsibility, not file length. Give each view its scope, lifecycle state, responsible team/module if known, source/config references and validation basis. Use consistent element names/identifiers across views and the canonical glossary. Link complementary views instead of copying whole diagrams. Add components only where internal structure matters, and dynamic/sequence views sparingly for important interactions, failure paths, retries or races.

Edit current views in place; no append-only change tables. Git records edits; ADRs preserve decision rationale. Current means verified for the stated source revision/baseline, not necessarily deployed. Deployment views identify their environment and evidence; never infer rollout from merged code. Keep a concise index of reading order, relevant views, active evolution and decisions, not an execution log. Shared knowledge must not depend solely on private local records.

## Evolution lifecycle
Use a shared evolution proposal only for a consequential transition needing durable coordination; routine plans stay in authorized local records. Reference current views and show only necessary target/transition views. Proposed use-case flows belong here until implemented, not among current use cases.

- `proposed`: alternative or target under discussion; not current fact or approval.
- `accepted`: decision approval has evidence; implementation/deployment still needs its own scope.
- `in-progress`: transition underway; current views describe verified reality, including material coexistence.
- `implemented`: implementation is verified and current/use-case views are updated; link resulting views and revision/evidence. This does not assert deployment or human delivery acceptance.
- `superseded` / `abandoned`: retain a short reason and successor if any; not active truth.

Do not infer status from filenames or aspirational wording. Preserve implemented/superseded/abandoned proposals as clearly historical records; stop maintaining their diagrams as a second current architecture. The index separates active work from historical references.

## Impact and validation
At every feature/fix/refactor/release/spike closure and diagnosis report assess actors/external integrations, units/stores/responsibilities, communication/data flows, and trust boundaries. Name the assessed views (including relevant use cases, deployments and active evolution), not just "C4 checked".

Record `updated`, `reviewed-no-change`, or `not-applicable` per affected scope with evidence/reason. If a required update is unauthorized or blocked, record `update-required/deferred`, the discrepancy and blocker. Delivery acceptance must explicitly acknowledge deferred required documentation.

Update affected views alongside implementation changes OR when investigation proves documentation inaccurate, without an ADR for a factual correction. Diagnosis-only scope allows reporting, not tracked edits. Every iteration needs an assessment, not gratuitous diagram edits. Check links, element consistency and source facts; validate diagram syntax/rendering with existing tooling where available and disclose manual-only review. Do not implicitly install a renderer or include secrets/production credentials.

## ADRs
Use the established numbering/naming convention, or unique dated/numbered records for consequential decisions with real alternatives/tradeoffs. Accepted ADRs guide work until superseded. Keep substantive accepted history immutable; correct status/supersession metadata and indexes with a link to the new decision. Drafts may be revised before acceptance. Record date, status, context, alternatives, decision, consequences and links. Do not manufacture an ADR or accepted status from a factual discovery or extracted legacy prose.
