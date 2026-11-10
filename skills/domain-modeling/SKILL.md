---
name: domain-modeling
description: Build and sharpen project vocabulary. Use when creating or maintaining a project glossary, resolving terminology conflicts or semantic changes, or recording or editing an ADR.
---

## GOLD / DSH integration contract

GOLD governs this skill and all supporting resources. Preserve approved scope, collaboration style, runtime plan mode, authorization, current verification evidence and C4 assessment. A conversational answer settles a design choice; it is not permission to implement, publish or bypass plan mode. Reuse valid approval rather than adding duplicate gates.

- Invoke reusable skills through the Harness skill tool. User-only skills (`disable-model-invocation: true`) stay user-invoked through the skill picker; suggest them instead of auto-loading them. Slash names denote skills, not installed native commands.
- Use Harness read, glob and grep tools for file inspection and ask_user_question for user-owned decisions. Use available subagent tools for delegation, with scoped briefs, ownership and parent verification; never assume Claude Task tools, worktrees, browser tools, tracker CLIs or credentials are available. If delegation is unavailable, disclose it and perform bounded independent passes.
- Never automatically commit, push, merge, reset, delete worktrees, create/publish PRs, change labels, close tickets or deploy. Obtain explicit action/target approval and load GOLD Git policy before Git mutations. Prepare drafts or proposals when publication is not authorized. Review findings do not authorize repairs.
- File writes, instrumentation, experiments and setup edits require scope covering their effects. Local plans, investigations, specs/tickets, research, handoffs and learning state default to gitignored repository-root .gold/ (not .scratch/, OS temp or tracked notes); read-only requests get inline reports. Shared ADRs, glossary and runbooks may stay tracked when explicitly approved. Preserve existing approved project conventions and never force-add local records or store secrets in them.
- Read existing project tracker/domain configuration when relevant. If missing, suggest setup-matt-pocock-skills and clarify the target; do not auto-run setup, invent a GitHub default, authenticate or create labels. Integration installation does not configure any project.
- Ponytail governs simplicity, not completeness: retain required tests and validation; deep modules and design alternatives must solve a demonstrated problem, not add speculative layers. Present HTML artifacts through Harness present; do not spawn replacement GUI servers or assume OS open commands work.

The contract above takes precedence over conflicting steps in the adapted upstream text and referenced resources.


# Domain Modeling

Maintain a curated vocabulary agreement, not an entity/class catalog, tutorial or second specification. Business and technical concepts qualify when their meaning is project-specific. Merely consuming relevant glossary entries is a lightweight habit; load this skill for creation, maintenance, ambiguity or semantic decisions. Missing setup configuration does not block glossary use or require a setup interview.

## Discover before creating

Follow [GLOSSARY-DISCOVERY.md](GLOSSARY-DISCOVERY.md). Reuse the configured or existing canonical glossary, including root `GLOSSARY.md` and `GLOSSARY-MAP.md` context layouts; preserve location and format. If no glossary or convention exists, default to `docs/glossary.md`. Never create a duplicate authority or automatically migrate a glossary.

Create lazily only when established meanings are available and approved scope covers documentation writes. Link a new glossary from existing project guidance or the documentation index when that edit is in scope; otherwise propose the link. Read-only work reports gaps or proposed entries without creating files. Do not create empty scaffolding just because a file is absent.

## Change-driven maintenance

1. Before relevant work, read the applicable definitions and use their vocabulary in discussion, plans, code, tests and docs. Ask if the intended context is ambiguous; the same term may legitimately mean different things in different contexts.
2. During approved delivery, check changed code, tests and docs for introduced concepts, changed meanings, renamed terms, removed concepts or newly important distinctions. Maintain only affected entries in the same change. Report unrelated drift as a follow-up, not a broad cleanup or automatic rename.
3. Record only established meanings from accepted project documentation, explicit decisions or clarified agreement. Code is evidence, not automatic authority: an inferred meaning stays a question until established. Keep unresolved definitions in discussion or authorized local notes, never as settled glossary rows.
4. Surface contradictions between glossary, code and requirements. Identify the competing meanings and ask for a domain decision; do not silently rewrite the glossary to match code or alter code to match the glossary.
5. Distinguish **editorial** clarification (same meaning, clearer wording) from **semantic** change (scope, identity, boundaries or relationships change). Semantic changes require an explicit domain decision; reuse existing approval covering that decision and the edit. Editorial corrections within approved scope do not require per-row approval. Neither kind grants permission for code renames, API changes or data migration.
6. At verification/closure report glossary impact: **updated**, **reviewed—no change**, or **unresolved**, with the affected location/terms and reason or pending decision. Absence alone does not require creation. This is task-driven maintenance, not a promise of background synchronization.

## During the session

### Challenge against the glossary

When the user uses a term that conflicts with the existing language in the canonical glossary, call it out immediately. "Your glossary defines 'cancellation' as X, but you seem to mean Y. Which is it?"

### Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term. "You're saying 'account': do you mean the Customer or the User? Those are different things."

### Discuss concrete scenarios

When domain relationships are being discussed, stress-test them with specific scenarios. Invent scenarios that probe edge cases and force the user to be precise about the boundaries between concepts.

### Cross-reference with code

When the user states how something works, check whether the code agrees. If you find a contradiction, surface it: "Your code cancels entire Orders, but you just said partial cancellation is possible. Which is right?"

### Capture resolved terminology within scope

When a term is resolved and documentation writes are authorized, update the discovered canonical glossary during that work. Otherwise propose the entry inline. Use [GLOSSARY-FORMAT.md](GLOSSARY-FORMAT.md) for new glossaries; preserve established formats without automatic migration.

Keep implementation details and links, business-rule catalogs, unresolved speculation and scratch notes out. A glossary defines concepts; specifications and ADRs retain requirements and implementation decisions.

### Offer ADRs sparingly

Only offer to create an ADR when all three are true:

1. **Hard to reverse**: the cost of changing your mind later is meaningful
2. **Surprising without context**: a future reader will wonder "why did they do it this way?"
3. **The result of a real trade-off**: there were genuine alternatives and you picked one for specific reasons

If any of the three is missing, skip the ADR. Use the format in [ADR-FORMAT.md](./ADR-FORMAT.md).
