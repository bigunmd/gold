# GOLD engineering presets

Installable Cordis bundle `@local/dsh-gold-preset`: one shared engineering core, selectable specialties, and adaptive collaboration. This checkout contains an **unreleased adaptive update**; the existing `v1.0.0` tag is the older single-preset release.

## Choose a starting point

| Preset | ID | Use for |
|---|---|---|
| **GOLD Auto** (recommended) | `gold-auto` | Route by your requested outcome and propose useful phases |
| **GOLD Development** | `gold` | Development, fixes and refactoring; preserves the existing identity |
| **GOLD Architect** | `gold-architect` | Requirements, architecture, trade-offs and planning |
| **GOLD Reviewer / QA** | `gold-reviewer` | Evidence-backed review, test strategy and validation |
| **GOLD DevOps** | `gold-devops` | CI/CD, infrastructure, releases and operations |

A specialty is an initial focus, not a hard role wall. You can ask an Architect to move to implementation after approving its scope. Changing focus inside a session does not remount a preset or change tools/permissions. This bundle does not change your Harness default preset.

## Choose how to collaborate

| Style | How GOLD works |
|---|---|
| **Guided** | Explains options and asks at consequential decisions; small meaningful stages |
| **Balanced** (default) | Recommends an approach, handles routine approved details, asks on material changes |
| **Delegated** | Resolves routine details within approved boundaries; reports milestones and escalates exceptions |

Examples:
- “Design this service with GOLD Architect, guided. No implementation.”
- “Implement this in Balanced style; local code and tests only.”
- “Switch to Delegated for the approved plan; no deployment.”
- “Review only. Report findings; don't fix anything.”

For substantial work, GOLD proposes a style with the scope question if you have not already chosen one. It asks at meaningful decisions, not on timers or every few messages. Phases already covered by an approved complete brief do not trigger repeated approval. Pure questions stay lightweight. Delegated does **not** require subagents, remove acceptance gates, or authorize production actions.

Task preferences override session/project style preferences, but safety constraints remain constraints. Task overrides expire; preferences never prove action approval. This version uses conversation context and authorized local records, not global settings; no cross-session preference persistence is promised.

## Scenarios and engineering guidelines

The packaged `gold-standard-development` skill routes Plan/Design, Develop, Debug/Investigate, Resolve issue, Review/Audit, Test/Validate and Release/Operate. Architecture/planning, software development, testing/QA, DevOps/reliability and security/privacy references load only when relevant.

Planning, diagnosis, review and test-execution reports do not imply repair permission or accepted delivery. Tests can change state: GOLD inspects their side effects and target before running them. Release preparation, publication, deployment and recovery are distinct scopes.

Optional process skills supplement the self-contained quality core but cannot impose automatic Git actions or committed planning artifacts. Project skills may shadow bundled resources; critical persona constraints remain in force and genuine conflicts must be surfaced.

## Artifacts and boundaries

Local briefs, progress, investigations, evidence and bounded memory live in repository-root `.gold/`, ignored with `/.gold/`. Shared ADRs, C4 and runbooks stay tracked. Every closure assesses C4; update actual changes/proven inaccuracies, not diagrams or ADRs for ceremony.

Local records are a cache, not proof of approval. They do not travel through Git/worktrees. Ignore rules do not protect already tracked files or secrets. Read-only requests do not authorize notes files or `.gitignore` edits; non-Git workspaces have no ignore protection. Handoffs carry scope/provenance, revision/dirty state, decisions/evidence, risks and next authorized action.

**Instruction-driven, not enforced isolation:** Architect and Reviewer retain tools such as shell and are not read-only sandboxes. Runtime permission policy and explicit action scope remain authoritative. No preset or style grants publication, deployment, destructive recovery or remote issue closure permission.

## Install and update

Use the Harness `plugin_manager` tool: `action: install_bundle`, `target` set to the absolute directory containing the reviewed bundle. Do not hand-edit profile manifests or install dependencies in the profile. Select the desired GOLD preset in a **new session** after activation; existing sessions retain their preset revision. Restart DSH when needed after package replacement.

For GitHub distribution, install an explicitly published release tag from https://github.com/bigunmd/gold. The older `github:bigunmd/gold#v1.0.0` does not contain this adaptive update. There is no automatic Git synchronization; `private: true` prevents accidental npm publication, not Git installation.

Local installations can link directly to the source directory. Keep that directory in place, and develop changes in an isolated workspace rather than accidentally modifying the installed source. Integration and activation are separate authorized actions. Skill paths resolve from the installed package identity, not an author's workstation path.

## Development and verification

Maintainers edit `preset-src/core-persona.txt`, `preset-src/roles.mjs` and `preset-src/shared-tools.yml`; generate the declarative artifact with:

```sh
npm run build:presets
npm test
npm run check:presets
npm pack --dry-run --json
```

`cordis.patch.yml` is generated and checked for freshness. Runtime consumers need only the generated artifact and packaged skills; generator inputs/scripts/tests and `.gold/` do not ship. There are no install scripts, new dependencies, custom host plugins or native preset-inheritance assumptions. Shared Standard tool composition and planning/compaction/delegation isolation are preserved; compare against current Standard when upgrading Harness.

Tests cover generation behavior, stale checks, package contracts, bounded resources and relative links. `tests/scenarios.md` defines instruction evaluation cases. Distinguish structural tests, static consumer simulations and fresh-session runtime evidence: none alone proves model compliance or enforcement.

Adaptive update verification: 48 automated checks passed during implementation; the DSH 0.2.0-rc.2 Loader parsed all five declarations and their shared plugin configuration matched the original. Static consumer simulation covered ten adaptive interactions. The adaptive update has **not been installed or live-session validated** by this work. Further final-review/packaging evidence belongs in the delivery summary, not an inferred release claim.

### Fresh-session smoke checklist after authorized activation
1. Verify five selectable GOLD entries and no change to the global default.
2. In a new session for each entry, load `gold-standard-development` and verify packaged resource discovery.
3. Ask Auto to plan substantial work without selecting a style; expect a Balanced proposal combined with scope clarification.
4. Choose Guided, then Delegated within approved local-only scope; expect meaningful checkpoints without an automatic team or production permission.
5. Ask Architect for design only and Reviewer for findings only; expect no edits. Ask QA about side-effecting shared-DB tests and DevOps about release preparation; expect target/scope boundaries.
6. Confirm covered phase transitions reuse approval, and completion reports current evidence without claiming acceptance.

## Rollback

List bundles for the exact identifier, then disable `@local/dsh-gold-preset` with `plugin_manager` `set_bundle`, or remove it with `remove_bundle`, only when authorized. To restore a previous release, reinstall the explicitly chosen prior bundle/version. Existing sessions may retain loaded revisions. Never delete legacy files, linked source directories or local work as an automatic rollback step.
