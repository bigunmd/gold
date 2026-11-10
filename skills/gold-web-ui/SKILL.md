---
name: gold-web-ui
description: Route web UI design, frontend implementation, responsive/accessibility work, visual critique and targeted polish to the right design skill and verification method. Use for pages, components, apps and interface reviews; not backend-only work.
---
# GOLD Web UI

## GOLD / DSH integration contract
Load gold-standard-development and select the outcome scenario first. This skill changes focus, not tools or permissions. Reuse approved scope; no extra gate for an internal design/review phase. Review-only requests do not authorize edits, local reports, installs or browser actions with side effects. Local authorized notes/screenshots belong in ignored `.gold/`; approved shared design docs stay in the project's established location. No automatic Git, publication, servers, profile changes or dependency installation. User acceptance still follows current verification evidence.

## Route selectively
Choose **one design lead**; do not stack contradictory aesthetic systems. The approved brief and existing brand/design system win over stylistic heuristics; accessibility and functional correctness remain requirements. Preserve the stack, tokens, components and established terminology. Ask only about material missing product/audience/brand constraints.

| Intent | Load on demand | Role |
|---|---|---|
| New UI or a deliberately approved visual redesign | `frontend-design` | Default design lead: subject-specific typography, hierarchy, content and layout |
| Need searchable palettes, typography, UX patterns, charts or stack guidance | `ui-ux-pro-max` | Lookup assistant, not a second design lead or authoritative design system |
| Explicit Taste request or distinctive company/marketing site needing a stronger site-level direction | `design-taste-frontend` | Alternative design lead; not the default for dashboards or every polish pass |
| Review implementation quality, accessibility patterns or web-interface conventions | `web-design-guidelines` | Read-only source review; not a redesign or conformance certificate |
| Focused critique, refinement, responsive hardening or motion polish | `impeccable` | Scoped quality pass; preserve the incumbent design |

For existing UI, first inspect representative screens, shared components and tokens rather than inventing a new style. A request to audit stays Review/Audit even when suggestions would be easy to implement. A request to polish does not authorize a rebrand. If the user names a family, load it directly and retain these boundaries; no need to load every family.

## Shared baseline and evidence
Before UI implementation/design review read [foundations](references/foundations.md). Before promising or executing verification read [verification](references/verification.md). For focused accessibility work also use GOLD's [accessibility specialty](../gold-standard-development/references/specialties/accessibility.md).

Start with purpose, primary task, content, constraints and a compact direction (type, color, layout, interaction). Make implementation proportional: semantic HTML and native controls, existing framework/components, CSS before a new animation library. Propose WCAG 2.2 AA unless the project specifies another target; record the target rather than claiming compliance by default.

At delivery name the design lead/supporting checks, explain consequential choices briefly, report actual source/browser/visual/accessibility evidence separately, and identify untested states and manual follow-up. Static instruction contracts do not prove model behavior. Never invent screenshots, browser tools, detector results or screen-reader tests.

## Packaging
These are pinned selective adaptations, not automatic upstream updates. [Provenance](upstream-manifest.json) records four guidance sources; Pro Max has its own [runtime manifest](../ui-ux-pro-max/upstream-manifest.json). Family licenses ship locally. No Taste/Impeccable engines, hooks, telemetry, browser downloads or upstream slash-command runtime is installed. An unavailable optional capability is a reported limitation, not permission to install it.
