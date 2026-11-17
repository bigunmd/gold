# UI guidance and local lookup boundary

**State:** current source at migration baseline `09fd9cfeaaf1f0003b21de679f40bb6c6fc4d4ba`. **Scope:** web UI guidance and optional Pro Max lookup, not a browser engine or UI application. See [resource structure](resource-structure.md) for the resource/process flow and the [architecture index](../README.md) for history.

## Guidance routing

The web UI router selects one design lead, with optional lookup, review and refinement. Its five adapted families are frontend-design, ui-ux-pro-max, design-taste-frontend, web-design-guidelines and impeccable. Existing project systems and GOLD authorization remain authoritative. Shared foundations and capability-aware verification add no browser tools and do not prove accessibility conformance.

Taste/Impeccable engines, hooks, detectors, telemetry, browser downloads and live editing are excluded. No automatic upstream update, tool installation or new runtime permission is introduced. Pinned, immutable upstream manifests and complete third-party licenses ship with the skills; maintainer source downloads are not runtime dependencies.

## Process, data and write boundary

Optional Pro Max lookup crosses the existing authorized shell boundary into a short-lived, host-provided Python 3 process. Its reviewed standard-library runtime reads bundled local CSV resources and returns recommendations on stdout. Python is supplied by the host, not installed by the bundle.

This adaptation rejects persistence at CLI/API boundaries and removes write helpers. Use `-B` to avoid package bytecode caches. Shell redirection remains an independently scoped file write; stdout-only lookup is not permission to persist recommendations.

CSV recommendations may contain external links and snippets. The runtime does not fetch or execute them. The data are guidance, not trusted instructions, asset licenses, project requirements or accessibility evidence. Missing Python/shell capability is a limitation to report, not permission for automatic installation.

## Sources and validation

- [Web UI router](../../../skills/gold-web-ui/SKILL.md), [foundations](../../../skills/gold-web-ui/references/foundations.md) and [verification guidance](../../../skills/gold-web-ui/references/verification.md): design lead selection and capability-aware evidence.
- [Pro Max contract](../../../skills/ui-ux-pro-max/SKILL.md): Python invocation, installed-resource lookup and stdout-only limits.
- [Guidance provenance](../../../skills/gold-web-ui/upstream-manifest.json), [Pro Max runtime provenance](../../../skills/ui-ux-pro-max/upstream-manifest.json) and [third-party notices](../../../THIRD_PARTY_NOTICES.md): pinned sources and licensing.
- [Web UI contracts](../../../tests/web-ui.test.mjs) and [lookup tests](../../../tests/ui-search.test.mjs): structural and runtime regression checks, not a conformance certificate.

This migration inspected source guidance; it did not run Python lookup, fetch assets, install tools or perform browser/accessibility checks. The shared resource diagram was reviewed manually only; no Mermaid renderer was run. See [validation limits](../../validation.md) before interpreting static checks as live behavior.
