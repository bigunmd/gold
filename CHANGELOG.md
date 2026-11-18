# Changelog

User-visible changes are recorded here. Unreleased entries are not a published tag, installation result or promise of compatibility.

## Unreleased

## 1.7.1

- Fix preset loading on DSH 0.2.2 by removing the retired `@deepseek-ai/dsh-tool-subagent-control/list-agents` plugin declaration from the shared source and all five generated presets. Keep the main `tool-subagent-control` plugin, which supplies `list_agents` on that runtime line; add regression coverage.
- Target the DSH 0.2.2 plugin layout. DSH 0.2.1-rc.5 still needs the separate plugin for `list_agents`; use GOLD 1.7.0 on that older runtime or explicitly upgrade DSH before installing this release. No automatic runtime/profile update or approval-policy change.

## 1.7.0

- Organize C4 documentation as a small index with focused current, use-case and evolution views. Add lifecycle-aware templates and a legacy migration procedure covering section mapping, approval, provenance, compatibility anchors, partial migrations and repeatability. Migrate GOLD's own architecture as a worked example; no migration executable, new dependency or automatic project/profile update.

- Default all GOLD presets and portable host startup instructions to concise technical prose. Keep progress updates event-driven and retain scope, decision rationale, evidence, risks and next authorized actions in handoffs; collaboration style and approval gates remain unchanged. No new skill, dependency or automatic runtime update.

## 1.6.0

- Simplify the README with human installation steps, an agent installation prompt and version-independent release selection.
- Extract host-neutral GOLD policy and skill mechanics with explicit DSH bindings; preserve all five preset identities, tools and invocation classifications.
- Add a dependency-free, source-checkout project-local installer for Codex, Claude Code and OpenCode. Preview is default; explicit apply preserves surrounding instructions, rejects collisions/modified resources/symlink paths, and records version/content hashes with legal notices.
- Map Codex user-only metadata and retain Claude flags; conservatively omit all 16 user-only skills from OpenCode. One external adapter per project; global installs, plugin distribution, native role selectors and live authenticated checks are not included.
- Add fixture safety/resource tests, portable installation/recovery guidance, project vocabulary and architecture updates. No live host compatibility certification, publication or active-profile update is implied.

## 1.5.0

- Add selective Web UI routing to all five presets: Anthropic Frontend Design, UI/UX Pro Max, Taste, Vercel Web Interface Guidelines and Impeccable. Shared foundations cover typography/color/layout, accessibility, responsive states and motion; evidence guidance separates source/browser/visual/automated/manual checks.
- Bundle pinned Pro Max standard-library Python search and CSV data, with stdout-only generation and persistence disabled. Include source/hash manifests, full licenses and regression coverage. Python 3 is optional for lookup users and required for the integration tests.
- Preserve existing brand/system and GOLD gates; no new preset/plugin, active-profile activation, browser tooling, Taste/Impeccable engine/hooks/telemetry or automatic install. Static tests and local searches do not establish fresh-session model behavior or product accessibility conformance.

- Integrate change-driven project glossary maintenance into all five GOLD/DSH presets: canonical discovery, approved-scope updates, Term / Definition / Distinction tables, lifecycle impact reporting and compatible existing-glossary consumption. No new plugin, background process or permission change; local installation and fresh-session behavior remain separate verification steps.

- Refresh the six existing Ponytail integrations to stable v5.3.3 (`7801d061243d7b753bad0e0b3c057cd250b11755`): explicit conversation-local `off`, ignore-aware debt scanning and corrected one-shot wording. Claude band UI, history imports and hooks are not installed.
- Refresh the existing 27 Matt Pocock skills and supporting resources to `4ae2317ddb22b046e26455e4f9c9b3aaaf62212d`: fresh-context delegation, tracker target/blocker/CLI corrections, legacy glossary migration proposals and safer wizard parsing/fallbacks. New upstream collections are excluded.
- Preserve GOLD approval/artifact contracts, user-only entry points and disabled wizard persistence/remote writes; refresh provenance and regression coverage. No preset identities, dependencies or runtime permissions change. The eight VoltAgent definitions were checked and are unchanged upstream; their original provenance pin remains.
- Support explicitly bounded hoisted DSH dependencies in the maintainer Loader gate via `--dependency-root`, retaining strict defaults and real-path escape rejection. No installed-runtime or profile mutation is needed.
- Static instruction checks do not establish model compliance or reproduce upstream benchmark results. Tag publication does not install or activate the bundle; mounted fresh-session behavior remains separately unverified.

