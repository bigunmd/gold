# GOLD

**Shared engineering guidance for AI coding agents.** Use GOLD with DeepSeek Harness (DSH), Claude Code, Codex or OpenCode.

GOLD helps an agent agree on scope, choose a practical approach, implement and test changes, and present evidence for your acceptance. It includes guidance for architecture, debugging, code review, UI design and delivery. **GOLD is instructions and skills—not a model, runtime or permission sandbox.**

## Choose your host

| Host | Installation | Entry point |
|---|---|---|
| **DeepSeek Harness** | Profile bundle through Plugins or `plugin_manager` | GOLD Auto, plus four specialist presets |
| **Claude Code** | Project-local source-checkout installer | GOLD Auto |
| **Codex CLI / IDE** | Project-local source-checkout installer | GOLD Auto |
| **OpenCode** | Project-local source-checkout installer | GOLD Auto; user-only skills omitted |

**Availability:** DSH uses the installable bundle. External adapters require the **v1.6.0 or later source tree**; they are not included in the DSH npm bundle. Use a trusted checkout containing the installer below. Live external-host discovery and model behavior are not yet verified.

## Install: for humans

Install your coding host separately. GOLD does not install or authenticate it.

### DeepSeek Harness

1. Open the intended DSH profile's **Plugins** UI.
2. Install the GOLD bundle from one of these trusted sources:
   - Released DSH bundle: choose the latest compatible release from [GitHub Releases](https://github.com/bigunmd/gold/releases), then use `github:bigunmd/gold#<release-tag>`. Replace `<release-tag>` with the exact published tag; do not use the placeholder literally.
   - Current source: the absolute path to your reviewed GOLD checkout.
3. Review compatibility warnings before approving installation. Do not grant version exemptions automatically.
4. Follow any runtime restart instructions, then start a **new session** and select **GOLD Auto**.

The other presets are **Development** (`gold`), **Architect** (`gold-architect`), **Reviewer / QA** (`gold-reviewer`) and **DevOps** (`gold-devops`). They change initial focus, not permissions. Installing GOLD does not change the default preset.

Prefer an agent-assisted install? Use the prompt under [Install: for agents](#install-for-agents). Do not manually edit DSH profile manifests or install dependencies inside the profile. A local bundle may link to its source directory: keep that directory in place and avoid editing the active installation accidentally.

### Claude Code, Codex and OpenCode

**Prerequisites:** Node.js **22.16.0+**, a trusted GOLD checkout containing the installer, and an existing target project. No `npm install` is needed for this installer.

Run **one** of these previews from the GOLD checkout. Replace the example target with your project's absolute path:

```sh
# Claude Code
node scripts/install-host.mjs --host claude --target /absolute/path/to/project

# Codex CLI / IDE
node scripts/install-host.mjs --host codex --target /absolute/path/to/project

# OpenCode
node scripts/install-host.mjs --host opencode --target /absolute/path/to/project
```

The preview writes nothing. Review its destination paths, then repeat **your chosen command** with `--apply`:

```sh
# Example: apply the Claude Code installation you just reviewed.
node scripts/install-host.mjs --host claude --target /absolute/path/to/project --apply
```

| Host | Startup instructions created or extended | Installed skills |
|---|---|---|
| Claude Code | `CLAUDE.md` | `.claude/skills` — all 40 skills |
| Codex | `AGENTS.md` | `.agents/skills` — all 40 skills |
| OpenCode | `AGENTS.md` | `.opencode/skills` — 24 skills |

OpenCode conservatively excludes the 16 user-only skills because equivalent invocation controls have not been established. Claude retains native user-only flags; Codex adds native implicit-invocation controls.

**Use one external adapter per project.** The installer preserves text outside its managed GOLD block, refuses collisions, modified managed files and symlink paths, and records version/content hashes. It does not change global configuration, permissions or hooks, or run Git commands. Check global/ancestor instructions and skill conflicts separately.

Stop other writers before applying. Interrupted writes can leave partial state; there is no automatic rollback or uninstall. Keep a backup, and never delete the manifest or user files just to bypass a refusal. For updates and recovery, read this guide in the same source checkout:

```text
docs/user-guide/portable-hosts.md
```

## Install: for agents

Copy this prompt into a management-capable coding agent and fill in the placeholders:

```text
Help me install GOLD using its README.

Host: <DSH | Claude Code | Codex | OpenCode>
Trusted GOLD checkout or verified DSH release: <absolute path or release target>
Destination: <DSH profile name | absolute path to an existing project>

First inspect the source and confirm the host, revision, destination and
available installation tools. Report conflicts and compatibility limits.
Do not install anything yet.

For DSH: use plugin_manager when available. Propose install_bundle with the
exact source target and confirm the active destination profile. If the tool
is unavailable, give me Plugins UI steps instead. Do not edit profile
manifests, grant version exemptions or change the default preset.

For Claude Code, Codex or OpenCode: use the source checkout's
scripts/install-host.mjs with --host claude, codex or opencode and an
explicit --target. Run only the read-only preview first. Show its changes;
after I approve that host and target, repeat with --apply.

Preserve existing instructions. Stop on collisions or modified resources;
do not force, delete or overwrite them. Do not fetch code, install host tools,
change global configuration, commit, publish or run authenticated model
checks without separate approval.

Report the actual result, then explain how to start a fresh session and
verify GOLD discovery. Do not claim that file installation proves behavior.
```

## Start using GOLD

Open a **fresh session** in your target project. In DSH, select **GOLD Auto**. Confirm that the host loads GOLD's startup guidance and can find `gold-standard-development`; installing skills alone is not enough.

Try a bounded first request:

> Inspect this repository and explain its architecture and development commands. Use Balanced style. Read-only: do not edit files, install dependencies or run tests.

For implementation, approve a concrete scope first, then review the reported verification evidence. Choose **Guided** for more discussion, **Balanced** (default) for practical checkpoints, or **Delegated** for fewer routine questions. None authorizes commits, deployment or other out-of-scope actions.

## Documentation and contributing

- [User guide](https://github.com/bigunmd/gold/blob/v1.7.0/docs/README.md): task recipes, collaboration, troubleshooting and project adoption.
- [Validation and limitations](https://github.com/bigunmd/gold/blob/v1.7.0/docs/validation.md): what checks establish—and what they do not.
- [Changelog](https://github.com/bigunmd/gold/blob/v1.7.0/CHANGELOG.md) and [contributing](https://github.com/bigunmd/gold/blob/v1.7.0/CONTRIBUTING.md).
- [Security policy](https://github.com/bigunmd/gold/blob/v1.7.0/SECURITY.md) for reporting vulnerabilities.

These hosted links are pinned to this version. For external adapter details, read the [portable-host guide](https://github.com/bigunmd/gold/blob/v1.7.0/docs/user-guide/portable-hosts.md) or the same guide in your checkout. From a checkout, maintainers can run `npm test`, `npm run check:docs` and `npm run check:package`; these do not perform live model checks.

## License

[MIT](<LICENSE>). Adapted skills retain their licenses and [third-party notices](<THIRD_PARTY_NOTICES.md>).
