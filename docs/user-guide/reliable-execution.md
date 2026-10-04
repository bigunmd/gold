# Reliable execution

GOLD 1.3.0 adds operational contracts to the existing scenario/style system. These guide agents; they are not locks, a scheduler, permission enforcement or guaranteed recovery.

## One approved outcome, meaningful checkpoints

For a substantial task define an execution envelope with the goal, criterion IDs, authorized paths/actions/targets, exclusions, milestone dependencies and next checkpoint. Distinguish internal implementation/test/review steps, informational milestones, and human acceptance milestones. Already approved phases do not need repeated permission.

Example: “Implement the approved parser and tests in Delegated style. Internal milestones: parser, integration tests, documentation. Report after integration; final evidence needs my acceptance. No dependency installation, Git mutations or deployment.”

By default separate delivery iterations still require acceptance before starting the next. If you want batched acceptance across named milestones, explicitly change that process and record its scope. An envelope is not implied acceptance; budgets and style never grant permission. Consequential risk/scope changes reopen the affected decision.

## Delegate a contract, not just a prompt

Assignments state objective/criteria, baseline content identity, writable paths, dependencies, forbidden actions, budget and result format. Each shared file has one writer or a serialized integration owner. Children return changed paths, actual checks, evidence, uncertainty and outstanding work. The parent inspects and integrates the result and retests affected combined behavior; a child's confident summary is not acceptance.

No task automatically requires agents or worktrees. Use parallelism when work is independently verifiable and its coordination cost is justified.

## Bound work and preserve execution state

Choose task-specific time/attempt/no-progress/concurrency limits, and cost limits only when measurable. Failed hypotheses and consumed budget carry across children and resume. Exhaustion stops affected new work and produces evidence plus a next discriminating option; it does not authorize weaker tests or endless retries.

The outstanding-work ledger records runtime and logical IDs, owners, targets, status and possible effects. After interruption, collect or reconcile existing children/jobs before duplicating overlapping work. Unknown status means unknown effects. Cancellation does not undo partial writes and stopping a parent does not prove descendants stopped. Unresolved relevant effects block clean completion.

## Tie evidence to bytes and criteria

A commit plus a list of dirty filenames cannot identify successive uncommitted versions. Record an explicit content identity with algorithm/coverage/exclusions, before and after verification. Associate each criterion with actual evidence IDs and gaps; revalidate after integration or changed inputs. Target projects may use their own snapshot or digest tooling.

In the GOLD source checkout, `npm run fingerprint -- --root /absolute/repository/root` reports SHA-256 identities for tracked and nonignored untracked working inputs. It is maintainer tooling, not an installed preset command. Ignored files and external symlink targets are excluded; unsupported directory/submodule inputs fail. Record relevant excluded dependencies separately. The snapshot is not atomic: stop writers and compare around verification. Do not put credentials in evidence.

## Restricted review

Reviewer and Architect retain the Standard tool composition. Their no-write guidance is not a sandbox. For untrusted tasks, deliberately select an appropriate restricted Harness policy or externally isolated environment; consider shell, network, credentials and child-agent effects as well as file tools. GOLD does not silently change your current policy. See [validation](../validation.md) and [behavioral evaluation limits](../maintainers/behavior-evals.md).
