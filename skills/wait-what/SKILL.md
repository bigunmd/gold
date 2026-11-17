---
name: wait-what
description: "Stop. That last message did not land: re-pitch it."
disable-model-invocation: true
---

## GOLD integration contract

GOLD governs this skill and all supporting resources. Preserve approved scope, collaboration style, runtime plan mode, authorization, current verification evidence and C4 assessment. A conversational answer settles a design choice; it is not permission to implement, publish or bypass plan mode. Reuse valid approval rather than adding duplicate gates.

- Invoke reusable skills through the host's available skill-loading mechanism, or read their installed instructions when no loader exists. User-only skills (`disable-model-invocation: true`) stay user-invoked; suggest them instead of auto-loading them, even when the host cannot enforce that metadata. Slash names denote skills, not guaranteed native commands.
- Use the host's available file-reading, path-discovery and content-search capabilities for inspection, and its question interface or ordinary conversation for user-owned decisions. Delegate only with available capabilities, scoped briefs, ownership and parent verification; never assume agents, worktrees, browser tools, tracker CLIs or credentials are available. If delegation is unavailable, disclose it and perform bounded independent passes; do not claim fresh-context independence without actual context isolation.
- Never automatically commit, push, merge, reset, delete worktrees, create/publish PRs, change labels, close tickets or deploy. Obtain explicit action/target approval and load GOLD Git policy before Git mutations. Prepare drafts or proposals when publication is not authorized. Review findings do not authorize repairs.
- File writes, instrumentation, experiments and setup edits require scope covering their effects. Local plans, investigations, specs/tickets, research, handoffs and learning state default to gitignored repository-root .gold/ (not .scratch/, OS temp or tracked notes); read-only requests get inline reports. Shared ADRs, glossary and runbooks may stay tracked when explicitly approved. Preserve existing approved project conventions and never force-add local records or store secrets in them.
- Read existing project tracker/domain configuration when relevant. If missing, suggest setup-matt-pocock-skills and clarify the target; do not auto-run setup, invent a GitHub default, authenticate or create labels. Integration installation does not configure any project.
- Ponytail governs simplicity, not completeness: retain required tests and validation; deep modules and design alternatives must solve a demonstrated problem, not add speculative layers. Present HTML artifacts through the host's artifact interface when available, otherwise provide a file link/path and explain the limitation; do not spawn replacement GUI servers or assume OS open commands work.

The contract above takes precedence over conflicting steps in the adapted upstream text and referenced resources.


Wait, I don't understand where you've got to here. Re-pitch that: give me a little bit of context, talk in ASD-STE100 Simplified Technical English, and use the language from the canonical project glossary (follow [glossary discovery](../domain-modeling/GLOSSARY-DISCOVERY.md) and any existing context map).
