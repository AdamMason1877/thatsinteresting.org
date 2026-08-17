export const disciplineMeta = {
  network: {
    name: 'Network engineering',
    short: 'NET',
    color: '#70e1ff',
    thesis: 'Coordinate paths through hardware, policy, distance, and partial failure.',
    nativeDifficulty: 'Global behavior from local decisions',
    profileReason: 'Network engineering’s signature dimensions are integration and dynamic state because the system is physically distributed, continuously changing, and only partially visible from any one device. Security’s selected concepts span even more trust and ownership domains; the network-specific burden is making independent control planes converge while traffic is already flowing.',
    boundary: 'The network can deliver a path and expose its condition. It cannot decide whether the application state is correct or whether the requester should be trusted; those handoffs lead directly into computer science and security engineering.',
  },
  computer: {
    name: 'Computer science',
    short: 'CS',
    color: '#d9ff5b',
    thesis: 'Make abstractions remain correct as state, scale, and concurrency multiply.',
    nativeDifficulty: 'Correctness across abstraction layers',
    profileReason: 'Computer science leads on conceptual depth because its hardest topics ask for precise claims about ordering, semantics, isolation, computability, and proof. Some concepts can be studied inside a bounded model, which is why the field average is slightly lower on integration and adversarial pressure.',
    boundary: 'A correct algorithm still depends on the network that carries its messages and the security model that decides who may send them. The abstraction is powerful precisely because other disciplines maintain its assumptions.',
  },
  security: {
    name: 'Security engineering',
    short: 'SEC',
    color: '#e8a8ff',
    thesis: 'Preserve guarantees when people, systems, and an adaptive opponent interact.',
    nativeDifficulty: 'Assurance against an active adversary',
    profileReason: 'Security engineering stays high across all five dimensions because it evaluates the composed system rather than one isolated mechanism. It inherits software and network failure modes, adds identity and governance, then assumes a motivated opponent will search for the weakest seam.',
    boundary: 'Security can define and verify a trust decision, but it needs software to compute that decision and infrastructure to enforce it. A control that is theoretically sound but inconsistently implemented is not a security property in practice.',
  },
}

export const complexityDimensions = [
  { key: 'depth', label: 'Conceptual depth' },
  { key: 'integration', label: 'Integration span' },
  { key: 'state', label: 'Dynamic state' },
  { key: 'opacity', label: 'Failure opacity' },
  { key: 'adversary', label: 'Adversarial pressure' },
]

export const complexityThreshold = 7

export const categoryRule = {
  title: 'Classify by the primary object being engineered',
  copy: 'The category is not a claim of exclusive ownership. It identifies the object whose behavior the work is trying to control; adjacent fields name the assumptions and dependencies that still matter.',
  network: {
    label: 'Network engineering',
    rule: 'Primary object: reachability, forwarding behavior, path selection, or control-plane convergence.',
  },
  computer: {
    label: 'Computer science',
    rule: 'Primary object: computation, storage semantics, program behavior, runtime behavior, or proof of correctness.',
  },
  security: {
    label: 'Security engineering',
    rule: 'Primary object: assurance, authority, or trust when misuse and an adaptive adversary are part of the model.',
  },
}

// These anchors make the 1-10 index ordinal and reproducible. A score is a
// category with a written meaning, not a claim of interval-scale measurement.
export const scoreAnchors = {
  depth: {
    1: 'Recognize or configure a familiar mechanism by procedure.',
    2: 'Apply a single bounded model with familiar rules.',
    3: 'Combine a few rules and troubleshoot a contained mechanism.',
    4: 'Reason across one important abstraction boundary.',
    5: 'Reconcile several abstractions and explicit trade-offs.',
    6: 'Use an exact model to handle important edge cases.',
    7: 'A semantic, mathematical, or formal model defines a correct solution.',
    8: 'Several exact models interact and assumptions must be tracked.',
    9: 'Advanced mathematics, semantics, or proof-style reasoning is central.',
    10: 'Correctness depends on proof-level precision; small assumption changes can alter what is possible.',
  },
  integration: {
    1: 'One component and one owner contain the work.',
    2: 'A few components cooperate under one owner.',
    3: 'One subsystem spans a single platform or team.',
    4: 'Several subsystems compose inside one product boundary.',
    5: 'Multiple services or teams cooperate through stable contracts.',
    6: 'The work crosses a platform, vendor, or operational boundary.',
    7: 'Cross-boundary coordination is a defining source of difficulty.',
    8: 'Many heterogeneous technical or ownership domains must align.',
    9: 'Organization or provider dependencies leave only partial authority and visibility.',
    10: 'The system is ecosystem-scale: no owner has complete end-to-end control.',
  },
  state: {
    1: 'The subject is effectively static or evaluated offline.',
    2: 'Change is infrequent, explicit, and controlled.',
    3: 'Local state changes mostly in a sequential order.',
    4: 'Concurrent state exists inside one bounded system.',
    5: 'Several moving components interact with bounded delay.',
    6: 'State is distributed but shares a common coordination mechanism.',
    7: 'Asynchrony or distributed timing is a defining constraint.',
    8: 'Reordering, recovery, or temporary divergence is routine.',
    9: 'Continuous change combines with partial failure or stale views.',
    10: 'Decisions must be correct while global state is unknowable and still changing.',
  },
  opacity: {
    1: 'Cause and symptom are local, visible, and reproducible.',
    2: 'Direct instrumentation usually exposes the cause.',
    3: 'A bounded log trail or deterministic reproduction is available.',
    4: 'Several layers participate, but ownership and evidence remain clear.',
    5: 'The symptom is at least one layer removed from the cause.',
    6: 'Intermittence or partial observability materially slows diagnosis.',
    7: 'Observability gaps or nondeterminism define the investigation.',
    8: 'Many layers produce plausible, similar-looking causes.',
    9: 'Symptoms are remote or delayed and essential context is often missing.',
    10: 'Evidence is incomplete or mutable, and investigation or containment can change it.',
  },
  adversary: {
    1: 'An attacker is outside the defining problem model.',
    2: 'Basic hardening matters but is incidental to the core problem.',
    3: 'Abuse is possible, though normal correctness still dominates.',
    4: 'Explicit misuse cases affect some design choices.',
    5: 'Hostile input changes important interfaces or guarantees.',
    6: 'A threat model spans several exposed interfaces.',
    7: 'Attacker-aware design is a defining constraint.',
    8: 'A capable attacker targets composition, authority, or privileged paths.',
    9: 'An adaptive attacker materially changes operation and response.',
    10: 'A persistent adaptive adversary is central and searches continuously for the weakest seam.',
  },
}

