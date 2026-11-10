# Find and consume the canonical glossary

Use this lightweight read-only procedure before work that names project concepts. Loading the full domain-modeling skill is needed for creation, maintenance or terminology decisions, not every lookup.

1. Read relevant project instructions and any configured domain-doc guidance (for example `docs/agents/domain.md`), then follow their glossary links and context map. Configuration is a discovery pointer, not write authorization.
2. If no location is configured, inspect existing documentation indexes and glossary candidates with glob/search tools, including `docs/glossary.md`, root `GLOSSARY.md`, `GLOSSARY-MAP.md` and context-specific glossaries. Do not assume case, path or a single context. Avoid dependency/vendor copies. Read candidate content rather than inferring authority from filenames.
3. Reuse the established canonical location and format. Follow an existing `GLOSSARY-MAP.md` to relevant contexts; do not flatten them. If configuration, maps or multiple apparent authorities conflict, surface the conflict and ask rather than choosing a winner or creating another file. If a configured path is absent, report that gap before introducing a competing default.
4. Read relevant entries before naming concepts in discussion, plans, code, tests or docs. Use the canonical terms; distinguish aliases from genuinely different concepts. When the same term has different meanings, identify the context; ask if it is ambiguous.
5. If no glossary or convention exists, the creation default is `docs/glossary.md`. Absence is not an error or permission to write: continue unaffected work, and load domain-modeling when established terms and approved scope warrant creation. Do not run setup, create an empty template, duplicate an existing glossary or migrate it automatically.

A glossary is shared vocabulary, not proof that code or requirements are correct. Surface contradictions rather than silently overriding either. Read-only tasks propose corrections; maintenance remains within approved scope. See [SKILL.md](SKILL.md) for maintenance and [GLOSSARY-FORMAT.md](GLOSSARY-FORMAT.md) for new-entry structure.
