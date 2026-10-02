# Choose a preset and collaboration style

Three separate questions: **specialty** sets initial focus, **scenario** describes the requested outcome, and **style** controls how to collaborate. None changes runtime permissions.

## Starting point

| Desired outcome | Preset | Suggested style |
|---|---|---|
| Not sure where to start | GOLD Auto | Balanced |
| Compare architectures or clarify requirements | GOLD Architect | Guided |
| Implement an approved feature or fix | GOLD Development | Balanced or Delegated |
| Find problems without editing | GOLD Reviewer / QA | Balanced |
| Plan tests or inspect coverage gaps | GOLD Reviewer / QA | Balanced |
| Prepare a safe deployment | GOLD DevOps | Guided |
| Investigate an incident without repair | GOLD DevOps, diagnosis-only scope | Balanced |

Auto routes across planning, development, investigation, issue resolution, review, testing and operations. Specialists use the same core rules. An Architect can follow a later implementation request once missing scope approval is obtained; changing focus does not remount a preset.

## Styles

- **Guided:** explain options and ask at consequential decisions. Useful when learning a codebase or choosing unfamiliar trade-offs. Not a question before every file edit.
- **Balanced:** recommend an approach and handle routine details within approved scope. Default for substantial work when no preference exists.
- **Delegated:** make routine decisions using the agreed execution method; report milestones and escalate exceptions. No mandatory subagents, no permission expansion, no waiver of delivery acceptance.

Illustrative selection: “Use GOLD Auto, Balanced. Plan and implement the approved local changes; no publication or deployment.” The implementation approach and acceptance criteria still need to be presented and approved if they have not been.

## Change style without restarting

> Switch to Delegated for the rest of this approved task. Keep the same scope and test obligations; ask if a material assumption changes.

This is a style change, not new action authority. Explicit task preferences take precedence over session/project style defaults, but project safety rules remain constraints. A task override expires when that task ends. No global preference persistence is promised.

## When should the agent ask?

Missing implementation approval; consequential choices outside the brief; invalidated assumptions or scope; repeated attempts without useful evidence; unapproved action/target; final verification acceptance or unavailable promised checks.

A phase already covered by an approved complete brief does not need another gate. A small read-only explanation does not need a style questionnaire or local records.

## State boundaries explicitly

“Review only,” “local code and isolated tests only,” and “prepare a release but do not publish” are stronger instructions than a role title. Deployment scope should name the exact environment/action and permitted recovery. Credentials and shell availability are not authorization.
