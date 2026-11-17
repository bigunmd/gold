# Migrate legacy architecture without losing meaning

Load when adopting GOLD into a project with a monolithic C4 document, reconciling a mixed/partial layout, or explicitly modernizing architecture artifacts. This is an agent procedure, not an installed migration command. Follow `architecture.md` for the target model. Discovery is not permission: a small coherent document may stay intact, and unrelated fixes do not trigger a rewrite. Read-only requests receive an inline proposal only, with no local records or file edits.

## 1. Discover authority and evidence
Read project instructions, architecture indexes/configuration, glossary, ADRs, existing views and relevant implementation/config evidence. Find inbound links and heading anchors, including references in host instructions and user docs. Preserve established locations and contexts; default paths apply only when no equivalent exists. If authorities conflict, surface the conflict before choosing a winner. An old filename or missing local history does not establish that the project is new.

Inventory meaningful sections, diagrams, unique facts, rationale, historical notes and references. Classify by content and evidence, not headings alone:

| Content | Destination / treatment |
|---|---|
| Actors, boundary, external systems | Current system context |
| Applications, stores, responsibilities | Container or focused component/resource view as appropriate |
| Scenario interactions, retries, failures | Current use-case view if implemented; otherwise evolution |
| Environment/infrastructure | Deployment view with environment evidence |
| Proposed target/transition | Evolution proposal, explicitly non-current |
| Decision rationale/alternatives | Link existing ADR; preserve unique notes, propose extraction if useful |
| Historical edits | Git/history references; retain unique rationale or facts not explained elsewhere |
| Contradiction or unknown lifecycle | Explicit unresolved item with provenance; do not promote to current fact |

## 2. Map before edits
Present a compact section-to-destination map with disposition: preserve, split, merge, correct, historical reference or unresolved. Include every meaningful source section, affected inbound links/anchors, proposed canonical index and validation approach. Separate factual corrections from structural reorganization; cite the evidence for corrections. Keep ambiguous material clearly labeled and accessible until resolved rather than silently dropping it. Do not fabricate ownership, dates, ADR acceptance or production state.

Reuse explicit approval that already covers the migration approach, scope and checks; otherwise ask before edits. Resolve only consequential ambiguities with the user. Block affected claims when evidence is missing; proceed with independent authorized portions rather than guessing. The map and execution evidence belong in authorized ignored local records; durable status, unresolved facts and provenance must remain in shared docs, not solely in that map.

## 3. Apply within scope
- Reconcile existing destinations first. For a partial migration, read both old and new content, compare provenance and complete missing work; do not overwrite newer facts, restart the tree or blindly append extracted sections.
- Create only useful views and a small navigable index. Preserve consistent element identifiers and glossary meanings. Link rather than duplicate authoritative content.
- Keep current, proposed and historical states separate. Preserve existing accepted ADR substance. An extracted note is not an accepted ADR without evidence; retain its original provenance and uncertainty instead.
- Update repository discovery pointers and inbound links. Keep the legacy document as a small compatibility entry point with old heading anchors where practical, linking each to its new home. Do not leave the old architecture as a second maintained truth. Report external/unverifiable references and any anchors that cannot be preserved.
- Retain uniquely meaningful history in shared notes/decision records when needed. Git can carry edit chronology only if that history is actually available; in non-Git/uncommitted cases preserve a labeled historical source instead. Do not erase sole copies of rationale just because a history table is obsolete.
- No automatic commits, deletions, installs or host/profile updates. Do not reset unrelated work to undo a failed migration. Preserve partial results and propose targeted recovery within scope.

## 4. Verify and report
Check source-to-destination coverage against the map, factual corrections against evidence, status separation, index reachability, local links and preserved anchors. Validate diagrams using available tooling and disclose manual-only limits. Assess glossary and architecture impact per affected view.

Perform a second pass over the resulting tree: identify the same canonical destinations, no duplicate views or competing authorities, no remaining unmapped content, and no further restructuring needed. Report any unresolved item explicitly; do not claim complete migration while meaningful content is lost or ambiguous current claims remain. An already migrated project is assessed/updated in place, not migrated again.

Present changes, coverage, verification, limitations and next action for evidence acceptance. Completion of the file split is not human acceptance. Keep shared docs self-contained for a future clone; local execution maps are supporting evidence, not their only explanation.
