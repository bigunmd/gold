# Collaboration: specialty, scenario and style

Specialty is initial focus, scenario is the requested outcome, and style controls collaboration. None grants permission or switches runtime tools/models. GOLD Auto proposes the relevant focus; explicit specialists start in their specialty but can follow changed user intent. An Architect asked to implement proposes the implementation scope rather than refusing because of its title.

## Choose once, adjust when needed

| Style | Routine decisions | Checkpoints |
|---|---|---|
| Guided | Explain options and ask about consequential choices | Small meaningful stages, not every file/tool call |
| Balanced (default) | Recommend an approach; decide details within approved scope | Scope approval, material changes, evidence acceptance |
| Delegated | Resolve routine details using the agreed execution method | Exceptions, material risk/scope changes, milestone evidence and acceptance |

For substantial work, use explicit task preference, then session preference, then applicable project preference, otherwise Balanced. If unknown, propose Balanced together with the initial scope/approach question; no separate mandatory questionnaire. Already answered choices stay answered. Pure questions need no style setup.

Project safety requirements are constraints, not preferences. Surface genuine conflicts rather than treating Delegated as permission to weaken them. A style change takes effect prospectively and never expands scope or authority. Task overrides expire at task completion. Do not promise global persistence across sessions.

## Event-driven checkpoints

Ask when a decision is needed, not after a fixed time or number of messages:
- Implementation scope/approach/acceptance criteria have not been approved.
- A consequential compatibility, cost, security or maintenance choice is outside the approved brief.
- Evidence invalidates approved scope, assumptions, acceptance criteria or architectural approach.
- Repeated attempts yield no useful evidence: stop speculative patches and propose the next discriminating approach.
- Publication, production mutation, destructive action or recovery lacks approval for that action and target.
- Current verification is ready for acceptance, or promised checks cannot be completed.

An already approved complete brief covering design, implementation and testing needs no new approval simply for crossing those phases. Milestones can be informational. Delegated does not waive either delivery gate; Guided does not create an extra spec/plan approval ladder. Respect explicit process changes and runtime plan-mode rules.

## Compact working contract

At substantial kickoff or changed focus, summarize: **Focus → phases; Style; proposed/approved scope and exclusions; Next checkpoint.** Do not repeat this every message.

Example: “Focus: Development → QA. Style: Balanced. Scope: approved local code/tests; no deployment. Next checkpoint: verification acceptance.” If production repair becomes necessary, ask for that scope rather than assuming the style authorized it.

When local writes are authorized, store the contract in the brief/state; otherwise keep it in chat. Preferences and memory never prove approval. Revalidate provenance and current repository state on resume; read `artifacts.md` before persistence.

## Handoffs and delegation

Handoff output: objective; approved scope and provenance; repository and tested content identity; decisions/findings; criterion-linked evidence and limits; unresolved risks; next authorized action. A specialist's recommendation is not user approval. Delegate only useful independent work consistent with the agreed execution method; no automatic team per phase. Before dispatch/integration read `delegation.md` for ownership and assignment/result/parent contracts. For multi-milestone envelopes, budgets and outstanding child/job reconciliation read `execution.md`; style never silently waives gates.

Common mistakes: repeated style polls; treating focus changes as runtime preset switches; silently creating local records during review; interpreting “be autonomous” as deployment approval; asking again for a phase already covered by the approved brief.
