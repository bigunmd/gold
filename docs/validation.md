# Validation and known limitations

GOLD is instruction-driven. Distinguish evidence classes rather than treating every green check as proof of live model behavior.

| Evidence | Establishes | Does not establish |
|---|---|---|
| Automated tests | Generator contracts, stale-artifact detection, resource bounds/links and validation helpers | Model compliance, runtime permissions or production safety |
| Documentation check | Supported repository-relative link forms and Markdown heading destinations exist | External website availability, full Markdown rendering or accessibility conformance |
| Package check | Required runtime/license files included; development/private paths excluded | Trusted code, successful activation or live skill discovery |
| Actual Harness Loader parse | The generated declarations parse in the tested runtime; expressions remain represented | Plugin activation or agent behavior |
| Static consumer evaluation | Instructions support expected/prohibited actions for selected scenarios | Empirical success rate or repeated model compliance |
| Fresh-session smoke tests | Observed behavior/discovery for the exact runtime, model and revision tested | Universal compliance across models/platforms |

## Recorded adaptive-update baseline

At commit `e57a29d`, implementation evidence recorded 48 passing automated tests, DSH 0.2.0-rc.2 Loader parsing of five presets, preserved shared tool/isolation configuration, and unpacked package resource resolution. Independent static review covered 18 original and 23 adaptive scenario cases with no Critical/Important findings. These are historical results, not claims that later revisions or every environment passed.

No fresh-session behavioral validation was recorded as part of that implementation. Later merging/pushing the files does not establish activation or compliance. The older `v1.0.0` tag contains only the original single preset.

## Run local checks

```sh
npm test
npm run check:presets
npm run check:docs
npm run check:package
git diff --check
```

The CI workflow runs these checks on its declared Node versions. A locally passing run does not prove the remote workflow has executed. Test fixtures use ignored `.gold/` paths; checks do not install or activate a bundle. The package check may use npm's local cache but does not publish or execute package lifecycle scripts.

The local link checker intentionally handles this repository's inline/reference links and simple ATX headings; it is not a full CommonMark/GitHub renderer. It skips fenced examples and external URLs. Review rendered docs manually for complex markup.

## Release-only runtime verification

Use the [release checklist](maintainers/releases.md) to record actual Loader parsing and fresh-session checks on the intended Harness version. Full YAML validation is not part of the dependency-free portable generator: trusted maintainer YAML with malformed nested content can otherwise pass freshness checks. Do not skip the Loader gate.

Record revision and dirty state, OS, Node/Harness versions, model/provider for behavioral checks, exact commands, results/skips and limitations. Use sanitized self-contained summaries, not private-record links in public PRs. Do not claim token measurements from byte/character counts or a diagram was rendered when only source was reviewed.

## Remaining limitations

- Preset roles and collaboration styles do not enforce filesystem or production restrictions.
- Project skills can shadow bundled resources; genuine conflicts must be resolved.
- Existing sessions retain preset definitions; on-demand reads from linked package resources may see changed files.
- Global style persistence is not implemented.
- Cross-platform/runtime compatibility and repeated multi-model behavior require separate evaluation.
- No formal accessibility audit or live Mermaid rendering validation is implied; see [accessibility](../ACCESSIBILITY.md).
