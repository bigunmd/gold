# Behavioral evaluations

The versioned cases in [cases.json](../../evals/cases.json) execute real models and tools against disposable synthetic workspaces. They complement, not replace, [structural checks](../validation.md) and the [runtime gate](runtime-check.md).

## Run deliberately

Requires an already authenticated Codex CLI supporting `exec --json --ignore-user-config --ignore-rules --ephemeral --sandbox workspace-write`, and an available model. Authentication and provider requests may incur usage. No dependency installation or credential copying is performed. This is opt-in, not normal CI.

```sh
mkdir -p .gold/evals
npm run eval:behavior -- --source . --out .gold/evals/candidate --model MODEL --repeat 2
# Existing reviewed baseline checkout; do not edit the installed source.
npm run eval:behavior -- --source /path/to/baseline --out .gold/evals/baseline --model MODEL --repeat 2 --label baseline
```

Output directories must be new. Optional `--case ID` selects one case; `--timeout MS` starts process-group termination at the limit (default 180000, maximum 900000), then escalates TERM to KILL with bounded grace periods; repeat is 1–10. The supervisor currently requires POSIX; Windows fails explicitly. Timeout/output-limit/spawn errors produce failed, ungraded runs with cleanup status. Process-group cleanup cannot prove independently detached descendants stopped; do not reuse uncertain workspaces or claim rollback. The source supplies the persona, role focus and complete skill tree; the runner's current case catalog is identical for baseline and candidate. The source is never given as a writable target. Each case receives a fresh temporary directory, resource copies, fixture files and the actual task prompt. Keep test prompts and evaluation assertions independent from the model's instructions.

The adapter does **not** mount DSH presets: the skill is discovered through a local resource pointer in the CLI's instructions. DSH tools, modes, compaction and authorization are not exercised. Codex's workspace-write sandbox and approval policy affect results. There is no production database, deployment integration, remote Git task, MCP credential forwarding or automatic publication in the suite. The runner inherits only basic process/auth-location environment variables, not cloud/provider secret environment variables. It does not disable the sandbox.

## Evidence and grading

Each run stores the prompt metadata, raw JSONL events, stderr, final response and graded result. A summary records source, adapter/model, duration, provider-reported token counters, filesystem differences and assertions. Token counters are actual reported usage, **not** character estimates or isolated first-turn prompt measurements; cache effects and loaded CLI context affect comparison. Private paths and reasoning can appear in raw events: retain them under ignored local state and publish only sanitized summaries after inspection.

Cases cover review-only writes, approved local repair with observed RED/GREEN, ambiguous database targets, log injection, failed-test reporting, unknown outstanding work and exhausted budgets. Grade checks combine bounded regular-file/directory/symlink snapshots, file-change attempts, observed exact fixture test commands with test-runner output, and deliberately conservative text checks. Read-only cases accept only an audited read-command subset; implementation accepts that subset plus the exact approved test invocation. Other commands fail automatic policy grading even when manual review establishes benign behavior. Raw logs are saved before grading so special-file or unreadable-workspace failures retain evidence. Unknown assertion IDs fail; unknown tool kinds fail restricted-command cases. Heuristic checks do not parse arbitrary shell language, detect every transient write, establish external side-effect absence, or prove that every RED is the intended defect. Review transcripts for these claims and for false-positive/negative grading. A returned answer is not success when the runner times out, exits nonzero or lacks a completed turn.

Do not execute arbitrary generated code outside the runner's sandbox. The correctness heuristic accepts the fixture's narrow addition implementation plus a passing observed test; alternative valid implementations can require human adjudication. Budget and resume probes test triage language/actions, not real multi-process cancellation or DSH continuation. Expand those into mounted-session integration tests before claiming execution guarantees.

## Comparison and release reporting

Run baseline and candidate with the same case revision, model, CLI, repetitions and environment. Report raw pass counts and failed cases, false-completion/unauthorized-action findings, unnecessary approval observations, elapsed time and token counts. Small samples cannot establish statistical improvement; a baseline already passing safety cases is useful non-regression evidence. Record source content identity and exact tool versions separately from a clean commit ID.

Use `node scripts/eval-report.mjs NEW_OUT RUN_DIR [RUN_DIR...]` to regrade recorded events without rerunning models and create viewer-compatible outputs, grades and timing records. Original results remain unchanged; regrading retains the original changed-path observation and reads the retained fixture for the narrow addition check, so it cannot upgrade earlier snapshot/supervision guarantees. Keep manual adjudication separate from automatic scores. An available skill-creator `eval-viewer/generate_review.py NEW_OUT --skill-name gold-standard-development --static review.html` can render those local outputs; it is optional external maintainer tooling, not a packaged dependency.

A reviewer should examine sanitized evidence and the evaluation viewer, not only the aggregate score. Never convert a heuristic pass into a claim that a role is a sandbox. For enforced review, use an explicitly authorized restricted runtime/container without writable shell, network or child-agent escape paths; this bundle does not install or select one.
