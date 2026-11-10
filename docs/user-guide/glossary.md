# Project glossary in GOLD and DSH

GOLD uses a glossary as a shared vocabulary agreement, not an entity inventory or a second specification. This source revision integrates it into all five presets through the shared persona and the packaged [domain-modeling skill](../../skills/domain-modeling/SKILL.md). These are agent instructions, not a background synchronizer or runtime enforcement.

## Location and format

Reuse the project's established glossary and format. Consult project guidance, documentation links and any existing context map before assuming a path. If no glossary or convention exists, the default is `docs/glossary.md`; create it lazily when established terms and documentation-write scope exist. Do not create a competing root glossary or migrate an existing one automatically.

New glossaries use **Term | Definition | Distinction**. Use context headings only when meanings genuinely differ. Naming notes optionally record actual aliases and deprecated names; those are not the same thing as distinct concepts. See the packaged [format and example](../../skills/domain-modeling/GLOSSARY-FORMAT.md).

Only project-specific meanings belong, whether business or technical. Keep unresolved interpretations in discussion or authorized local work notes. No implementation inventory, business-rule catalog, ownership column, per-row timestamps or mandatory citations.

## During delivery

- Read relevant entries before naming concepts in discussion, plans, code, tests and docs.
- Include affected glossary maintenance in approved scope. Routine wording updates need no additional per-row approval.
- Maintain touched concepts in the same change. Report unrelated drift instead of launching a repository-wide rename.
- Surface conflicts between agreed meaning, requirements and code. Never silently change one to justify another.
- An established meaning changes only through an explicit domain decision; reuse an already-approved decision. A glossary edit never authorizes API changes or data migration.
- Report glossary impact: **updated**, **reviewed—no change**, or **unresolved**, with a reason. An absent glossary under read-only scope is not permission to create it.

## Use from DSH

Install or update the trusted local GOLD checkout through DSH's Plugins UI or an available management-enabled agent using `plugin_manager`, following the [quick start](quick-start.md). Then start a **new GOLD session**. Existing sessions retain their persona revision; a source build or package compatibility check does not update the active profile. No separate glossary plugin, model, permission setting or setup skill is required. Project skills may shadow bundled skills; resolve conflicting project instructions rather than creating duplicate glossary authorities.

Example read-only prompt:

> Read this project's glossary and explain whether Customer and User have distinct meanings. Surface contradictions in the relevant code; do not edit anything.

Example approved creation prompt:

> Create a project glossary from the established terminology in our accepted documentation. Reuse any existing glossary; otherwise use docs/glossary.md with Term, Definition and Distinction. Documentation-only scope includes adding its link to existing project guidance and the documentation index. Surface uncertain meanings instead of inventing definitions. Show the diff for acceptance; no commits.

For future feature work, include affected glossary maintenance in that feature's approved scope. GOLD is expected to maintain it while working; nothing runs between sessions.

## Verification limits

Source contract tests, package inventory and Loader checks establish that instructions are present and resolvable, not that a model always follows them. Use fresh-session scenarios for creation, existing-glossary reuse, read-only conflicts and changed terminology to validate actual behavior on your selected DSH/model combination.
