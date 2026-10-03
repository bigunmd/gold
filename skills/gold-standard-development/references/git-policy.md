# Git discipline and authorship

Read before authorized branch/worktree creation, staging, commits, integration, pushes, tags or release publication. Naming conventions never authorize these actions. Follow repository conventions where explicit; otherwise use the defaults below. Surface conflicts with safety or attribution constraints.

## Inspect before changing state

Identify repository/worktree, actual branch/default branch, remotes, dirty and staged state, and user-owned changes. Never assume main/master or silently substitute a missing target. Inspect the staged diff before committing; stage explicit intended paths. Exclude secrets/private records and verify generated freshness/current evidence. Do not bundle unrelated user work.

## Names

Conventional Commit form: `type(scope): description`; scope optional, `!` before colon for breaking changes. Types: feat, fix, docs, refactor, test, perf, build, ci, chore, revert. Use a concise meaningful subject and explain why in the body where useful. `BREAKING CHANGE:` describes actual compatibility impact; never fabricate references, evidence or release status.

Default new branches: type/short-kebab-case-description, optional issue number; release/x.y.z for agreed release preparation. Keep existing mainline names. Prefer short-lived branches; do not impose Git Flow, rename existing branches or change protection settings automatically.

## NO model authorship

Do not add model/provider/assistant/agent identities as author, committer, co-author or signatory. Do not append generated-by-model footers to commits or PR descriptions. Use the configured human identity, without changing it silently. Ask when missing/ambiguous.

Explicitly approved real human coauthors are allowed with supplied complete identity; do not invent email addresses. DCO sign-offs are attestations, not formatting: never fabricate one. Keep configured cryptographic signing/hooks; generic permission to commit is not permission to bypass or disable them. Report failure and request a specific remedy.

Preserve required third-party copyright/license notices and truthful required AI-use disclosures. These are not model authorship. Do not rewrite historical attribution or delete notices because of this rule. Automated known-name detection is incomplete and cannot establish identity or consent.

## Integrate and publish safely

Confirm source branch, target branch, remote and exact action scope. Fetch and inspect divergence instead of blindly pulling. Use the repository's merge/rebase policy; fast-forward where appropriate. Stop at conflicts and explain the resolution rather than choosing all ours/theirs. Never implicitly force-push, reset, amend/rebase published history, delete branches or discard user changes.

Commit, merge, push, tag, Release API publication, installation and deployment are separate actions. Preserve approved actions without asking again unnecessarily, but do not expand them. Reconcile remote state before retrying an uncertain operation. A successful tag push followed by a failed Release API call is partial publication: report each result, preserve the tag and request missing recovery scope rather than deleting/retagging automatically.

## Verification and output

Report exact branch/remote/revision, intended paths, checks actually run and limitations; after mutations verify resulting Git/remote state. No claim of push/release success from a local commit. Signing/authentication failures are not permission to change identities, reveal tokens or bypass repository controls. Use existing authorized SSH credentials when requested; do not silently rewrite remote configuration.