## 1.4.1

- Fix first-turn prompt assembly on newer DSH by clearing the retired `{{cwd}}` persona suffix in all five presets. The working directory is supplied by DSH runtime context. Add generated-preset regression coverage and upgrade guidance.

## 1.4.0

### Added
- Six pinned Ponytail skills for minimal complete implementations, change reviews, repository audits, shortcut debt, benchmark reference and DSH help.
- 27 active Matt Pocock engineering/productivity skills with complete supporting resources, MIT notices and per-file upstream provenance.
- Shared on-demand skill routing across all five presets; 16 user-only Matt Pocock entry points retain their invocation flags.

### Adapted and fixed
- GOLD/DSH integration contracts preserve scope, collaboration, plan mode, authorization, verification and C4 assessment over upstream automatic Git/remote actions and artifact defaults.
- Working-tree Standards/Spec reviews explicitly include staged, unstaged and scoped untracked changes.
- Wizard templates reject noninteractive execution and disable persistence/remote-write helpers pending authorized target-specific safe implementations.
- Package validation permits skill-local script resources while still excluding root development scripts and private files.

### Compatibility and verification
- Five existing preset IDs, tools, permission boundaries and shared GOLD resources remain unchanged. No lifecycle hooks, global mode settings, project setup or automatic updates are installed.
- 119 local tests, packaged-resource/Markdown checks and exact installed DSH 0.2.0-rc.2 Loader/expression/module-resolution checks passed during integration preparation.
- Fresh-session mounted behavior and skill-picker smoke tests remain pending; installation of the local candidate reported restart-required. Upstream benchmark claims are not independently reproduced GOLD/DSH measurements.

## 1.3.0

### Added
- On-demand delegation assignment/result/integration contracts, execution envelopes, budgets and outstanding child/job reconciliation.
- Criterion-linked verification with explicit content identity and a source-checkout SHA-256 fingerprint helper.
- Seven executable behavioral cases with repeated baseline/candidate runs, event/filesystem evidence and explicit heuristic/adapter limitations.
- Opt-in packaged Harness Loader/expression/module-resolution gate; no profile activation implied.
- Reliable-execution and evaluation maintainer documentation; Node >=22.16.0 declared for modern runtime APIs.

### Fixed
- Git mutation fixtures isolate inherited repository routing, config, hooks, templates and identities; hostile-environment sentinel regressions cover containment.
- Package validation checks Markdown links against actual packaged inventory; README guides/policies use version-pinned hosted URLs.

### Preserved
- Five preset IDs, Standard tool composition, runtime permission policy, approval provenance and human acceptance boundaries. No new automatic agents, production actions or profile changes.

## 1.2.0

- Precise Git discipline: Conventional Commits/branches, identity/signing safeguards and no model authorship, preserving approved human attribution and legal notices.
- Candidate commit/PR metadata checks, safe event/range handling and advisory branch naming in CI.
- Eight on-demand domain specialties selectively adapted from pinned VoltAgent definitions, with bundled MIT notices and provenance.
- Specialty chooser, Git conventions and expanded behavioral/regression coverage. No new top-level presets, model switches or permissions.

## 1.1.0

### Added
- GOLD Auto, Architect, Reviewer / QA and DevOps entry points alongside existing GOLD Development (`gold`).
- Guided, Balanced and Delegated collaboration styles with decision-driven checkpoints.
- Standalone planning, review, testing and operational playbooks; on-demand architecture, development, QA, DevOps and security guidance.
- Shared-source preset generation, freshness checks, resource-link validation and expanded scenario matrix.
- MIT license, community policies, GitHub issue forms and pull-request template.
- User documentation: quick start, preset/style chooser, six recipes, project adoption template, troubleshooting and validation limits.
- Local documentation/package checks, CI workflow and explicit maintainer release checklist.

### Preserved
- Existing `gold` preset identity and shared tool/isolation configuration.
- Scope approval, evidence acceptance, local/private versus shared documentation boundaries, and no automatic Git/publication/deployment actions.

### Known limitations
- Adaptive presets have recorded structural/parser/static-review evidence, without completed fresh-session behavioral verification.
- Portable generation does not fully validate arbitrary nested YAML; actual Harness Loader parsing remains a mandatory release gate.
- Global collaboration preferences and enforced specialist sandboxes are not implemented.

## 1.0.0

Original tagged release with GOLD Development, development/investigation/issue-resolution scenarios, private iteration memory, shared architecture guidance and structural contract tests. It does not include the adaptive specialist roster introduced in 1.1.0.
