# Domain docs

Adapt this seed to the project's actual paths during authorized setup. Do not copy installed-skill-relative links into project guidance; record project-relative paths instead.

## Before exploring

- Read the canonical project glossary identified by project instructions, documentation navigation or an existing context map. Preserve configured locations, root `GLOSSARY.md`, `GLOSSARY-MAP.md` and context-specific layouts; do not assume one universal filename.
- If nothing establishes a location, inspect existing glossary candidates before choosing the new-file default `docs/glossary.md`. Multiple conflicting authorities or a missing configured target require clarification, not a competing glossary.
- Read relevant ADRs in the project's established locations, commonly `docs/adr/` and context-scoped ADR folders.

Missing glossary files do not block unrelated work. Do not create empty scaffolding or run setup merely to read vocabulary. Creation is lazy: established meanings plus approved documentation-write scope. The domain-modeling skill owns creation and maintenance; setup only records agreed conventions.

## Use and maintain vocabulary

Use defined terms in plans, issue titles, refactor proposals, hypotheses, code, tests and docs. Distinguish true aliases from separate concepts. Read the relevant context when the same word has multiple meanings; ask if ambiguous.

New glossaries use Term | Definition | Distinction, optional context headings only when meanings differ, and optional Naming notes for aliases/deprecated names. Existing formats are preserved.

During approved changes, assess affected terminology and update the canonical glossary within scope. Surface glossary/code/requirements contradictions and unresolved meanings rather than silently changing authority. Semantic changes require an explicit domain decision; routine editorial corrections within scope need no per-row approval. Read-only work proposes changes only; no automatic broad renames or migrations. Report glossary impact as updated, reviewed—no change, or unresolved, with a reason.

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> Contradicts ADR-0007 (event-sourced orders), but worth reopening because…
