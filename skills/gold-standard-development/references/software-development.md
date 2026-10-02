# Software development techniques

Read for implementation, public API changes and refactoring. Use `quality.md` for TDD, verification and common DoD; use `architecture-planning.md` when boundaries or consequential choices change.

- Inspect repository conventions, callers, tests and failure paths before changing behavior. Preserve unrelated user work and keep diffs within the approved goal.
- Define observable contracts: inputs, outputs, validation, error semantics, compatibility and version assumptions. Check downstream consumers rather than relying on typechecking alone.
- Prefer small cohesive functions/modules with explicit dependencies and clear ownership. Reuse existing mechanisms; avoid unrelated abstraction or cleanup.
- Treat boundary inputs as untrusted. Validate at the correct boundary, preserve actionable error context, clean up owned resources, and avoid swallowing failures or logging secrets.
- For concurrency/network work consider timeouts, cancellation, resource lifetime, retries/backoff, idempotency, duplicate requests and partial failures. Do not retry non-idempotent actions blindly.
- Explain dependency necessity, supported versions, license/security footprint and runtime/build impact. Dependency installation is a state change requiring scope, not a default discovery step.
- Refactoring preserves observable behavior unless an explicit behavior change is approved. Prove compatibility with relevant consumer and regression tests; avoid using a refactor label to conceal redesign.
- Update authorized user/API/config documentation when contracts change. State migration and rollback limits for schema/config changes; trigger `security-privacy.md` for sensitive surfaces.

Output: minimal change aligned to the approved contract, current evidence for acceptance criteria, explicit compatibility/verification limits, and no debug leftovers. No implicit publication or Git actions.
