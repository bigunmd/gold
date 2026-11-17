# GOLD architecture

GOLD is configuration and model-facing resources consumed by a coding host, not an independently deployed application. Start with the context; follow a boundary view only when changing or reviewing that part of the system.

## Current views

| Reader question | View | Scope |
|---|---|---|
| Who uses GOLD, and who controls execution? | [System context](current/system-context.md) | Developer, GOLD core, coding hosts and target project |
| How do shared sources become usable resources? | [Resource structure](current/resource-structure.md) | DSH generation, preset composition, skill discovery and project knowledge |
| What may a portable installation change? | [Host installation boundary](current/host-installation.md) | Project-local adapter output, ownership checks and partial-failure recovery |
| What executes during optional UI lookup? | [UI guidance and lookup boundary](current/ui-lookup.md) | Design routing, host-provided Python, local data and stdout |
| What do maintainer checks exercise? | [Maintainer validation boundary](current/maintainer-validation.md) | Opt-in model evaluation, installed Loader gate and evidence limits |

These are **current source-state views**, migrated from revision `09fd9cfeaaf1f0003b21de679f40bb6c6fc4d4ba` (package version 1.6.0). They describe the repository's implemented resources, not deployment or activation in a particular host. Relative source links resolve to the checkout being read; use the baseline below when comparing the migration. The focused boundary views preserve existing material rather than proposing new architecture. No accepted ADR or future design is implied.

## Evidence and validation

Each view links its source contracts and relevant checks. Source inspection establishes structure and documented boundaries; it does not establish live host discovery, model compliance or successful activation. The [validation guide](../validation.md) distinguishes automated, behavioral and mounted-session evidence. The [maintainer view](current/maintainer-validation.md#evidence-limits) explains the separate Loader and behavioral boundaries.

Diagram syntax was reviewed manually only; no Mermaid renderer was run for this migration. No installer, model evaluation or runtime gate was executed as part of this documentation change. Historical validation remains historical evidence, not a fresh test of these views or the active profile.

## History

Use Git for architecture history rather than an append-only changes table:

- [Pre-migration architecture at the baseline revision](https://github.com/bigunmd/gold/blob/09fd9cfeaaf1f0003b21de679f40bb6c6fc4d4ba/docs/architecture/c4.md).
- [Architecture history through that revision](https://github.com/bigunmd/gold/commits/09fd9cfeaaf1f0003b21de679f40bb6c6fc4d4ba/docs/architecture/c4.md).
- Locally, inspect `git log -- docs/architecture` and `git show 09fd9cfeaaf1f0003b21de679f40bb6c6fc4d4ba:docs/architecture/c4.md`.

The former table's milestones are retained as current source relationships in [resource structure](current/resource-structure.md): the initial declarative bundle, adaptive entry points/shared generation, and scenario/style discovery with engineering guidance. Their chronology belongs in Git, not in a second architecture narrative.

The [legacy entry point](c4.md) retains the original heading anchors for inbound links. Vocabulary follows the canonical [project glossary](../glossary.md); this migration changes organization, not established meanings.
