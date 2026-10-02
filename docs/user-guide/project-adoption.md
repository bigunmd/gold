# Adopt GOLD in an existing project

Start by learning the project's conventions, not replacing them. GOLD's shared principles complement repository instructions; conflicting safety or process rules must be surfaced rather than silently ignored.

## Minimal adoption

1. Ask for a read-only repository overview using the [first recipe](recipes.md).
2. Identify existing instructions, architecture/decision records, build/test commands and deployment boundaries.
3. Agree a small first task and collaboration style. Propose local-state initialization only when writes are authorized.
4. Reuse existing documentation locations rather than creating duplicate authorities.
5. Validate results and adjust project guidance based on demonstrated needs.

The [optional template](../templates/project-guidance.md) can be adapted into your established repository instruction file. It is **not** a GOLD config schema or a file GOLD automatically discovers by that name. Do not introduce a second instruction system merely to use it.

## Adapt to project shape

| Project | Practical adaptation |
|---|---|
| Existing application | Preserve established conventions and ADRs; describe actual flows before proposing changes. |
| Monorepo | Identify package ownership, working directory, dependency graph and package-specific checks; do not assume root tests cover every package. |
| Small library | Focus on public contracts, consumers and compatibility; a deployed-container view may be N/A with a reason. |
| Weak or missing tests | Establish reproducible checks and a small risk-based baseline; disclose limits instead of pretending TDD evidence exists. |
| Non-Git workspace | No Git ignore protection exists; do not initialize Git or alter a parent repository implicitly. |
| Existing agent instructions/skills | Map responsibilities, preserve project constraints and resolve real conflicts; avoid duplicated policy text. |

## Local records versus shared knowledge

Authorized iteration notes and bounded memory belong in repository-root `.gold/`. Verify ignore rules and whether files are already tracked before recording anything. Ignore rules are not a secret store and do not untrack existing files. Read-only tasks stay in chat unless local writes are explicitly permitted.

Shared decisions, architecture, runbooks and user/API documentation stay tracked in established locations. Important handoff evidence should be self-contained, not a link into someone else's private notes.

New clones/worktrees do not receive ignored records. Recover shared documentation and actual approval provenance; deliberately transfer only relevant sanitized notes when authorized. Revalidate branch, revision and dirty state before trusting prior test results.

## Project preferences

Record stable conventions and safety boundaries, not blanket authorizations. Example: “Prefer Balanced for ordinary delivery; deployment requires exact target and action approval.” A saved preference for Delegated is not permission to mutate production, commit, or publish.

Start small: no mandatory migration of all documentation, no invented ADR for every change, and no automatic baseline rewrites. Report missing architecture documentation and agree whether it belongs in the current scope.