export const evidenceLibrary = {
  rfc4271: {
    label: 'IETF RFC 4271 · BGP-4',
    url: 'https://datatracker.ietf.org/doc/html/rfc4271',
    supports: 'BGP exchanges inter-AS reachability, applies policy through path attributes and selection, and maintains asynchronous finite-state sessions.',
  },
  rfc7454: {
    label: 'IETF RFC 7454 · BGP operations and security',
    url: 'https://datatracker.ietf.org/doc/html/rfc7454',
    supports: 'Operational BGP design must account for route leaks, prefix filtering, maximum-prefix controls, and deliberate or accidental propagation failures.',
  },
  rfc8365: {
    label: 'IETF RFC 8365 · EVPN overlays',
    url: 'https://datatracker.ietf.org/doc/html/rfc8365',
    supports: 'EVPN distributes overlay reachability over several possible encapsulations and underlay designs.',
  },
  rfc8402: {
    label: 'IETF RFC 8402 · Segment Routing Architecture',
    url: 'https://datatracker.ietf.org/doc/html/rfc8402',
    supports: 'Segment routing steers packets through ordered instructions while depending on IGP topology and forwarding behavior.',
  },
  nist207a: {
    label: 'NIST SP 800-207A · Cloud-native zero trust',
    url: 'https://csrc.nist.gov/pubs/sp/800/207/a/final',
    supports: 'Multi-cloud access control composes identities, services, gateways, policies, telemetry, and enforcement across platforms.',
  },
  rfc8969: {
    label: 'IETF RFC 8969 · YANG-based network automation',
    url: 'https://datatracker.ietf.org/doc/html/rfc8969',
    supports: 'Automation joins service models, network models, controllers, configuration, and operational state in a layered workflow.',
  },
  rfc7381: {
    label: 'IETF RFC 7381 · Enterprise IPv6 deployment',
    url: 'https://datatracker.ietf.org/doc/html/rfc7381',
    supports: 'IPv6 deployment is a staged program spanning addressing, routing, DNS, applications, operations, and security.',
  },
  flp: {
    label: 'Fischer, Lynch & Paterson · Distributed consensus impossibility',
    url: 'https://groups.csail.mit.edu/tds/papers/Lynch/pods83-flp.pdf',
    supports: 'A completely asynchronous consensus protocol cannot guarantee termination with even one unannounced crash failure.',
  },
  raft: {
    label: 'Ongaro & Ousterhout · Raft',
    url: 'https://raft.github.io/raft.pdf',
    supports: 'A practical consensus system decomposes leader election, replicated logs, safety, persistence, and membership change.',
  },
  cppMemory: {
    label: 'ISO C++ committee · Concurrency memory model',
    url: 'https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1276.htm',
    supports: 'Concurrent meaning depends on happens-before relations built from sequencing and synchronization across threads.',
  },
  cs2023: {
    label: 'ACM, IEEE-CS & AAAI · CS2023',
    url: 'https://csed.acm.org/wp-content/uploads/2025/11/CS2023-Report.htm',
    supports: 'The curriculum places operating systems, programming-language semantics, concurrency, data management, and formal methods inside computer science.',
  },
  spanner: {
    label: 'Google Research · Spanner',
    url: 'https://research.google/pubs/spanner-googles-globally-distributed-database-2/',
    supports: 'Globally distributed transactions require replication, externally consistent ordering, and an API that exposes clock uncertainty.',
  },
  sel4: {
    label: 'seL4 Foundation · Verification proofs',
    url: 'https://sel4.systems/Verification/proofs.html',
    supports: 'Machine-checked assurance links specifications, C implementation, and—in supported configurations—binary behavior while retaining explicit assumptions.',
  },
  nist57: {
    label: 'NIST SP 800-57 Part 1 Rev. 5 · Key management',
    url: 'https://csrc.nist.gov/projects/key-management/key-management-guidelines',
    supports: 'Cryptographic assurance depends on the protection, metadata, access control, inventory, and lifecycle of keying material.',
  },
  nist63c: {
    label: 'NIST SP 800-63C-4 · Federation and assertions',
    url: 'https://csrc.nist.gov/pubs/sp/800/63/c/4/final',
    supports: 'Federation crosses separately administered credential providers and relying parties through verifiable assertions.',
  },
  nist218: {
    label: 'NIST SP 800-218 · Secure Software Development Framework',
    url: 'https://csrc.nist.gov/pubs/sp/800/218/final',
    supports: 'Secure development spans producers, purchasers, suppliers, acquisition, vulnerability prevention, and lifecycle practices.',
  },
  nist61: {
    label: 'NIST SP 800-61 Rev. 3 · Incident response',
    url: 'https://csrc.nist.gov/pubs/sp/800/61/r3/final',
    supports: 'Detection, response, and recovery are organization-wide risk activities that must improve while incidents are occurring.',
  },
  nist162: {
    label: 'NIST SP 800-162 · Attribute-based access control',
    url: 'https://csrc.nist.gov/pubs/sp/800/162/upd2/final',
    supports: 'Authorization composes subject, object, operation, environment, attributes, policies, rules, and relationships.',
  },
  nist160: {
    label: 'NIST SP 800-160 Vol. 1 Rev. 1 · Systems security engineering',
    url: 'https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final',
    supports: 'Security engineering is an integrative, lifecycle discipline for trustworthy systems operating in contested environments.',
  },
}

