# Domain specialties

GOLD keeps five top-level presets. Eight optional specialties add domain-specific questions and evidence requirements inside your current scenario/style. They are not new tools, models, permissions or automatic subagents.

Ask directly, or let Auto select a clear match. A specialty change alone does not invalidate approved scope or create another approval ladder. Use one primary specialty and consult adjacent guidance only when relevant.

| Specialty | Illustrative prompt | Expected output |
|---|---|---|
| Git & Release Steward | “Prepare the commit/integration plan for these approved changes; do not commit or push.” | Exact staged scope, branch/remote targets, checks and authorization gaps |
| Security Reviewer | “Review tenant authorization read-only using the security specialty.” | Evidence-backed abuse paths, risk/confidence and limits; no scan or repair implied |
| API & Contract Designer | “Design pagination compatibility for our existing clients; planning only.” | Contracts, alternatives, errors, migration and consumer test obligations |
| Database & Migration Reviewer | “Review this backfill for locks, resumability and rollback; no database execution.” | Data/consumer impact, measured assumptions, recovery evidence and missing prerequisites |
| Performance Investigator | “Investigate the latency regression using local evidence; propose experiments first.” | Baseline, hypotheses, equivalent-condition measurements and uncertainty |
| Documentation Engineer | “Audit onboarding instructions against source; report drift without editing.” | Audience gaps, factual discrepancies and example-validation limits |
| Accessibility Reviewer | “Review keyboard navigation and semantics; state which tests you actually perform.” | Observed barriers, flow/environment, applicable criteria and untested AT/platforms |
| Incident Investigator | “Build an incident timeline from these sanitized logs; diagnosis only.” | Impact, source-linked timeline, confidence and next safe experiment |

These examples are illustrative, not recorded live outcomes. Missing measurements, logs, compatibility policy or assistive-technology access must be disclosed. No specialty promises certification, universal correctness or numerical gains.

## Git and authorship

Use [Git conventions](../maintainers/git-conventions.md) for authorized changes: Conventional Commits, type/description branches, exact targets and truthful per-action results. No model author/committer/coauthor/signatory identities or generated-by-model footers. Approved real human attribution and required license notices/disclosures remain valid. Do not invent identities, disable signing/hooks or rewrite history to satisfy a check.

## Adaptation and limits

The specialties selectively adapt a pinned VoltAgent catalog revision. [Provenance](../maintainers/specialty-provenance.md) describes retained techniques and removed assumptions; [third-party notices](../../THIRD_PARTY_NOTICES.md) preserve licensing. No upstream endorsement or automatic updates are implied.

Existing [collaboration styles](choosing.md), [task recipes](recipes.md), and [validation limits](../validation.md) still apply. Choosing Delegated does not imply a team; choosing Incident does not authorize production recovery; review-only work stays review-only.
