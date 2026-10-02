# Architecture & planning techniques

Read for new boundaries, public contracts, stores/integrations, cross-component redesign or architecture proposals. `architecture.md` remains the authority for C4/ADR maintenance; this reference concerns designing a change.

## Decision-ready design
- Establish users, critical journeys, constraints, non-goals and existing operational ownership. Separate measured facts from estimates and assumptions.
- Make relevant quality attributes testable: latency percentile/load, availability expectations, recovery point/time, data volume/retention, security/privacy and cost envelope. Ask for missing business trade-offs; do not invent guarantees.
- Compare the simplest viable existing-pattern solution against meaningful alternatives. Explain benefits, failure modes, operational burden, migration cost and rejected options.
- Define units by responsibility and contracts: inputs/outputs, ownership, state, consistency, failure semantics and dependency direction. Reuse established patterns; do not introduce services just for a diagram.
- Trace data and trust boundaries, identity/authorization, synchronous/asynchronous calls, retries, ordering, idempotency, timeouts and partial failures when relevant.
- Specify compatibility and phased migration, mixed-version behavior, data backfill/validation, rollout and safe recovery. Name irreversible steps explicitly.
- Sequence independently verifiable slices with dependency order and acceptance evidence. Separate discovery spikes from retained implementation and current from proposed architecture.

## Output
A concise proposal includes outcome/constraints, facts/assumptions, options/recommendation, boundaries/contracts/flows, quality attributes, risks, migration/recovery, delivery sequence and validation. Use C4/sequence views where they clarify actual relationships; never require a diagram for a trivial change. Record consequential accepted decisions in ADRs only when shared-document writes are scoped.

Common mistakes: technology-first choices; speculative scale; hidden migrations; treating an attractive diagram as evidence; mandatory microservices; architecture-only approval interpreted as implementation permission.
