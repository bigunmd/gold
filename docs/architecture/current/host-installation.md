# Project-local host installation boundary

**State:** current source at migration baseline `09fd9cfeaaf1f0003b21de679f40bb6c6fc4d4ba`. **Scope:** repository-only external installer and its target-project filesystem boundary. This describes implemented resources, not a performed installation. See [resource structure](resource-structure.md) for the shared generation/installation flow and the [architecture index](../README.md) for history.

## Outputs and discovery

The repository-only installer emits GOLD Auto startup instructions and the same complete sibling skill/resource tree into a named, existing project. It writes a managed GOLD block in the host instruction document, native project skills and `.gold-host/` configuration records containing hashes, version and legal notices. These installation records are distinct from ignored `.gold/` task state.

Codex adds native user-only metadata; Claude Code retains native flags; OpenCode conservatively omits user-only entry points. The installer does not configure global discovery, runtime permissions, native agents or model credentials. It is not part of the DSH npm bundle. The [portable-host guide](../../user-guide/portable-hosts.md) gives host-specific paths and invocation details.

One external adapter is supported per target. Global, ancestor and custom skill conflicts, plus runtime instruction limits, remain host-specific discovery checks. Local overlap checks do not prove complete host discovery or enforcement. Content hashes identify emitted resources, not approval, host compatibility or model compliance.

## Write and failure boundary

The default preview is read-only. The installer crosses the local filesystem write boundary only with explicit apply. Preflight checks resource ownership/hashes, instruction markers, matching IDs in local compatibility roots and symlink ancestors. Existing project text outside the managed block is retained.

The manifest is written last. An interruption or I/O failure can leave partial state that requires human recovery. Single-writer use is required: this is not a filesystem transaction or an adversarial concurrency boundary. Stop host sessions and other writers before applying; preserve diagnostics and inspect the target rather than deleting state to bypass protection. Use the guide's [safeguards and recovery procedure](../../user-guide/portable-hosts.md#safeguards-updates-and-recovery) for the operational steps.

## Sources and validation

- [Installer](../../../scripts/install-host.mjs): project-local output and preflight implementation.
- [Portable-host guide](../../user-guide/portable-hosts.md): adapter metadata, single-writer limitation, recovery and live discovery checks.
- [Portable fixture tests](../../../tests/portable.test.mjs): emitted resources and ownership safeguards.
- [Package manifest](../../../package.json): shipped bundle inventory, excluding the installer.

The migration preserves the baseline's installer contract and checks it against the guide and package inventory; it does not claim a new installer audit or execution. Static fixture coverage cannot establish live host discovery or model compliance. No apply operation, fresh host session or runtime check was run. The shared resource diagram was reviewed manually only, without a Mermaid renderer.
