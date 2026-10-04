# Opt-in packaged runtime check

The [runtime gate](../../scripts/check-runtime.mjs) checks an **extracted GOLD package against an explicitly selected installed DSH runtime**, without installing anything. It is a maintainer gate, not part of the shipped bundle and not a substitute for activation testing.

## Reproduce

Run from the GOLD checkout with a Node version supported by the selected DSH installation. The skill expression requires `process.getBuiltinModule`; there is no compatibility shim. Use trusted package/runtime inputs: the gate imports the installed runtime's parser and evaluator.

```sh
# Create a tarball without lifecycle scripts, installs, or registry access.
pack_dir="$(mktemp -d)"
npm pack --ignore-scripts --pack-destination "$pack_dir"
# This new directory contains exactly the one tarball just packed.
tar -xzf "$pack_dir"/*.tgz -C "$pack_dir"

node scripts/check-runtime.mjs \
  --runtime /absolute/path/to/installed/dsh \
  --package "$pack_dir/package"

# Equivalent once the maintainer npm script is present:
npm run check:runtime -- \
  --runtime /absolute/path/to/installed/dsh \
  --package "$pack_dir/package"
```

For this installation, the explicit runtime argument used was:

```text
/home/linuxbrew/.linuxbrew/lib/node_modules/@deepseek-ai/dsh
```

Both arguments are mandatory absolute directory paths. There are no environment-variable, current-profile, repository, or globally installed-package defaults. Prefer an extracted tarball over the source checkout; the gate validates the supplied root but cannot prove how that root was produced. Keep the output with release evidence and repeat against the final tarball if its contents change. The caller owns its pack directory; the gate only cleans up its own uniquely allocated scratch directory.

The proposed maintainer script is `"check:runtime": "node scripts/check-runtime.mjs"`. Ordinary `npm test` only runs the dependency-free [gate unit tests](../../tests/runtime-check.test.mjs); it does not discover an installed DSH or silently skip an integration check.

## What a pass proves

A pass exits zero and prints a JSON report with `level: "parse-expression-resolution"` and `mounted: false`.

1. The runtime and package manifests are readable JSON with the expected identities and versions. GOLD remains private ESM and declares exactly its expected bundle patch path. Missing, ambiguous or malformed manifests fail closed.
2. The parser comes from `@deepseek-ai/dsh-app-boot` resolved inside the explicit installed runtime. The gate calls the actual `loadOptionalPatches('gold-runtime-check', absolutePatchPath)`. It requires the real synchronous `PatchOptions[]` result, not a guessed `{ patches }` wrapper. A missing patch cannot become a successful no-op.
3. Parser probes verify preservation of `!!js` as `{ __jsExpr: string }`, evaluation through the installed Loader, and rejection of non-list YAML, null patch entries, malformed YAML and duplicate mapping keys. A missing *optional probe file* must return `undefined`. The packaged patch itself is required.
4. Parsed GOLD data contains one insert patch, five unique declarations/IDs (`gold`, `gold-auto`, `gold-architect`, `gold-reviewer`, `gold-devops`), expected declaration module names and valid child IDs. The gate adds structural checks because the actual parser only validates the top-level list/mappings, not the full preset contract.
5. Each preset has the expected isolated groups: `planning` owns `planMode`; `compaction` owns `compaction` and `toolResultPruner`; `delegation` owns `workflowEngine`. Required providers and consumers occur once, enabled, directly inside the appropriate group. This is a **static composition assertion**, not a service-leak audit.
6. All fifteen audited expressions survive parsing. Only the exact two shell-platform expressions and installed-package skill expression are accepted. The gate rejects unexpected expressions **before evaluating package expressions**. The installed Loader evaluator checks each against simulated `linux`, `darwin` and `win32` values. This is expression coverage, not cross-platform execution of the runtime.
7. Every declared module specifier, including disabled optional rows and package subpath exports, resolves to an existing file inside the explicit installed runtime using Node `createRequire` anchored at its manifest. `cordis:group` is a Loader builtin, not an npm module. The JSON report lists every resolved path. Plugin module bodies and their transitive dependencies are **not** imported or activated by this step; it does not claim to reproduce all ESM resolution conditions.
8. A temporary `node_modules/@local/dsh-gold-preset` symlink (junction on Windows) points to the extracted package. Using a temporary installed-style `baseUrl`, the exact skill expression resolves GOLD's own manifest and packaged skills root, never the live profile's older GOLD package. The main skill must be a nonempty file inside that root. Neither the extracted package nor the runtime is modified.

