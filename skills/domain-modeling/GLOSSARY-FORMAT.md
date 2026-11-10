# Project glossary format

Reuse existing canonical locations and formats; do not migrate them just to match this example. Follow [discovery rules](GLOSSARY-DISCOVERY.md), including existing root `GLOSSARY.md` and `GLOSSARY-MAP.md` context layouts. When no convention exists, new glossaries default to `docs/glossary.md`.

## New glossary structure

Use **Term | Definition | Distinction**. Definitions say what a concept is in this project, normally in one or two sentences. Distinction clarifies a likely confusion, not every relationship; use `—` when none is needed. No mandatory Domain column.

Illustrative example only; do not copy these meanings into a project without establishing them:

```md
# Project glossary

Shared vocabulary for the ordering application.

| Term | Definition | Distinction |
|---|---|---|
| Customer | A person or organization that purchases from us. | Not a User: a customer can exist without a login. |
| User | A person with a login to the application. | A user may act for a customer; the two are not synonyms. |
| Order | A customer's accepted request to purchase goods. | Not a Cart, which is still a proposed selection. |
| Fulfillment batch | Orders grouped for a single warehouse picking run. | — |

## Naming notes

- “Client” is a legacy alias for Customer in older support material; prefer Customer.
- “Buyer account” is a deprecated name for Customer; new documentation uses Customer.
```

## Inclusion and structure rules

- Include established project-specific business or technical meanings. Generic programming definitions do not belong merely because the code uses them.
- Do not enumerate every entity, class, file or API. No implementation details/links, tutorials, requirements, business-rule catalogs or speculative definitions. Uncertain meanings remain in discussion or authorized local notes until clarified; never infer a definition from a name alone.
- **Optional context headings** are useful only when meanings genuinely differ. A flat table is fine for a single coherent vocabulary. If the same term has different meanings, label each context; ask when the intended context is ambiguous. Preserve existing multi-file maps rather than replacing them with headings automatically.
- **Optional Naming notes** record real aliases and deprecated names only when useful. Do not label a distinct concept an alias or indiscriminately list near-synonyms as forbidden words. Keep important conceptual differences in Distinction.
- No mandatory ownership, timestamps, per-row citations or code links. Evidence can be discussed during review without making the glossary an audit log.
- Do not expand a settled definition into every rule involving that concept. Link through ordinary project navigation when authorized, not a second implementation index.

Maintenance, semantic versus editorial changes and authorization follow [domain-modeling](SKILL.md).
