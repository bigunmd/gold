# Testing & QA techniques

Read when selecting, authoring or evaluating tests. `test-validate.md` defines standalone scope/side-effect boundaries; `quality.md` defines RED/GREEN and delivery verification.

## Risk-based test selection
| Changed surface | Useful evidence |
|---|---|
| Pure logic | Unit cases for normal, empty, boundary and invalid inputs |
| Public interface | Consumer/contract tests, compatible and incompatible versions |
| Storage/integration | Real scoped integration, migration and transaction/failure behavior |
| User journey | Focused E2E plus accessibility/interaction checks where relevant |
| Concurrency/retries | Duplicate, ordering, timeout, cancellation and partial failure cases |
| Performance-sensitive path | Reproducible workload, baseline and explicit latency/resource budget |
| Security boundary | Authentication/authorization, abuse/negative cases, sensitive-data checks |

Test the observable contract, not internal implementation trivia. Derive expected results independently from the production helper under test. Name which realistic bug a test catches. For behavior changes demonstrate intended failure before implementation; setup/import failures are not RED evidence of a product defect.

Use deterministic fixtures, controlled clocks/randomness and isolated data. Real integration evidence should exercise the boundary of interest; mock only unavailable/unrelated external effects and disclose what remains untested. Inspect setup/teardown and target before running anything against shared services.

Flaky test: retain failing evidence, reproduce and isolate cause; do not repeat until green, weaken assertions, or silently quarantine. An explicit accepted quarantine includes impact and follow-up, not a claim the check passed.

Report exact command, environment, revision/dirty state, result, meaningful counts, skips and gaps. Separate static checks, unit tests, integration tests, E2E and manual checks. A structural prompt test verifies packaging/discovery, not agent compliance. Current evidence must match the actual changed state; rerun affected checks after fixes.