Unknown row fields, changed parser contracts, moved service providers, lost tags, unexpected expression code, missing modules and escaping patch/skill symlinks are errors rather than warnings. A legitimate future composition change may require updating this deliberately narrow contract and its tests after inspecting the new runtime.

## What a pass does not prove

**No Cordis context or preset tree is mounted. No plugin is activated.** There is no roster mutation, profile installation, compatibility exemption, server, network request or tool execution. The only imports are the installed boot and Loader modules (and their normal dependencies). The package-expression scope only exposes the platform and Node builtins needed by the audited expressions.

The installed `dsh-agent-preset` is not a standalone mount: its `Service.init` awaits `agentPresets.register`, and its group marker preserves child expressions. The registry in this inspected runtime requires `loader` and `sessionProjections`, creates scoped trees, prepares profile entries, and audits failed rows and root-realm leaks. Pending Host-service dependencies can remain pending until the Host settles. Registering declarations against a mock registry, or counting those pending rows, would not prove successful activation of all five presets.

A future activation gate needs a fresh isolated real Host-service composition, settlement plus zero failed/unexpected-pending rows for all five presets, service-leak checks, deterministic teardown, and no live-profile dependency. This gate intentionally does **not** offer a misleading partial-mount mode. It also does not claim peer-dependency admission, config-schema validation for every plugin, resource-link completeness, UI visibility, prompt delivery, model/tool behavior, or end-to-end session compatibility. Use the separate documentation/package checks and an explicitly authorized isolated activation exercise for those layers.

## Inspected contract and observed evidence

Implementation was grounded in the installed DSH **0.2.0-rc.2** package, not inferred from a different checkout:

- `dsh-app-boot/lib/types/index.d.ts`, lines 77–88: the public `loadOptionalPatches` signature and absent/error behavior.
- `dsh-app-boot/lib/index.js`, lines 19–33 and 3508–3570: actual Loader YAML schema, expression construction and parser implementation.
- `cordis-plugin-loader/lib/types/config/utils.d.ts`, lines 1–10, and its built implementation, lines 233–247: `evaluate`, `isJsExpr` and marker representation.
- `dsh-agent-preset/lib/index.js`, lines 10–25, and `dsh-agent-preset-registry/lib/index.js`, lines 250–284: dependency and mounting semantics. Read-only Config inspection confirmed the declaration schema and installed package location; existing live GOLD entries were **not** used as evidence for this package's activation.

An extracted `npm pack --ignore-scripts` GOLD **1.3.0** package passed against that installation on **Node v26.0.0**: five declarations, fifteen expressions, three simulated platform values, and twenty-seven unique resolved module specifiers. The result explicitly reported `mounted: false`. The initial observed package hashes were:

```text
manifest SHA-256  3a1e02c9f1ac67d834fa5f30ec82ed1f02fa25c296d10863ab446be97c23976c
patch SHA-256     bee681e3f7b40977cd2acf6d4b05b553b3743b66edc7d9e3e6ce6c67cfad95ae
```

These identify the tested manifest and patch, **not** the entire tarball; the gate emits fresh hashes on each run. Final release packaging can change them. The parser rejection probes also ran against the actual installed parser. Unit tests independently exercise malformed manifests, parser-return drift, malformed-parser acceptance, duplicate IDs, isolation/placement failures, unexpected expressions, missing files and CLI fail-closed behavior without requiring DSH to be installed.
