---
name: ui-ux-pro-max
description: Search bundled UI/UX Pro Max palettes, typography, styles, charts, UX patterns and framework-specific guidance, or generate candidate design-system recommendations. Use as local lookup support, not as a replacement for the project's existing brand or stack.
license: MIT; see LICENSE
---
# UI/UX Pro Max — GOLD local lookup

Pinned standard-library Python scripts and CSV data from nextlevelbuilder/ui-ux-pro-max-skill. [Source/adaptation manifest](upstream-manifest.json); [license](LICENSE). This integration does not install the upstream npm CLI or fetch live catalogs, fonts or assets.

## GOLD / DSH integration contract
Use [gold-web-ui](../gold-web-ui/SKILL.md) and its foundations/verification. Lookup supports the selected design lead; recommendations are not project requirements, verified accessibility, licensed assets or factual claims. Preserve the existing brand, tokens, components and framework; do not default every project to Tailwind. GOLD scope/acceptance, no automatic Git/install/publication and read-only boundaries apply. Authorized local notes go in ignored `.gold/`; project design docs require approved scope.

## Run local searches
Python 3 is required (tested version is documented in delivery evidence). Resolve this skill's installed resource base from the skill tool; do not assume it lives in the target project's working directory. Substitute the actual absolute resource path below. Use `-B` to avoid writing bytecode caches into the installed package; quote paths and queries. No Python packages or network are required.

```sh
python3 -B "<skill-base>/scripts/search.py" "healthcare calm trust" --domain color --json
python3 -B "<skill-base>/scripts/search.py" "keyboard focus" --stack react --json
python3 -B "<skill-base>/scripts/search.py" "SaaS dashboard" --design-system -p "Demo" --format markdown
```

Start with the product/audience/task keywords, then query a specific domain or current stack. Use `--help` for supported domains/stacks and options. Domain and stack lookup return ranked local matches; inspect their relevance instead of blindly applying the first result. BM25 keyword matching is not semantic expertise or independent evidence.

`--design-system` combines recommendations for a proposed direction; review against the approved brief and existing design system. `--stack` is ignored with a warning in design-system mode: run a **separate stack query** for implementation guidance. JSON design-system output contains `design_system` and `persistence: null`.

## Write and capability boundaries
This GOLD adaptation is **stdout-only**: upstream persistence and overwrite helpers are disabled at CLI/API boundaries. Do not use `--persist`, `--force`, `--output-dir` or page persistence. Shell redirection is still a file write and needs authorized scope/target; do not write generated design-system files by default. If keeping local recommendations is approved, record a concise reviewed note under `.gold/`, not upstream default directories.

If Python or shell execution is unavailable, say local search was not run and use the shared guidance or inspect relevant CSV rows. Do not install Python/dependencies automatically or claim search results without running/reading them. Font names/links, imagery and library suggestions in data do not grant rights or installation permission; assess licensing, availability and necessity separately.
