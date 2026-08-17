# Systems Complexity Atlas — research and scoring audit

Updated: 2026-08-16

## What the index claims

The atlas is an editorial ordinal index of eighteen deliberately difficult, production-scale concepts. It does **not** claim that complexity is a directly measured natural quantity, that the intervals between scores are equal, or that a 10 is twice as difficult as a 5.

The repeatable procedure is:

1. Define the production-scale concept and its primary object of engineering.
2. Use primary standards, official curricula, or original systems research to identify its mechanisms, boundaries, state model, diagnostic conditions, and threat model.
3. Match that evidence to one written 1–10 anchor for each of five dimensions.
4. Record a concept-specific argument and link the evidence used.
5. Classify the concept by its primary object, while recording adjacent disciplines rather than pretending the borders are exclusive.

The standards and papers establish the technical facts. The conversion from those facts to an integer remains an editorial judgment.

## Category rule

- **Network engineering:** the primary object is reachability, forwarding behavior, path selection, or control-plane convergence.
- **Computer science:** the primary object is computation, storage semantics, program behavior, runtime behavior, or proof of correctness.
- **Security engineering:** the primary object is assurance, authority, or trust when misuse and an adaptive adversary are part of the model.

This resolves overlap by asking “what behavior is the work primarily trying to control?” It does not assign exclusive ownership.

## Dimensions

- **Conceptual depth:** precision in theory, abstraction, semantics, mathematics, and correctness models.
- **Integration span:** diversity of components, teams, vendors, owners, protocols, and policy domains that must cooperate.
- **Dynamic state:** dependence on concurrent, distributed, delayed, changing, or partially synchronized state.
- **Failure opacity:** distance between cause and symptom, reproducibility, observability, and diagnostic ambiguity.
- **Adversarial pressure:** degree to which malicious input, deception, adaptation, or deliberate exploitation changes the problem.

The complete fifty-anchor rubric is stored in `src/content/systemsComplexityData.js` and rendered in the article. Score **7** is the quadrant boundary because every dimension’s seventh anchor is the first to call that dimension a defining constraint. This is an interpretive boundary, not a percentile or statistical cutoff.

## Revised score ledger

| ID | Concept | Depth | Integration | State | Opacity | Adversary | Primary evidence |
|---|---|---:|---:|---:|---:|---:|---|
| NET-01 | BGP policy & convergence | 8 | 10 | 10 | 9 | 7 | IETF RFC 4271; RFC 7454 |
| NET-02 | EVPN–VXLAN fabric design | 8 | 9 | 9 | 8 | 6 | IETF RFC 8365 |
| NET-03 | Segment routing & traffic engineering | 9 | 8 | 9 | 8 | 5 | IETF RFC 8402 |
| NET-04 | Hybrid multi-cloud connectivity | 6 | 10 | 9 | 10 | 7 | NIST SP 800-207A |
| NET-05 | Intent automation & source of truth | 7 | 9 | 8 | 8 | 7 | IETF RFC 8969 |
| NET-06 | IPv6 transition & coexistence | 6 | 9 | 7 | 8 | 6 | IETF RFC 7381 |
| CS-01 | Distributed consensus & replication | 10 | 8 | 10 | 9 | 2 | FLP; Raft |
| CS-02 | Concurrency & memory models | 10 | 6 | 10 | 10 | 3 | ISO C/C++ committee memory-model paper; CS2023 |
| CS-03 | Operating systems, kernels & runtimes | 9 | 9 | 9 | 9 | 6 | CS2023 |
| CS-04 | Database engines & distributed transactions | 9 | 9 | 10 | 9 | 5 | Spanner; CS2023 |
| CS-05 | Compilers & static analysis | 9 | 7 | 6 | 8 | 4 | CS2023 |
| CS-06 | Formal methods & verification | 10 | 6 | 7 | 8 | 4 | seL4 proofs; CS2023 |
| SEC-01 | Cryptographic protocol & key lifecycle | 10 | 9 | 8 | 9 | 10 | NIST SP 800-57; SP 800-160 |
| SEC-02 | Identity federation & authorization | 8 | 10 | 9 | 9 | 10 | NIST SP 800-63C-4; SP 800-162 |
| SEC-03 | Zero-trust multi-cloud enforcement | 7 | 10 | 9 | 9 | 10 | NIST SP 800-207A; SP 800-160 |
| SEC-04 | Software supply-chain security | 7 | 10 | 8 | 9 | 10 | NIST SP 800-218; SP 800-160 |
| SEC-05 | Detection engineering & incident response | 7 | 10 | 10 | 10 | 10 | NIST SP 800-61 Rev. 3; SP 800-160 |
| SEC-06 | Cloud IAM & policy composition | 8 | 10 | 9 | 10 | 10 | NIST SP 800-162; SP 800-63C-4 |

## Important interpretation notes

- The dataset is intentionally selected from the complex end of each discipline. Empty lower quadrants are a property of the selection, not evidence that ordinary engineering work never appears there.
- Field averages summarize this editorial sample, not entire professions or academic disciplines.
- A source can justify that a concept crosses several domains or depends on asynchronous state; it cannot independently validate the chosen integer.
- The default reader view shows one discipline and six named concepts at a time, translating `depth` to **precision** and `integration` to **coordination**. Selecting a tile renders a multi-paragraph explanation assembled from that concept’s classification, score drivers, exact anchors, production failure reasoning, investigation questions, and evidence links. The technical map preserves the complete two-axis comparison.
- Uniform marker size removes the former unlabelled consequence/blast-radius encoding.
- Exact-score overlaps are offset by a few display pixels so each point remains selectable; the score panel and table remain authoritative.
- Re-scoring should be required if the concept definition, production scope, or anchor wording changes.

## Primary source set

- IETF RFC 4271, RFC 7454, RFC 8365, RFC 8402, RFC 8969, and RFC 7381.
- ACM/IEEE-CS/AAAI Computer Science Curricula 2023.
- Fischer, Lynch, and Paterson, “Impossibility of Distributed Consensus with One Faulty Process.”
- Ongaro and Ousterhout, “In Search of an Understandable Consensus Algorithm.”
- Google Research, “Spanner: Google’s Globally-Distributed Database.”
- seL4 Foundation verification proof documentation and publications.
- NIST SP 800-57 Part 1 Rev. 5, SP 800-63C-4, SP 800-61 Rev. 3, SP 800-162, SP 800-160 Vol. 1 Rev. 1, SP 800-207A, and SP 800-218.
