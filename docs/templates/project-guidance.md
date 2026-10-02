# Optional project guidance template

Adapt the sections below into your existing repository instructions. Replace example prompts with verified facts; omit irrelevant sections. This is not an executable configuration file or a new automatic discovery mechanism. Do not paste secrets or treat this document as approval of future actions.

## Purpose and users

Describe the project outcome, primary users and important non-goals.

## Repository map and ownership

List entry points, package responsibilities, relevant working directories and ownership boundaries. Distinguish source from generated files.

## Build and test commands

Record exact commands and their working directories. Explain prerequisites, environment assumptions, external-service access, setup/teardown writes, cost and isolation. Identify checks that must never target production.

## Required checks

Map changed surfaces to relevant unit, contract, integration, E2E, static and security checks. State known limitations; do not pre-mark checks as passed.

## Architecture and decisions

Point to established current-system diagrams, accepted ADRs, public contracts and runbooks. Explain where new shared documentation belongs.

## Sensitive systems and prohibited actions

Name protected environments/resources without credentials. State which actions require separate explicit approval, including publication, deployment, data resets and recovery. Repository guidance cannot override higher-priority runtime policy.

## Deployment and recovery

Describe environment identifiers, rollout ownership, health signals and recovery prerequisites. Document how to request authorization; do not embed standing approval for unspecified changes.

## Collaboration preference

Example: Prefer Balanced for ordinary tasks; use Guided for unresolved architecture choices. This preference does not authorize edits or external effects. Current task preferences can override style defaults while safety constraints remain binding.

## Documentation and handoffs

Use established shared locations. Keep authorized private work records out of Git. Handoffs include scope/provenance, revision/dirty state, decisions, current evidence/limits, risks and next authorized action.