export const conceptAudit = {
  'NET-01': {
    classification: 'The controlled object is interdomain reachability: which routes are learned, preferred, and exported.',
    adjacent: 'Computer science supplies distributed-state reasoning; security engineering addresses route origin, leaks, and hostile manipulation.',
    evidence: ['rfc4271', 'rfc7454'],
  },
  'NET-02': {
    classification: 'The controlled object is endpoint reachability and forwarding across a routed underlay and virtual overlay.',
    adjacent: 'Computer science supplies virtualization and control software; security engineering supplies tenant isolation and control-plane protection.',
    evidence: ['rfc8365'],
  },
  'NET-03': {
    classification: 'The controlled object is the packet path: explicit forwarding instructions constrained by topology and policy.',
    adjacent: 'Computer science supplies graph optimization and controller logic; security engineering protects the authority that programs paths.',
    evidence: ['rfc8402'],
  },
  'NET-04': {
    classification: 'The controlled object is end-to-end reachability across private, carrier, and cloud fabrics.',
    adjacent: 'Computer science owns service behavior above the path; security engineering owns identity, exposure, and cross-cloud trust.',
    evidence: ['nist207a'],
  },
  'NET-05': {
    classification: 'The controlled object is intended and observed network behavior across a live device estate.',
    adjacent: 'Computer science supplies models, compilers, and reconciliation; security engineering protects a highly privileged change system.',
    evidence: ['rfc8969'],
  },
  'NET-06': {
    classification: 'The controlled object is address-family reachability during a long-lived coexistence and migration program.',
    adjacent: 'Computer science owns application compatibility; security engineering must keep policy and visibility equivalent across both families.',
    evidence: ['rfc7381'],
  },
  'CS-01': {
    classification: 'The controlled object is replicated computation: machines must agree on a durable order and state.',
    adjacent: 'Networks supply an unreliable timing surface; security engineering changes the fault model when members may be malicious.',
    evidence: ['flp', 'raft'],
  },
  'CS-02': {
    classification: 'The controlled object is program meaning under interleaved execution and relaxed memory visibility.',
    adjacent: 'Hardware and operating systems realize the memory model; security engineering treats some races as exploitable primitives.',
    evidence: ['cppMemory', 'cs2023'],
  },
  'CS-03': {
    classification: 'The controlled object is computation and resource semantics at the hardware–application boundary.',
    adjacent: 'Network stacks live inside the kernel; security engineering depends on isolation and privilege boundaries being correct.',
    evidence: ['cs2023'],
  },
  'CS-04': {
    classification: 'The controlled object is data semantics: isolation, durability, ordering, replication, and recovery.',
    adjacent: 'Networks carry coordination messages; security engineering protects data authority and integrity.',
    evidence: ['spanner', 'cs2023'],
  },
  'CS-05': {
    classification: 'The controlled object is program semantics preserved through analysis and representation changes.',
    adjacent: 'Security engineering treats the toolchain as a trust boundary; operating systems and processors constrain generated behavior.',
    evidence: ['cs2023'],
  },
  'CS-06': {
    classification: 'The controlled object is a computational claim: specification, implementation, and proof of conformance.',
    adjacent: 'Security engineering chooses adversarial properties; network engineering can supply protocols and configurations to verify.',
    evidence: ['sel4', 'cs2023'],
  },
  'SEC-01': {
    classification: 'The controlled object is confidentiality, integrity, or authentication across an adversarial protocol and key lifecycle.',
    adjacent: 'Computer science supplies algorithms and implementations; networks transport protocol messages and expose traffic behavior.',
    evidence: ['nist57', 'nist160'],
  },
  'SEC-02': {
    classification: 'The controlled object is authority: which identity assertion may justify which action across trust domains.',
    adjacent: 'Computer science implements protocol and policy semantics; networks connect separately administered parties.',
    evidence: ['nist63c', 'nist162'],
  },
  'SEC-03': {
    classification: 'The controlled object is continuous access assurance across dynamic identities, workloads, services, and environments.',
    adjacent: 'Networks enforce and carry decisions; computer science supplies the policy, telemetry, and service machinery.',
    evidence: ['nist207a', 'nist160'],
  },
  'SEC-04': {
    classification: 'The controlled object is trust in software provenance and integrity from source through build, delivery, and operation.',
    adjacent: 'Computer science builds the toolchain; networks and platforms distribute the resulting artifacts.',
    evidence: ['nist218', 'nist160'],
  },
  'SEC-05': {
    classification: 'The controlled object is assurance during attack: infer, contain, eradicate, and recover from hostile activity.',
    adjacent: 'Networks and software supply telemetry, failure modes, and enforcement points.',
    evidence: ['nist61', 'nist160'],
  },
  'SEC-06': {
    classification: 'The controlled object is effective permission under composed identities, attributes, resources, policies, and delegation.',
    adjacent: 'Computer science implements policy evaluation; networks and cloud control planes enforce the result.',
    evidence: ['nist162', 'nist63c'],
  },
}

export const dimensionGuide = {
  depth: {
    question: 'How exact must the mental model be?',
    meaning: 'Theory, abstraction, semantics, mathematics, and the amount of precision needed before an implementation can be trusted.',
  },
  integration: {
    question: 'How many boundaries must cooperate?',
    meaning: 'The number and diversity of systems, teams, vendors, owners, protocols, and policy domains that must behave as one.',
  },
  state: {
    question: 'How quickly does the truth move?',
    meaning: 'How much behavior depends on changing, distributed, concurrent, delayed, or partially synchronized state.',
  },
  opacity: {
    question: 'How far is the symptom from the cause?',
    meaning: 'How difficult failures are to reproduce, observe, localize, and distinguish from other failures with similar symptoms.',
  },
  adversary: {
    question: 'Can someone adapt to the defense?',
    meaning: 'How much the problem changes when malicious actors can deceive, probe, exploit, or deliberately reshape system behavior.',
  },
}

