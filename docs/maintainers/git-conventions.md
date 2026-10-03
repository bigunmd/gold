# Git conventions and authorship

GOLD uses short-lived conventional branches and Conventional Commits. These rules name authorized work; they do not authorize Git mutations. In another project follow its explicit conventions and surface safety/authorship conflicts.

## Commit and branch format

Commit: `type(optional-scope)! optional: description` (the space before optional markers is explanatory, not literal).

```text
feat(api): add pagination contract
fix(router): preserve approved scope
docs(guides): explain recovery limits
feat(schema)!: replace legacy envelope
```

Types: feat, fix, docs, refactor, test, perf, build, ci, chore, revert. A meaningful single-line description follows `: `. Scope is optional. Explain why in the body; use `!` or `BREAKING CHANGE:` for actual compatibility impact. Subject length is advisory. No fabricated issue links, test outcomes or release claims.

Branches: `type/short-kebab-case-description`, optionally `fix/123-parser-error`. Release branches may use `release/1.2.0`. Inspect the real default branch and remote; never assume main/master or rename branches implicitly. Existing main/master/develop names are accepted. Git Flow is not imposed.

## No model authorship

Do not add model/provider/assistant/agent identities as author, committer, co-author or signatory. Do not append model-generated attribution footers to commits or PR descriptions. Use the configured human identity without silently changing it; ask if missing or ambiguous.

Explicitly approved real human coauthors are allowed with their supplied identity. Never invent an email or DCO attestation. Preserve configured cryptographic signing and hooks; generic commit permission does not authorize disabling them. Report failures and request the specific remedy. Preserve required third-party copyright/license notices and truthful required AI-use disclosures. Do not rewrite historical attribution automatically.

The checker detects exact known model display names, selected model-specific email local parts, and explicit metadata patterns; it cannot prove an arbitrary identity is human or consent was obtained. Full human names such as Claude Shannon and ordinary provider-employee addresses are not rejected merely for a model/provider word. Current generated-footer detection covers plain “Generated/Written/Authored by/with MODEL” lines; hyphenated `Generated-by:` and emoji-prefixed variants are a known automated-detection gap, still prohibited by policy. It does not ban ordinary technical mentions of models, license text, or fenced PR examples. Unusual legitimate identities may require human review, not bypass by renaming people.

## Safe Git procedure

Inspect branch/status/staged diff, ownership of changes and target remote. Stage explicit intended paths, excluding secrets and private local records. Verify the exact current state. Before integration fetch/inspect divergence and confirm source/target; never blindly pull, force-push, overwrite user work, bypass checks, or choose all ours/theirs in conflicts.

Merge/rebase strategy follows repository policy; use fast-forward when appropriate. Amend/rebase published history, reset, branch cleanup, signing changes and destructive operations need explicit scope. Commit, merge, push, tag, Release API, installation and deployment are separate actions. If tag push succeeds but Release creation fails, report each result; do not silently delete/recreate a tag. Reconcile remote state before retrying an uncertain publication.

## Validation

```sh
npm run check:git -- --base BASE_COMMIT_SHA --head HEAD_COMMIT_SHA
```

Replace both operands with resolved full commit SHAs. Missing history and empty ranges fail explicitly. Git subprocesses receive argument arrays, never shell-evaluated metadata. True merge commits allow standard Git merge subjects; generated reverts require the standard referenced-commit body. Attribution checks still apply to both. There is no blanket bot exemption for model authorship.

CI validates PR title/body and commits after merge-base at the actual PR head; edited PR metadata triggers validation. Pushes check before..after. An all-zero before SHA means new branch and checks all reachable history (may surface older violations). Manual dispatch checks the latest commit; an initial/root commit checks reachable history. Missing history must be fetched, not silently ignored.

Branch naming is advisory in CI to accommodate external forks/automation; newly created GOLD-owned feature branches should follow the convention. Historical commits outside the selected range are not rechecked. Existing repository bot naming may be retained; automation should still use valid subjects and not impersonate a model as a human contributor.

Workflow checks are not branch protection: maintainers must separately authorize/configure required checks. No local hooks, Git identity changes, repository settings, auto-merge or automatic releases are installed by this feature.
