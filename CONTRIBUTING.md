# Contributing to GOLD

GOLD is a declarative preset bundle and engineering guidance for DeepSeek Harness. Contributions that make behavior clearer, safer and easier to validate are welcome. Follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Before you start

- Search existing issues before reporting a bug or proposing a feature.
- Discuss substantial changes to preset behavior, scope/approval rules or compatibility before implementation.
- Report vulnerabilities privately using the [security policy](SECURITY.md), not public issues.
- Keep changes focused. Explain the user problem, expected behavior and trade-offs; avoid adding prompt rules without a demonstrated need.

## Local development

Use a supported Node.js version compatible with your target Harness release. The current bundle has no external build/test dependencies. From a source checkout:

```sh
npm run build:presets
npm test
npm run check:presets
npm pack --dry-run --json
git diff --check
```

Edit shared persona, role metadata and tool composition under `preset-src/`, then regenerate `cordis.patch.yml`; do not hand-edit the generated artifact. Scenario and engineering guidance lives under `skills/gold-standard-development/`. Keep discovery triggers explicit and resources below the 8192-character pruning threshold.

Local Harness installations may link directly to this checkout. Use a separate branch/worktree for development so edits do not unexpectedly affect installed resources. Do not change profile settings, install a bundle or operate production systems as part of ordinary tests.

## Tests and evidence

- Add a regression test for code/configuration defects where feasible; demonstrate the failure before the fix.
- For instruction changes, add representative cases to `tests/scenarios.md`, including expected and prohibited actions. Report static evaluation separately from actual model/session behavior.
- Run the full test suite and check generated freshness. Document failures, skips, unavailable tools and untested platforms honestly.
- Before release, parse the generated patch using the target Harness Loader. The dependency-free generator does not fully validate arbitrary shared YAML.
- Inspect the package allowlist: include runtime resources and the MIT license; exclude local state, secrets, tests and generator sources.
- Validate changed runtime discovery in fresh sessions after explicitly authorized installation. Registration alone does not prove model compliance.

## Pull requests

Use the pull-request template. Describe scope, motivation, compatibility impact, validation commands/results and remaining limitations. Update user-facing documentation and architecture views when the change affects them. Preserve the existing `gold` identity unless a separately discussed migration requires otherwise.

Never commit private `.gold/` records, credentials, customer data or unredacted logs. Ignore rules do not protect files already tracked. Include sanitized, self-contained evidence in the PR rather than links that require someone else's local records.

Maintainers may request changes or defer a proposal; approval does not imply a release date. Contributions are provided under the project's [MIT license](LICENSE). Preserve applicable third-party notices and attribution.