export const conceptRationales = {
  'NET-01': {
    position: 'BGP lands high on both axes because formal path-vector behavior is composed with autonomous business policy across organizations. No authority installs one globally optimal answer; internet routing emerges from many locally reasonable decisions.',
    drivers: {
      depth: 'Path selection is ordered, attribute-rich, recursive, and policy dependent.',
      integration: 'Peers, carriers, registries, filters, routing security, and business relationships all influence the result.',
      state: 'Updates propagate asynchronously, and convergence changes which paths are valid from moment to moment.',
      opacity: 'An operator sees advertisements and outcomes, not the complete reasoning behind every remote decision.',
      adversary: 'Route hijacks matter, but accidental leaks and policy mistakes still account for much of the operating risk.',
    },
    investigate: ['Trace one prefix across import policy, best-path selection, and export policy.', 'Compare safeguards such as prefix filters, RPKI origin validation, and maximum-prefix limits.'],
  },
  'NET-02': {
    position: 'EVPN-VXLAN combines two networks at once: a routed underlay that provides transport and an overlay that creates tenant and endpoint semantics. Its score reflects the number of layers that can be locally healthy while the end-to-end service is not.',
    drivers: {
      depth: 'Engineers must reason about BGP EVPN routes, encapsulation, endpoint learning, and forwarding behavior together.',
      integration: 'Switches, hypervisors, gateways, routing policy, segmentation, and orchestration share responsibility.',
      state: 'Endpoint mobility and control-plane learning continuously change the forwarding picture.',
      opacity: 'Underlay reachability, overlay signaling, and policy failure can produce nearly identical symptoms.',
      adversary: 'Segmentation and control-plane protection matter, though accidental design and configuration faults dominate daily complexity.',
    },
    investigate: ['Follow one endpoint from local attachment through EVPN advertisement to remote decapsulation.', 'Separate underlay, overlay, and policy checks before interpreting a reachability symptom.'],
  },
  'NET-03': {
    position: 'Segment routing moves path choice from a side effect of routing metrics toward an explicit programmable instruction. That raises conceptual depth while preserving the live constraints of topology, capacity, latency, and failure recovery.',
    drivers: {
      depth: 'The design joins graph optimization, segment semantics, path computation, and forwarding constraints.',
      integration: 'IGP state, controllers, policy, hardware capabilities, and operational objectives must align.',
      state: 'The best path changes as utilization and topology change, often during the failure being mitigated.',
      opacity: 'A path can be syntactically valid while violating a capacity, latency, or protection objective elsewhere.',
      adversary: 'Security affects controller and policy integrity, but ordinary optimization and convergence are the larger source of difficulty.',
    },
    investigate: ['Compare the desired path, the computed segment list, and the forwarding behavior after a link failure.', 'Examine how the design trades optimality against controller dependence and fast local repair.'],
  },
  'NET-04': {
    position: 'Hybrid multi-cloud connectivity has a slightly lower abstraction score but one of the widest integration scores. The challenge is less a single difficult protocol than the composition of several providers, control models, address plans, and ownership boundaries.',
    drivers: {
      depth: 'Each mechanism is learnable, but their combined route, DNS, NAT, load-balancing, and failure semantics are not simple.',
      integration: 'On-premises networks, cloud fabrics, carriers, gateways, DNS, applications, and separate teams form one path.',
      state: 'Routes, endpoints, service health, and autoscaled resources change independently.',
      opacity: 'Telemetry and administrative authority often stop at the exact provider boundary where the fault lives.',
      adversary: 'Public edges and cross-cloud trust add meaningful exposure without making every incident adversarial.',
    },
    investigate: ['Draw both the packet path and the control path for one service request.', 'Identify which team can observe and change each hop before designing the escalation path.'],
  },
  'NET-05': {
    position: 'Network automation scores as an integration problem because it translates human intent into device behavior across a heterogeneous live estate. Automation reduces repetitive work, but it also converts a small modeling mistake into a consistent large-scale action.',
    drivers: {
      depth: 'Schemas, templates, validation, dependency ordering, and reconciliation require software-style reasoning.',
      integration: 'The source of truth, inventory, secrets, controllers, devices, pipelines, and approval process must agree.',
      state: 'Desired state and observed state drift, so the system must decide when and how to reconcile them.',
      opacity: 'A successful deployment can hide an incorrect model until traffic reaches an affected path.',
      adversary: 'Privileged automation credentials and pipelines are valuable targets, though faulty intent is the more common hazard.',
    },
    investigate: ['Separate syntax validation, semantic validation, and end-to-end behavioral validation.', 'Test whether rollback restores service state, not merely the previous configuration text.'],
  },
  'NET-06': {
    position: 'IPv6 transition is placed left of the hardest theoretical topics but high on integration because coexistence lasts for years. The hard system is the migration itself: two address families, translation mechanisms, policies, and application assumptions operating together.',
    drivers: {
      depth: 'Addressing, discovery, translation, extension behavior, and routing differ in important but bounded ways.',
      integration: 'Applications, DNS, security policy, monitoring, carriers, devices, and cloud services must migrate at different speeds.',
      state: 'The protocol state is familiar; most change comes from phased adoption and mixed client capability.',
      opacity: 'Fallback can conceal a broken IPv6 path by silently succeeding over IPv4.',
      adversary: 'Unmonitored IPv6 paths and inconsistent policy create exposure, but the central problem is coexistence.',
    },
    investigate: ['Measure IPv4 and IPv6 as separate service paths rather than one availability number.', 'Audit whether every security and observability control has equivalent coverage for both families.'],
  },
  'CS-01': {
    position: 'Consensus sits at the extreme of depth and dynamic state because independent machines must agree without a reliable shared clock. A design must preserve safety through partitions and restarts while still making progress when enough members are available.',
    drivers: {
      depth: 'Leader election, log agreement, quorum intersection, membership change, and durability depend on precise invariants.',
      integration: 'Storage, transport, timeouts, deployment, and client semantics turn the algorithm into a working system.',
      state: 'Every message, timeout, crash, restart, and partition changes the set of possible system states.',
      opacity: 'A rare interleaving may appear only during failure and disappear when the system is inspected.',
      adversary: 'The classic model assumes crash faults rather than hostile members, keeping this score below security protocols.',
    },
    investigate: ['State the safety property separately from the liveness property before evaluating behavior.', 'Walk through leader change and membership change while messages are delayed or duplicated.'],
  },
  'CS-02': {
    position: 'Concurrency is deep and opaque even when contained within one program. The difficulty comes from the enormous space of legal interleavings and from memory-order rules that differ across language, compiler, runtime, and processor.',
    drivers: {
      depth: 'Correctness depends on happens-before relationships, atomicity, visibility, and the chosen memory model.',
      integration: 'The boundary is narrower than cloud or network systems, though several abstraction layers still participate.',
      state: 'Thread schedules and memory visibility create a vast, nondeterministic state space.',
      opacity: 'Instrumentation changes timing, so the act of observing a race can make it disappear.',
      adversary: 'Most concurrency failures are accidental unless the race becomes an exploitable security primitive.',
    },
    investigate: ['Write the invariant and synchronization relationship rather than reasoning from one observed schedule.', 'Use stress, sanitizers, and model-based tests as complementary evidence, not as a proof of absence.'],
  },
  'CS-03': {
    position: 'Kernels and runtimes rank high across four axes because they mediate nearly every resource while operating close to hardware and privilege boundaries. Small mistakes can affect isolation, durability, performance, and security at once.',
    drivers: {
      depth: 'Scheduling, virtual memory, interrupts, filesystems, synchronization, and language runtimes each contain deep models.',
      integration: 'Hardware, drivers, processes, storage, networking, and user-space contracts meet at this layer.',
      state: 'Queues, caches, page tables, file state, and concurrent execution evolve continuously.',
      opacity: 'The visible application symptom may be caused by a resource interaction several layers below.',
      adversary: 'Privilege and isolation make implementation flaws security-relevant, though not every kernel problem assumes an attacker.',
    },
    investigate: ['Follow one operation across user space, system call, scheduler, driver, and hardware completion.', 'Distinguish a correctness invariant from a performance heuristic when interpreting behavior.'],
  },
  'CS-04': {
    position: 'Distributed transactions sit beside consensus because useful database guarantees combine ordering, durability, isolation, replication, and recovery. The apparent simplicity of a transaction hides decisions about what other clients may observe during failure.',
    drivers: {
      depth: 'Isolation levels, serializability, commit protocols, recovery, and replication require precise semantics.',
      integration: 'Storage engines, coordinators, networks, query planners, clients, and operational workflows share the guarantee.',
      state: 'Concurrent transactions and replicated copies create constantly changing dependencies.',
      opacity: 'An anomaly can depend on a rare interleaving and surface far from the transaction that caused it.',
      adversary: 'Integrity and access matter, but the core ranking focuses on crash, concurrency, and partition behavior.',
    },
    investigate: ['Define the exact isolation guarantee and the anomalies it permits before comparing performance.', 'Trace commit, acknowledgment, replication, and recovery for a transaction interrupted at each step.'],
  },
  'CS-05': {
    position: 'Compilers lead on conceptual depth because they preserve meaning while radically transforming representation. Their integration score is lower than multi-cloud systems, but the chain from language semantics to processor behavior still spans many exact contracts.',
    drivers: {
      depth: 'Parsing, type systems, intermediate representations, optimization, and code generation depend on formal semantics.',
      integration: 'Languages, libraries, runtimes, debuggers, ABIs, operating systems, and processors constrain the result.',
      state: 'Compilation is comparatively controlled; most complexity lies in representation and transformation rather than live distributed state.',
      opacity: 'An optimization defect can surface as a distant runtime behavior that is difficult to connect to the transformation.',
      adversary: 'Security matters for unsafe behavior and toolchain trust, but ordinary compiler correctness is not primarily adversarial.',
    },
    investigate: ['Compare source semantics with each intermediate representation rather than jumping straight to machine code.', 'Ask which assumptions make an optimization valid and whether the language actually guarantees them.'],
  },
  'CS-06': {
    position: 'Formal verification receives the maximum depth score because it forces both the system and the desired property into precise mathematical form. Its lower integration score reflects that proofs usually succeed by deliberately bounding the environment.',
    drivers: {
      depth: 'Specification, invariants, refinement, proof strategy, and model semantics leave little room for an approximate explanation.',
      integration: 'Real systems must be abstracted into a tractable model, reducing the number of directly represented boundaries.',
      state: 'State-space explosion matters, but the analysis often controls or abstracts the dynamics deliberately.',
      opacity: 'A proof can be valid while the model omits the implementation behavior that later fails.',
      adversary: 'Adversarial properties can be verified, but the method itself does not require an attacker in every use.',
    },
    investigate: ['Audit the assumptions and refinement boundary with the same care as the proof.', 'Separate properties proved about the model from evidence that the implementation conforms to it.'],
  },
  'SEC-01': {
    position: 'Cryptographic protocol and key lifecycle design sits in the hard corner because mathematical primitives, protocol state, implementation, operations, and an attacker all compose into one claim. A secure algorithm is only one dependency in that claim.',
    drivers: {
      depth: 'Security definitions, protocol transcripts, randomness, authentication, and composition demand exact reasoning.',
      integration: 'Applications, identity, key stores, hardware, certificates, rotation, revocation, backup, and recovery all participate.',
      state: 'Keys and sessions move through generation, distribution, use, rotation, expiration, revocation, and recovery.',
      opacity: 'A system can appear correct while leaking through side channels, misuse, poor randomness, or exceptional paths.',
      adversary: 'The design is evaluated specifically against actors who choose inputs and adapt to observed behavior.',
    },
    investigate: ['State the threat model and security property before selecting a primitive.', 'Trace the entire key lifecycle, especially recovery and revocation, rather than reviewing only encryption in use.'],
  },
  'SEC-02': {
    position: 'Identity federation ranks near the maximum for integration because authority crosses people, services, devices, directories, organizations, and time. Authentication may succeed perfectly while the authorization decision is stale or broader than intended.',
    drivers: {
      depth: 'Claims, delegation, policy evaluation, credential assurance, and revocation require precise trust semantics.',
      integration: 'Identity providers, relying parties, directories, devices, HR events, applications, and organizations exchange authority.',
      state: 'Roles, sessions, credentials, device posture, and employment status change on different schedules.',
      opacity: 'Effective access emerges from several systems, making stale or transitive authority difficult to see.',
      adversary: 'Credential theft, token replay, confused-deputy behavior, and privilege escalation directly target the trust chain.',
    },
    investigate: ['Trace one user and one workload from identity proofing through token issuance to the final policy decision.', 'Test revocation and role change as carefully as the initial successful login.'],
  },
  'SEC-03': {
    position: 'Zero-trust multi-cloud enforcement receives the maximum integration score because a decision must remain consistent across identity, workload, device, network, service, data, and telemetry systems that no single platform owns.',
    drivers: {
      depth: 'The ideas are understandable individually, but policy semantics and trust signals become subtle when composed.',
      integration: 'Users, workloads, identity providers, gateways, service meshes, clouds, endpoints, data controls, and analytics all contribute.',
      state: 'Identity, device posture, service location, threat signals, and policy can change during a session.',
      opacity: 'A denial and an unintended grant can each emerge from stale context or inconsistent enforcement at another layer.',
      adversary: 'The architecture assumes credentials, devices, workloads, or network positions may already be compromised.',
    },
    investigate: ['Follow one request from subject identity through policy decision to every enforcement point on the path.', 'Measure signal freshness, policy propagation, fallback behavior, and revocation latency.'],
  },
  'SEC-04': {
    position: 'Software supply-chain security is an integration-heavy trust problem: evidence must survive across source, dependencies, build systems, artifacts, registries, deployment, and runtime. One upstream compromise can inherit downstream trust at enormous scale.',
    drivers: {
      depth: 'Provenance, reproducibility, signing, dependency resolution, and isolation require careful technical models.',
      integration: 'Developers, repositories, third parties, CI systems, builders, registries, deployers, and runtime platforms form the chain.',
      state: 'Dependencies, build environments, credentials, and artifacts change continually, though not as quickly as incident response state.',
      opacity: 'A malicious or vulnerable component may remain dormant until a rare build or runtime condition activates it.',
      adversary: 'Attackers deliberately seek the least protected upstream step that grants the widest trusted distribution.',
    },
    investigate: ['Verify provenance as a chain of evidence rather than treating a signature as sufficient.', 'Ask which compromise each control prevents, detects, contains, or merely documents.'],
  },
  'SEC-05': {
    position: 'Detection and response reaches the maximum for state and opacity because the team must reconstruct a changing system from incomplete evidence while acting quickly enough to matter. The opponent can observe containment and change tactics.',
    drivers: {
      depth: 'The theory is less formal than cryptography, but good detection still requires causal reasoning, statistics, systems knowledge, and threat models.',
      integration: 'Endpoint, identity, cloud, network, application, threat intelligence, ticketing, and human decisions form one investigation.',
      state: 'Assets, sessions, alerts, attacker access, and containment actions change throughout the incident.',
      opacity: 'Telemetry is incomplete, noisy, delayed, normalized differently, and sometimes manipulated or destroyed.',
      adversary: 'The opponent actively avoids sensors, creates misleading evidence, and adapts to the response.',
    },
    investigate: ['Write the competing hypotheses and the evidence that would distinguish them.', 'Evaluate detections by coverage, fidelity, timeliness, and response consequence—not alert count alone.'],
  },
  'SEC-06': {
    position: 'Cloud IAM ranks at the top because effective permission is not stored in one place. It emerges from grants, denies, inheritance, federation, temporary credentials, resource policies, and organization controls evaluated together.',
    drivers: {
      depth: 'Policy languages, precedence, condition logic, delegation, and transitive access require exact semantics.',
      integration: 'Principals, resources, accounts, organizations, identity providers, services, automation, and secrets all affect access.',
      state: 'Temporary credentials, role assumptions, resource changes, and policy updates continually reshape effective permission.',
      opacity: 'The visible policy is not necessarily the effective policy, and unused privilege may remain hidden for months.',
      adversary: 'Attackers exploit legitimate permissions, delegation paths, credential theft, and gaps between administrative domains.',
    },
    investigate: ['Compute effective access from both the principal and resource directions.', 'Test escalation and lateral paths, then verify how quickly a compromised permission can be revoked.'],
  },
}

