# Debug / Investigate

Outcome: supported diagnosis or explicitly inconclusive findings, not an implied fix. Use the available systematic-debugging skill for technique, subject to these authorization boundaries.

1. Define expected vs actual behavior, impact, environment/version, frequency, earliest known occurrence and reproduction inputs. Separate observations from claims. Inspect errors and recent changes before guessing. State investigation scope and a stopping/time budget for an open-ended search. Use `execution.md` to configure elapsed, retry/experiment and no-progress limits, plus concurrency/cost where relevant; carry consumption across resume and stop at the agreed limit.
2. Prefer read-only source/log/config inspection. Before running tests, reproducers or instrumentation, check their side effects and obtain approval for state-changing experiments not already scoped. Never assume production access means mutation permission. Avoid sensitive log collection; redact before persistence.
3. Reproduce safely when authorized; document exact environment, revision, input and observed output. If reproduction fails, vary one condition at a time and record differences. Do not substitute “could not reproduce” for evidence of correctness.
4. Keep a hypothesis table: claim, supporting/contradicting evidence, minimal discriminating experiment, result. Trace the fault across boundaries and upstream to its source. Change one variable at a time; do not stack speculative patches.
5. Conclude with root cause and confidence, evidence ruling out alternatives, impact, suggested minimal fix and verification strategy. If inconclusive, state tested hypotheses, remaining uncertainty, missing access/data and next best experiment. Do not fabricate a cause to finish.
6. Apply `architecture.md`: assess discovered/documented differences. For diagnosis-only authorization, report necessary tracked-document corrections; do not edit them. No ADR is required merely to describe an existing dependency.
7. When local record writes were authorized, persist an investigation record using `../templates/investigation.md`, sanitized evidence and a diagnosis record, not a claim of repaired/accepted delivery. Otherwise report in chat. No delivery Gate 2 is required to issue the diagnosis report; user acceptance is not inferred.

Transition to repair only when the user requests it and approves a fix brief through `resolve-issue.md`. Investigation that was already part of an approved delivery iteration needs no duplicate gate while it remains within scope.
