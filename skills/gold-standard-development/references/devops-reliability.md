# DevOps & reliability techniques

Read for pipelines, infrastructure/config changes, release and recovery design. `release-operate.md` governs action/target authorization; operational diagnosis alone stays in `debug.md`.

## Before change
- Inspect pipeline stages, artifact provenance, configuration sources, environment ownership and deployment topology. Verify target account/region/cluster/resource and version before a mutation.
- Review IaC plan/diff for replacement/deletion, IAM/network exposure, state locking and drift. Do not treat all plan/preview commands as side-effect-free; inspect their semantics.
- Identify compatibility across app/config/schema and mixed versions; order migrations and rollout to minimize interruption. Prove backup/restore prerequisites where data recovery is required.
- Define measurable health and stop criteria, observation window, staged rollout and approved recovery actions. Rollback may not reverse data migrations or external effects.

## During and after
- Use least privilege and existing secret stores; do not print tokens, copy credentials into artifacts, or persist sensitive logs.
- Keep release artifacts reproducible and traceable; do not substitute an unverified build during rollout.
- Observe health endpoints plus user-relevant errors, latency, saturation and data integrity. A successful command is insufficient evidence of healthy operation.
- Stop rollout on threshold breach or unexpected target/impact. Follow only preapproved recovery scope or request the missing approval.
- Verify final artifact/version/config and service health. Record actual operation, environment, observed effects and unresolved risks without secrets.
- Update scoped runbooks, ownership/escalation paths and useful telemetry; avoid noisy alerts and sensitive payload logs.

CI/CD improvements should make checks reproducible, cache dependencies safely, isolate secrets from untrusted changes and preserve failed-job evidence. Do not disable required checks merely to obtain a green pipeline. Missing access or observability is an explicit deployment limitation.