export const systemsConcepts = [
  {
    id: 'NET-01', field: 'network', name: 'BGP policy & convergence', short: 'BGP policy',
    depth: 8, integration: 10, state: 10, opacity: 9, adversary: 7,
    core: 'Independent networks exchange reachability while applying business policy and trying to avoid loops.',
    hard: 'No controller sees the whole internet. A locally valid preference can produce globally surprising paths, slow convergence, or a wide blast radius.',
  },
  {
    id: 'NET-02', field: 'network', name: 'EVPN–VXLAN fabric design', short: 'EVPN–VXLAN',
    depth: 8, integration: 9, state: 9, opacity: 8, adversary: 6,
    core: 'A control plane distributes endpoint reachability across a routed underlay while overlays preserve tenant segmentation.',
    hard: 'The failure may sit in the underlay, overlay, control plane, endpoint learning, or policy—even when the symptom looks identical.',
  },
  {
    id: 'NET-03', field: 'network', name: 'Segment routing & traffic engineering', short: 'Segment routing',
    depth: 9, integration: 8, state: 9, opacity: 8, adversary: 5,
    core: 'Paths become programmable instructions constrained by topology, capacity, latency, and fast reroute requirements.',
    hard: 'Optimization happens over a moving graph, and the control policy must remain safe through failures and reconvergence.',
  },
  {
    id: 'NET-04', field: 'network', name: 'Hybrid multi-cloud connectivity', short: 'Hybrid cloud',
    depth: 6, integration: 10, state: 9, opacity: 10, adversary: 7,
    core: 'Private networks, cloud fabrics, internet edges, DNS, load balancers, and overlapping ownership must act as one service path.',
    hard: 'Each provider exposes a different control model, and troubleshooting crosses boundaries where telemetry and authority disappear.',
  },
  {
    id: 'NET-05', field: 'network', name: 'Intent automation & source of truth', short: 'Network automation',
    depth: 7, integration: 9, state: 8, opacity: 8, adversary: 7,
    core: 'Declarative intent is translated into thousands of device-specific changes and reconciled against live state.',
    hard: 'The automation can be perfectly consistent and still encode the wrong intent—at machine speed and infrastructure scale.',
  },
  {
    id: 'NET-06', field: 'network', name: 'IPv6 transition & coexistence', short: 'IPv6 transition',
    depth: 6, integration: 9, state: 7, opacity: 8, adversary: 6,
    core: 'Dual-stack, translation, addressing, discovery, DNS, security policy, and application assumptions must coexist during migration.',
    hard: 'The transition is not one protocol swap; it is a long-lived compatibility system with two failure surfaces.',
  },
  {
    id: 'CS-01', field: 'computer', name: 'Distributed consensus & replication', short: 'Consensus',
    depth: 10, integration: 8, state: 10, opacity: 9, adversary: 2,
    core: 'Independent machines must agree on durable order despite delay, duplication, partition, restart, and partial failure.',
    hard: 'Timing cannot reliably distinguish a dead node from a slow one, yet safety and useful progress must both survive.',
  },
  {
    id: 'CS-02', field: 'computer', name: 'Concurrency & memory models', short: 'Concurrency',
    depth: 10, integration: 6, state: 10, opacity: 10, adversary: 3,
    core: 'Many operations interleave while hardware, compilers, runtimes, and languages expose different ordering guarantees.',
    hard: 'The number of possible schedules explodes, and rare races can vanish under observation.',
  },
  {
    id: 'CS-03', field: 'computer', name: 'Operating systems, kernels & runtimes', short: 'Kernels & runtimes',
    depth: 9, integration: 9, state: 9, opacity: 9, adversary: 6,
    core: 'Scheduling, virtual memory, I/O, isolation, filesystems, and hardware meet at the narrowest layer of the stack.',
    hard: 'Tiny mistakes cross privilege and process boundaries, while performance depends on invisible interactions below application code.',
  },
  {
    id: 'CS-04', field: 'computer', name: 'Database engines & distributed transactions', short: 'Transactions',
    depth: 9, integration: 9, state: 10, opacity: 9, adversary: 5,
    core: 'Storage, indexing, query planning, replication, isolation, and recovery must preserve useful semantics under load and failure.',
    hard: 'Every guarantee trades against latency, availability, coordination, and the shape of real workloads.',
  },
  {
    id: 'CS-05', field: 'computer', name: 'Compilers & static analysis', short: 'Compilers',
    depth: 9, integration: 7, state: 6, opacity: 8, adversary: 4,
    core: 'Human intent is transformed through parsing, semantics, optimization, code generation, and machine execution.',
    hard: 'An optimization must change the program radically without changing what the program means.',
  },
  {
    id: 'CS-06', field: 'computer', name: 'Formal methods & verification', short: 'Formal verification',
    depth: 10, integration: 6, state: 7, opacity: 8, adversary: 4,
    core: 'A system and its required properties are expressed precisely enough for proofs or exhaustive model exploration.',
    hard: 'The proof can only be as meaningful as the model, while real systems resist being reduced without losing important behavior.',
  },
  {
    id: 'SEC-01', field: 'security', name: 'Cryptographic protocol & key lifecycle', short: 'Crypto & keys',
    depth: 10, integration: 9, state: 8, opacity: 9, adversary: 10,
    core: 'Algorithms, protocol states, identities, randomness, storage, rotation, revocation, and recovery form one trust system.',
    hard: 'Sound primitives still fail through composition, implementation, side channels, key handling, or a mistaken threat model.',
  },
  {
    id: 'SEC-02', field: 'security', name: 'Identity federation & authorization', short: 'Identity federation',
    depth: 8, integration: 10, state: 9, opacity: 9, adversary: 10,
    core: 'People, services, devices, credentials, claims, roles, policies, and organizations exchange authority across trust boundaries.',
    hard: 'Authentication answers who; authorization answers what, where, when, and why—and stale authority is often invisible.',
  },
  {
    id: 'SEC-03', field: 'security', name: 'Zero-trust multi-cloud enforcement', short: 'Zero-trust cloud',
    depth: 7, integration: 10, state: 9, opacity: 9, adversary: 10,
    core: 'Identity-aware policy must follow users, workloads, data, devices, gateways, and services across on-premises and cloud environments.',
    hard: 'A consistent decision depends on fresh identity, posture, telemetry, network context, and enforcement that no single platform owns.',
  },
  {
    id: 'SEC-04', field: 'security', name: 'Software supply-chain security', short: 'Supply chain',
    depth: 7, integration: 10, state: 8, opacity: 9, adversary: 10,
    core: 'Source, dependencies, builders, artifacts, registries, deployment, provenance, and runtime must preserve an evidence chain.',
    hard: 'Trust crosses many organizations and tools; one compromised upstream component can inherit downstream privilege at scale.',
  },
  {
    id: 'SEC-05', field: 'security', name: 'Detection engineering & incident response', short: 'Detection & response',
    depth: 7, integration: 10, state: 10, opacity: 10, adversary: 10,
    core: 'Telemetry from endpoints, identity, cloud, applications, and networks must become a defensible story quickly enough to act.',
    hard: 'The evidence is incomplete, the system keeps changing, and the opponent can observe and adapt to the response.',
  },
  {
    id: 'SEC-06', field: 'security', name: 'Cloud IAM & policy composition', short: 'Cloud IAM',
    depth: 8, integration: 10, state: 9, opacity: 10, adversary: 10,
    core: 'Grants, denies, inheritance, resource policy, federation, temporary credentials, and service identities compose into effective access.',
    hard: 'The real permission is an emergent result of policies scattered across principals, resources, accounts, and organizations.',
  },
]

