---
name: impeccable
description: Apply selected Impeccable methods for web UI critique, targeted polish, responsive hardening and motion refinement. Preserve the incumbent system; separate findings-only critique/audit from approved repairs.
license: Apache-2.0; see LICENSE
---
# Impeccable — GOLD adaptation

Modified from Paul Bakaus's Impeccable (which builds on Anthropic Frontend Design). This is selective guidance, **not the upstream CLI**, full command suite or detector. [Source pin/modifications](../gold-web-ui/upstream-manifest.json); [license](LICENSE).

## GOLD / DSH integration contract
Use [gold-web-ui](../gold-web-ui/SKILL.md), its foundations and evidence ladder. A critique/audit produces findings, not repairs or persistent reports by default. A polish/hardening request needs approved change scope and preserves the incumbent design; do not smuggle in a redesign. Current verification and human acceptance remain separate. No automatic Git actions, servers or publication. Authorized local notes go in ignored `.gold/`; consume existing project design docs without imposing PRODUCT.md or DESIGN.md.

No engine downloads, deterministic detector, browser overlay, live Apply, catalog fetches, telemetry, lifecycle hooks or approval-bypassing subprocesses are included. Do not call absent `impeccable` commands or report detector scores. Optional future integrations need explicit scope/security review; do not auto-install them. Delegation is proportional under GOLD, not a mandatory two-agent/detector ceremony.

## Pick the smallest useful pass
- **Critique (read-only):** evaluate hierarchy, clarity, coherence, differentiation and fit for the actual audience/task. Separate aesthetic judgment from observed defects. Name strengths and the highest-impact improvements, not a generic score.
- **Technical audit (read-only):** inspect accessibility patterns, responsive behavior, performance risks, state handling and design-system consistency. Record what is measurable and what requires browser/AT checks. Do not translate a checklist score into WCAG compliance.
- **Polish (approved changes):** refine the complete path while preserving content, behavior and visual world. Use [polish/hardening](references/polish.md).
- **Responsive hardening (approved changes):** focus on narrow/intermediate/wide layouts, content extremes, zoom, input methods and missing/error/loading states. Do not restyle unrelated surfaces.
- **Motion refinement (approved changes):** improve feedback, continuity and reduced-motion behavior. Do not add animation merely to make the work visible; CSS first, dependency changes require scope.

## Critique method
Resolve the exact target and current build/source; read existing tokens/components and relevant product/design context. Identify the main user task and intended quality bar. Inspect actual rendering and interaction if tools/permission allow, otherwise label source-only conclusions. Consider first-time, frequent, mobile, keyboard and assistive-technology use without inventing researched personas.

Prioritize blocked/inaccessible tasks, misleading state or data risk; then hierarchy, readability and responsive defects; then visual consistency. Explain why each issue matters and the smallest useful change. Avoid treating your preferred aesthetic as the user's requirement. State evidence and confidence; do not claim screenshots or tests you did not perform. End with clear recommended scope/next decisions when repair is not already approved.
