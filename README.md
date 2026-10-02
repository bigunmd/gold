# GOLD Development preset

Installable Cordis bundle `@local/dsh-gold-preset` with one preset, `gold` / **GOLD Development**.

## Scenarios
- **Develop:** approved small delivery scope, TDD, verification, accepted closure.
- **Debug / Investigate:** evidence-led diagnosis; no implicit repair or tracked-doc edits.
- **Resolve issue:** triage, investigation where needed, regression-tested fix and acceptance.

Pure questions remain lightweight. Scenario playbooks and templates load on demand through `gold-standard-development`. The bundle includes a self-contained execution/quality reference; available process skills can supplement it but cannot impose automatic Git actions or committed planning artifacts.

## Artifacts
Local briefs, progress, investigations, evidence, iteration records and bounded memory live in repository-root `.gold/`, ignored with `/.gold/`. Shared ADRs, C4 architecture and runbooks stay tracked. Every closure assesses C4; updates follow actual changes or proven inaccuracies, not a requirement to create an ADR each time.

Local state does not travel through Git or to new worktrees. It is a cache, not proof of approval. Ignore rules do not protect already tracked files or secrets. Read-only diagnosis does not authorize local writes or `.gitignore` edits. Non-Git workspaces have no Git ignore protection. See the packaged artifact reference for safe adoption and resume rules.

## Install and use

For a workstation installation, use the DSH Plugins page or ask a management-enabled agent to run:

```json
{"action":"install_bundle","target":"github:bigunmd/gold#v1.0.0"}
```

Install a newer release tag explicitly to update; there is no automatic Git synchronization configured. Restart DSH after package replacement and select GOLD in a new session. GitHub distribution does not require npm publication; `private: true` prevents accidental npm publication, not Git installation. The repository is https://github.com/bigunmd/gold.

For local development, use the Harness `plugin_manager` tool with `action: install_bundle` and this package's absolute workspace directory as `target`. Do not hand-edit the profile manifest or install dependencies in the profile. Then select **GOLD Development** when creating a new session. Existing sessions retain their preset revision; this bundle does not change the default preset.

The skill root resolves from the installed package, not the legacy directory or this workspace. Project skill roots have higher discovery priority than the custom root; critical persona constraints remain in force and conflicts must be surfaced. This is instruction-driven behavior, not a filesystem enforcement plugin.

## Development and checks
`npm test` runs structural contract checks. `npm pack --dry-run --json` inspects the package allowlist; `.gold/` and tests must not ship. `tests/scenarios.md` is the behavioral evaluation matrix. Static checks and simulated instruction evaluation do not prove live model behavior; fresh-session validation is separate.

Based on the installed DSH Standard composition at migration time, using current persona prefix/suffix, isolated planning/compaction/delegation groups and workflow-ptc. No custom host code, install scripts or new dependencies. Compare with the current Standard preset when upgrading Harness.

## Rollback
List bundles first to obtain the exact identifier, then use `plugin_manager` with `action: set_bundle`, `target: @local/dsh-gold-preset`, `enabled: false`; or `remove_bundle` to uninstall. Existing sessions may retain their loaded revision. The original legacy GOLD files remain untouched. Do not delete them as part of rollback.

## Verification status
Validated against DSH 0.2.0-rc.2: 9 structural tests pass; parsed YAML matches Standard except intended persona/skill configuration; independent review evaluated all 18 scenario cases with no Critical/Important findings. Package dry-run excludes local state; a disposable Git fixture verifies the ignore rule.

Installed and enabled in the web profile through plugin_manager; `include:preset-gold` is active and profile package resolution reaches the skill resources. Installation uses a local link to this workspace: keep it in place. The package manager emitted a peer-dependency warning, but installation exited 0 and the bundle manager reported no activation warnings; no version exemptions were granted.

A fresh GOLD session's model behavior and mounted skill discovery have not been exercised from this existing session. Select GOLD Development in a new session and ask it to load gold-standard-development to complete that smoke check. Existing sessions are not switched. No claims of enforced isolation, model compliance or rendered diagrams are implied by package registration alone.