export const integrationJunctions = [
  {
    rank: '01',
    name: 'Identity-aware multi-cloud runtime',
    verdict: 'The widest integration surface',
    description: 'Deliver one service across on-premises and multiple clouds while every request is routed, replicated, authenticated, authorized, encrypted, observed, and revocable.',
    network: 'BGP, DNS, service paths, load balancing, overlays',
    computer: 'Distributed state, orchestration, APIs, failure recovery',
    security: 'Workload identity, policy, keys, posture, telemetry',
    failure: 'A valid identity reaches the wrong path, or the right path enforces stale policy.',
    why: 'This ranks first on integration breadth because the request crosses every control domain in the atlas: routing establishes a path, distributed software establishes service state, and security establishes authority. None of those answers remains valid for long, and no provider owns the complete transaction.',
    tradeoff: 'More context produces a finer trust decision, but it also adds dependencies, latency, propagation delay, and more ways for stale data to deny good traffic or admit bad traffic.',
    checks: ['Can one request be traced from identity proof to final enforcement?', 'How quickly do policy, posture, route, and revocation changes become effective?', 'What is the safe behavior when one context source is unavailable?'],
  },
  {
    rank: '02',
    name: 'High-assurance network automation',
    verdict: 'The fastest blast radius',
    description: 'Turn intent into coordinated changes across a live estate without converting a modeling error into a global outage or policy bypass.',
    network: 'Topology, protocol dependencies, convergence, rollback',
    computer: 'Schemas, compilers, transactions, reconciliation loops',
    security: 'Change authority, secret handling, validation, auditability',
    failure: 'The controller is consistent, the deployment succeeds, and the intent is still wrong.',
    why: 'This ranks second because it converts abstract intent into privileged action across a large live system. The distinctive risk is speed: a human mistake that once affected one device can now propagate everywhere before an operator sees the first symptom.',
    tradeoff: 'Centralization improves consistency and auditability, but concentrates authority and blast radius. Stronger gates reduce risk while slowing the change system that automation was introduced to accelerate.',
    checks: ['Does validation test expected traffic behavior, not only configuration syntax?', 'Can deployment stop on partial evidence and roll back to a known service state?', 'Are authority, secrets, approvals, and audit evidence separated?'],
  },
  {
    rank: '03',
    name: 'Resilient edge & operational control',
    verdict: 'The hardest recovery constraint',
    description: 'Keep latency-sensitive physical operations safe through intermittent links, constrained compute, legacy protocols, and hostile access attempts.',
    network: 'Deterministic paths, segmentation, wireless, failover',
    computer: 'Real-time behavior, edge state, device software, queues',
    security: 'Device trust, least privilege, monitoring, safe containment',
    failure: 'Isolation preserves security but interrupts the physical process it was meant to protect.',
    why: 'This ranks third because its recovery objective is unusually constrained: the safe cyber action may be unsafe for the physical process. Legacy devices, intermittent links, and real-time requirements narrow the set of controls that can be applied during an incident.',
    tradeoff: 'Isolation limits attacker movement but can remove visibility or control. Availability preserves the process but can prolong exposure, so containment must be designed around physical safety rather than generic IT defaults.',
    checks: ['Which physical states remain safe when connectivity or central control disappears?', 'Can local operation authenticate and authorize without permanent cloud reachability?', 'Does containment preserve the minimum sensing and control path required for safety?'],
  },
  {
    rank: '04',
    name: 'Global service delivery under attack',
    verdict: 'The most adaptive operating problem',
    description: 'Maintain availability and correctness while traffic shifts, dependencies degrade, software changes, and an adversary deliberately probes the response.',
    network: 'Anycast, traffic engineering, DDoS controls, capacity',
    computer: 'Caching, consistency, graceful degradation, observability',
    security: 'Abuse detection, rate policy, response, threat intelligence',
    failure: 'The mitigation removes malicious load and the remaining dependency collapses under the redirected good traffic.',
    why: 'This ranks fourth not because it is easy, but because its boundaries are more familiar and its controls are often practiced at scale. It remains uniquely adaptive: traffic engineering, software degradation, and abuse controls alter the environment the attacker is observing.',
    tradeoff: 'Aggressive mitigation protects capacity but increases false positives and pushes traffic toward other bottlenecks. Permissive handling protects legitimate users until the shared resource becomes unavailable to everyone.',
    checks: ['What dependency receives the traffic displaced by each mitigation?', 'Can good and bad traffic be separated using signals that remain reliable under pressure?', 'Which service functions degrade first, and are those choices encoded before the event?'],
  },
]

export function dimensionAverage(field, key) {
  const rows = systemsConcepts.filter((concept) => concept.field === field)
  return rows.reduce((sum, concept) => sum + concept[key], 0) / rows.length
}
