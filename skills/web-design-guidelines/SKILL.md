---
name: web-design-guidelines
description: Review web UI source for accessibility, focus, forms, motion, responsive layout, content and performance risks using pinned Vercel Web Interface Guidelines adapted for GOLD. Findings-only by default, not a redesign or conformance certificate.
license: MIT; see LICENSE
---
# Web Design Guidelines — GOLD adaptation

This GOLD wrapper adapts the MIT-licensed Vercel Web Interface Guidelines rules directly; it does not copy the separately published agent-skills wrapper. [Provenance](../gold-web-ui/upstream-manifest.json); [license](LICENSE).

## GOLD / DSH integration contract
Use [gold-web-ui](../gold-web-ui/SKILL.md) and its shared foundations/verification. Review-only means no repairs, report files, tool installs or state-changing tests without approval. Current evidence is not acceptance of delivery. No automatic Git actions, servers or publication; authorized local records belong in ignored `.gold/`. Existing brand and stack outrank optional upstream style preferences; accessibility/correctness remain required.

Resolve the requested files/components/route and scope. Read the connected code and shared primitives, not just the diff. Use the [pinned local review checklist](references/review.md); do not fetch mutable latest rules at invocation. For substantial accessibility questions also load GOLD's accessibility specialty.

Report concise prioritized findings: file/line or observed state, defect/impact, evidence type and minimal recommendation. Distinguish confirmed issues, hypotheses requiring browser verification and optional stylistic suggestions. Native semantic behavior matters more than regex matches. If no issue is found, report the checked scope and residual gaps, not an unconditional “pass”. Source review is not keyboard/AT execution or WCAG conformance.
