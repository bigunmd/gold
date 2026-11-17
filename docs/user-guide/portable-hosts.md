# GOLD in Codex, Claude Code and OpenCode

The current source checkout can install **GOLD Auto** into a target project. The same engineering core and skill resources also generate the existing five DSH presets. No MCP server, new runtime, API key or model-specific policy fork is needed.

These adapters are available in the **v1.6.0 source tree**, not as a standalone published CLI/plugin or a claim that every host version has been tested. Obtain a trusted source checkout containing the installer. The DSH npm bundle remains unchanged in packaging; it does not contain the external installer.

## Preview, then install

Use Node.js 22.16.0 or later. Obtain a trusted source revision and record its commit before installation. No dependency installation is needed for this script. The target must already exist. Run from the GOLD checkout:

```sh
# Read-only: shows exact destination paths and content identity.
node scripts/install-host.mjs --host codex --target /absolute/path/to/project

# After reviewing that preview, write only to the named project.
node scripts/install-host.mjs --host codex --target /absolute/path/to/project --apply
```

Replace `codex` with `claude` or `opencode`. You may invoke the script by absolute path from another directory; sources resolve from its own checkout. There is no `--force`, global install, network fetch, host configuration edit, hook, server or automatic Git operation.

| Host | Always-loaded project entry | Skill root | User-only skills |
|---|---|---|---|
| Codex CLI / IDE | `AGENTS.md` | `.agents/skills` | All 16 retain source flags and add `agents/openai.yaml` with `policy.allow_implicit_invocation: false` |
| Claude Code | `CLAUDE.md` | `.claude/skills` | All 16 retain native `disable-model-invocation: true` |
| OpenCode | `AGENTS.md` | `.opencode/skills` | All 16 omitted conservatively; missing capabilities are named in startup instructions and manifest |
| DeepSeek Harness | Existing selected preset persona | Installed bundle's `skills` directory | Existing metadata and skill picker behavior retained |

The external adapters use GOLD Auto, not a native multi-agent role selector. They can change working focus without claiming that tools, permissions or sandbox modes changed. Tool bindings use the active host's capabilities; unavailable fresh-context delegation, browsers or presentation tools must be disclosed, not invented.

## What gets written

- One marked GOLD block is appended to the host's instruction file. Existing text is preserved. Future runs replace only that block, after validating its previous hash. Local rules outside it can be edited normally.
- Complete installed skill directories retain scripts, CSV data, templates, sibling references and licenses. Loading a skill does not authorize executing its scripts. Python 3 remains optional for Pro Max lookup.
- `.gold-host/manifest.json` records the host, package version, emitted-content SHA-256 identity, omitted skills, managed block hash and per-file hashes. An unreleased checkout may share a package version with a tag; the digest, not the version alone, distinguishes its output.
- `.gold-host/` also contains GOLD's license, third-party notices with relocated resource links, and Matt Pocock upstream provenance (retained even when its setup skill is omitted).

These are project configuration resources, distinct from ignored `.gold/` task notes. The installer does **not** change `.gitignore`, stage files or decide whether your team should track the installed configuration. Review your repository policy and ignore rules separately. GOLD verifies local-state isolation before writing task records.

## Safeguards, updates and recovery

The default invocation is read-only. `--apply` performs a full preflight before writing: it rejects occupied skill directories, unowned managed blocks, modified/missing managed files, malformed state, incompatible host changes and symlink paths. Native and compatibility skill roots at the target are checked for matching directory IDs and root-level Markdown IDs. Repeating an unchanged installation is a no-op. An update from a trusted newer checkout preserves outside-block instruction edits and accepts only unchanged managed resources. Resource removal/renaming requires manual migration; no automatic pruning is performed.

Use **one external adapter per target project** in this first version. OpenCode discovers Codex/Claude compatibility roots too: combining installations can reintroduce user-only skills the OpenCode adapter intentionally omits. The installer rejects known local overlap but does not inventory every global, ancestor, nested grouping or custom discovery source. Before use, inspect host diagnostics and resolve any overriding instructions or same-name skills. Do not rely on omission as a sandbox against other installed extensions.

Stop host sessions and other writers before applying changes. The installer is not a transaction or a hostile-filesystem security boundary: interruption or an I/O error can leave partial files. The manifest is written last. Preserve the diagnostic and inspect the target before recovery; do not delete state to bypass protection. Restore a reviewed backup or manually reconcile only the recorded paths and marked block, then preview again. No automatic uninstall, deletion or rollback is provided. Keep a normal project backup before updates.

## Host compatibility and first-session checks

Adapters target the documented project instruction/skill conventions, **not a certified minimum host version**. Static fixture tests verify emitted files, native metadata, links, ownership checks and DSH generation; they do not establish model compliance or live host discovery. OpenCode's documentation and control semantics differ across versions. Rather than equating discovery hiding with reliable user-only enforcement, this initial adapter excludes those entry points.

After installation, open a **fresh session from the target project root** and verify:

1. The host reads the GOLD startup block and resolves `gold-standard-development` from the intended skill root. Check native instruction-size limits, overrides and skill catalog warnings.
2. A design-only or review-only request produces findings/plans without repairs; unavailable capabilities are disclosed.
3. An implementation request obtains scope approval before edits, then asks for acceptance of current evidence rather than claiming approval from a review verdict.
4. User-only skills are not implicitly invoked. Explicit invocation still does not authorize unrelated Git, publication or deployment effects. OpenCode reports these skills unavailable instead.
5. No automatic commits, permission changes, installs or remote actions occur.

Use a disposable fixture and explicitly scope any state-changing test. Authenticated live-model checks are separately authorized actions, not part of the installer or normal test suite. Existing project/global instructions remain in force; resolve real conflicts instead of silently overriding them.

## Upstream contracts

- [Codex project instructions](https://developers.openai.com/codex/guides/agents-md/)
- [Codex skills and implicit invocation policy](https://learn.chatgpt.com/docs/build-skills.md)
- [Claude Code skills and user-only invocation](https://code.claude.com/docs/en/skills)
- [Claude Code project memory](https://code.claude.com/docs/en/memory)
- [OpenCode skills, discovery and permissions](https://opencode.ai/docs/skills/)
- [OpenCode project instructions](https://opencode.ai/docs/instructions/)

Related: [architecture](../architecture/c4.md), [project terms](../glossary.md), [DSH quick start](quick-start.md). Distribution packages/plugins, global installs, native role selectors and automated authenticated host checks are deferred.
