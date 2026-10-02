# Plan / Design

Use for architecture proposals, requirements discovery and implementation planning, without implying implementation. Read `architecture-planning.md`; use `architecture.md` for current-system/C4 and decision-record maintenance. Follow `collaboration.md` for cadence.

1. Establish intended outcome, users, constraints, acceptance evidence and non-goals. Inspect existing code, interfaces, tests, accepted decisions and runtime/deployment facts before asking discoverable questions.
2. Separate verified facts, assumptions and unresolved decisions. Compare plausible approaches against measurable quality attributes; explain recommendation and rejected alternatives. Scale depth to impact, not document count.
3. Specify boundaries, contracts, data/trust flows, failure behavior, compatibility/migration and rollback. Read `security-privacy.md` for sensitive changes and `devops-reliability.md` for deployment implications.
4. Sequence small independently verifiable deliverables with dependencies and test obligations. Identify consequential decisions and which need user input; avoid inventing services or scaffolding to demonstrate an idea.
5. Present a decision-ready proposal: goal, constraints, options/recommendation, interfaces/flows, risks, delivery sequence, acceptance evidence and unresolved decisions. Mark proposed architecture separately from current documented architecture.

Stop at the requested planning outcome. No product edits, dependency installation, scaffolding or operational mutations follow merely from a planning request. Store local plans only when writes are authorized; otherwise use chat. Shared ADR/C4 edits need appropriate scope. Approval of a plan that explicitly covers implementation can satisfy Gate 1; approval of architecture-only work cannot. Respect runtime plan mode's own approval mechanism.

A report can be delivered without declaring implementation verified or delivery accepted. If the user asks to implement next, route to `develop.md` and preserve valid approval rather than restarting the design process.
