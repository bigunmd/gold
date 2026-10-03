# Quick start

Goal: get a useful repository overview without accidentally authorizing changes. You need an existing DeepSeek Harness installation that can manage bundles and a project you are allowed to inspect. The last recorded Loader compatibility check used DSH 0.2.0-rc.2; this is not a guarantee for every runtime/model.

## 1. Install the intended version

The `v1.0.0` tag contains the original single GOLD Development preset. Auto and preset entry points were added in 1.1.0. Version 1.2.0 adds Git discipline and eight on-demand domain specialties; use `github:bigunmd/gold#v1.2.0` as the installation target. Do not assume an old release tag contains the latest documentation's features.

Clone or obtain a reviewed checkout, then ask a management-enabled Harness agent:

> Install the GOLD bundle from this checkout's absolute directory using plugin_manager. First show the target and any compatibility warnings. Do not grant version exemptions automatically.

Alternatively use Harness's Plugins UI. Installation changes the profile and may execute plugin code; only approve a trusted source. Do not manually edit profile manifests or install dependencies in the profile. Follow the runtime's restart instructions if required.

For a published version, use an explicitly verified release tag from [the repository](https://github.com/bigunmd/gold), not a tag guessed from the current package version.

## 2. Start a new session

Select **GOLD Auto**. Expected roster for the adaptive update: Auto, Development, Architect, Reviewer / QA, DevOps. If only Development appears, check the installed revision and [troubleshooting](troubleshooting.md).

Existing sessions retain their preset revision. Changes to locally linked resource files can still become visible when read; do not treat an existing session as a completely frozen package snapshot. Develop updates separately from installed source.

## 3. Ask for a bounded first result

Illustrative prompt:

> Inspect this repository and summarize its architecture, development commands, and testing setup. Use Balanced style. Read-only for now: do not edit files, install dependencies, or run tests until you have checked their side effects and I have approved execution.

Expected result: evidence-backed repository map, relevant commands, architecture facts and uncertainties. The agent should not initialize local notes or repair anything under this scope. Verify important conclusions against the cited source.

## 4. Move to delivery deliberately

When ready, request a small change. GOLD should present goal, approach, acceptance criteria and exclusions before implementation. Approve that concrete scope, not an ambiguous “do everything.” A complete approved brief can cover implementation and tests without repeated approval at each phase.

Checkpoints occur when scope/risk changes, a consequential decision is unresolved, or verification is ready for acceptance. Choose [Guided, Balanced or Delegated](choosing.md) to adjust interaction—not permissions.

## 5. Review evidence

Ask which checks actually ran, against which revision/state, and what was skipped. “Implemented,” “verified,” “accepted,” and “deployed” are different states. Acceptance does not authorize commits, publication or deployment.

**Remember:** Architect is not an enforced read-only sandbox; Delegated does not require subagents; test commands can mutate databases; memory is not approval. See [validation and limitations](../validation.md).
