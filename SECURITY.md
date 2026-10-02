# Security policy

## Supported versions

Security fixes target the latest published GOLD release and the current default branch. Older releases are not maintained as separate security branches; users may need to upgrade. This is a community-maintained project without a guaranteed response or remediation SLA.

## Report a vulnerability privately

Email **[bigun.md@gmail.com](mailto:bigun.md@gmail.com)** with the subject `GOLD security report`.

Do not open a public issue or pull request containing an unpatched vulnerability, credentials, customer data or exploit details. Ordinary email is not an encrypted disclosure channel: send a minimal sanitized summary first and coordinate a suitable channel before sharing sensitive material.

Include, where safe:
- Affected GOLD version/commit, Harness version and operating system.
- Description of the issue, prerequisites and potential impact.
- Minimal reproduction using synthetic data and an isolated environment.
- Relevant sanitized evidence and any suggested mitigation.

Reports will be assessed for reproducibility and impact. The maintainer will coordinate investigation, remediation and disclosure with the reporter when possible. If you have not received a response, follow up through the same private channel; do not publish sensitive details merely to obtain attention.

## Scope and boundaries

Relevant reports include unsafe package behavior, credential/data exposure, or reproducible guidance defects that undermine declared scope and authorization boundaries. Separate actual runtime effects from hypothetical prompt behavior and include the conditions needed to reproduce them.

GOLD's personas and skills guide an AI model; they are **not a sandbox or enforcement layer**. A specialist title or collaboration style never grants permission. Harness permissions, explicit user authorization and external infrastructure controls remain necessary. Do not run adversarial tests against shared or production systems without the owner's explicit authorization.

Vulnerabilities in Harness itself or third-party dependencies may need upstream reporting; avoid exposing those details publicly while coordinating the appropriate destination. Do not include private `.gold/` records or real secrets in reports.
