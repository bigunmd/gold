# Release checklist

A release is an explicitly authorized publication action. This checklist prepares evidence; it does not authorize a tag, push, GitHub release, installation or deployment. No automatic publishing workflow is configured.

## 1. Agree scope and version

- [ ] Identify the candidate commit and intended public changes.
- [ ] Choose SemVer from actual compatibility impact and repository policy. Compatible new presets ordinarily suggest a minor release; this is a proposal, not a created version/tag.
- [ ] Confirm `package.json`, release notes and intended tag agree. A package version field alone is not evidence that its tag was published.
- [ ] Move relevant Unreleased entries into the approved version section only when preparing that release. Do not invent a release date or tag.
- [ ] Preserve existing `gold` compatibility or document an explicitly approved migration.

## 2. Validate source and distribution

```sh
npm run build:presets
npm test
npm run check:presets
npm run check:docs
npm run check:package
npm pack --dry-run --json
git diff --check
```

- [ ] Inspect the generated diff. Do not hand-edit the generated declaration.
- [ ] Record actual results, current revision/dirty state and environment. Address material findings and disclose skipped checks.
- [ ] Verify remote CI for the exact candidate commit; local success is not a remote workflow result.
- [ ] Confirm MIT license and runtime resources ship; local `.gold/`, tests, generator sources and credentials must not ship.
- [ ] Build an archive in a disposable local directory and inspect/extract it without touching the profile. Check installed-package identity resolves the skill resources without generator sources.

## 3. Mandatory actual Loader gate

- [ ] Use the intended installed Harness runtime's read-only patch parsing API, discovered from that version's package documentation/types/source. Do not assume a workstation path or an unverified CLI flag.
- [ ] Parse the **packaged** declaration, reject parse errors, confirm five unique preset ids and retained `!!js` expression markers, and compare shared tools/isolation to the intended source.
- [ ] Record runtime version, parser/API used and exact result. Parser success is not activation success. If the runtime is unavailable, leave this gate pending rather than marking it passed.

Use `npm run check:runtime -- --runtime /installed/dsh/root --package /extracted/package/root` following the [runtime gate](runtime-check.md). It verifies the installed `@deepseek-ai/dsh-app-boot` parser contract, GOLD declarations, audited expressions, module resolution and packaged skill identity; it does not mount plugins. Record its exact artifact hashes. Portable tests alone do not fully validate arbitrary shared YAML.

- [ ] Run [behavioral evaluations](behavior-evals.md) against baseline and candidate where the selected adapter is available; inspect failed assertions and raw transcripts, then publish sanitized evidence and limitations.
- [ ] Capture `npm run fingerprint` before/after final validation with writers stopped; record coverage and separately identify packed artifact SHA-256.
- [ ] Leave mounted-session checks below explicitly pending when no authorized test profile was used; a CLI-adapter evaluation does not satisfy them.

## 4. Authorized activation and fresh-session smoke tests

Use a dedicated test profile/environment where available. Installation changes a profile and may execute plugin code; get explicit authorization for the exact bundle and target. Never silently grant compatibility exemptions.

- [ ] List exact bundle identifiers, install through Harness plugin management, and inspect activation diagnostics.
- [ ] Verify all five roster entries and unchanged global default.
- [ ] Start a fresh session per preset and load the shared GOLD skill from the installed package.
- [ ] Auto proposes Balanced with substantial scope clarification; simple explanations stay lightweight.
- [ ] Guided asks at meaningful decisions; Delegated neither starts an automatic team nor expands permissions.
- [ ] Architect design-only and Reviewer audit-only prompts produce reports without edits.
- [ ] Side-effecting QA and ambiguous DevOps targets pause for scope/target clarification.
- [ ] Already covered phase transitions reuse approval; verification is not reported as user acceptance.
- [ ] Record model/provider and observed output. Label synthetic prompts separately from real production behavior.

## 5. Publication, only after explicit approval

- [ ] Obtain approval naming version/tag, candidate revision and publishing destination.
- [ ] Commit/tag/push and create release notes using the authorized procedure; do not perform these actions merely because all checks are green.
- [ ] Update installation examples to the actually published tag and verify the artifact/tag resolves to the approved revision.
- [ ] State compatibility, changes, migration needs, evidence and remaining limitations. Do not advertise untested model/platform support.

## 6. Rollback and follow-up

Record the prior known bundle/version and exact recovery procedure before activation. Disable or reinstall only with authorization; retain linked source paths used by existing installations. Existing sessions may keep loaded preset definitions. Never automatically delete legacy files, user changes or local records. Revalidate a fresh session after recovery and document unresolved effects.
