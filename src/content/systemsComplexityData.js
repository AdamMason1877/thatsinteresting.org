export const disciplineMeta = {
  network: {
    name: 'Network engineering',
    short: 'NET',
    color: '#70e1ff',
    thesis: 'Coordinate paths through hardware, policy, distance, and partial failure.',
    nativeDifficulty: 'Global behavior from local decisions',
  },
  computer: {
    name: 'Computer science',
    short: 'CS',
    color: '#d9ff5b',
    thesis: 'Make abstractions remain correct as state, scale, and concurrency multiply.',
    nativeDifficulty: 'Correctness across abstraction layers',
  },
  security: {
    name: 'Security engineering',
    short: 'SEC',
    color: '#e8a8ff',
    thesis: 'Preserve guarantees when people, systems, and an adaptive opponent interact.',
    nativeDifficulty: 'Assurance against an active adversary',
  },
}

export const complexityDimensions = [
  { key: 'depth', label: 'Conceptual depth' },
  { key: 'integration', label: 'Integration span' },
  { key: 'state', label: 'Dynamic state' },
  { key: 'opacity', label: 'Failure opacity' },
  { key: 'adversary', label: 'Adversarial pressure' },
]

export const systemsConcepts = [
  {
    id: 'NET-01', field: 'network', name: 'BGP policy & convergence', short: 'BGP policy',
    depth: 9.1, integration: 9.5, state: 9.7, opacity: 9.2, adversary: 7.1, consequence: 10,
    core: 'Independent networks exchange reachability while applying business policy and trying to avoid loops.',
    hard: 'No controller sees the whole internet. A locally valid preference can produce globally surprising paths, slow convergence, or a wide blast radius.',
  },
  {
    id: 'NET-02', field: 'network', name: 'EVPN–VXLAN fabric design', short: 'EVPN–VXLAN',
    depth: 8.4, integration: 9.2, state: 8.8, opacity: 8.4, adversary: 6.8, consequence: 8,
    core: 'A control plane distributes endpoint reachability across a routed underlay while overlays preserve tenant segmentation.',
    hard: 'The failure may sit in the underlay, overlay, control plane, endpoint learning, or policy—even when the symptom looks identical.',
  },
  {
    id: 'NET-03', field: 'network', name: 'Segment routing & traffic engineering', short: 'Segment routing',
    depth: 8.9, integration: 8.8, state: 9.0, opacity: 8.6, adversary: 6.5, consequence: 9,
    core: 'Paths become programmable instructions constrained by topology, capacity, latency, and fast reroute requirements.',
    hard: 'Optimization happens over a moving graph, and the control policy must remain safe through failures and reconvergence.',
  },
  {
    id: 'NET-04', field: 'network', name: 'Hybrid multi-cloud connectivity', short: 'Hybrid cloud',
    depth: 8.0, integration: 9.8, state: 8.6, opacity: 9.2, adversary: 7.8, consequence: 9,
    core: 'Private networks, cloud fabrics, internet edges, DNS, load balancers, and overlapping ownership must act as one service path.',
    hard: 'Each provider exposes a different control model, and troubleshooting crosses boundaries where telemetry and authority disappear.',
  },
  {
    id: 'NET-05', field: 'network', name: 'Intent automation & source of truth', short: 'Network automation',
    depth: 7.9, integration: 9.4, state: 8.3, opacity: 8.9, adversary: 7.2, consequence: 9,
    core: 'Declarative intent is translated into thousands of device-specific changes and reconciled against live state.',
    hard: 'The automation can be perfectly consistent and still encode the wrong intent—at machine speed and infrastructure scale.',
  },
  {
    id: 'NET-06', field: 'network', name: 'IPv6 transition & coexistence', short: 'IPv6 transition',
    depth: 7.6, integration: 9.1, state: 7.8, opacity: 8.8, adversary: 6.8, consequence: 8,
    core: 'Dual-stack, translation, addressing, discovery, DNS, security policy, and application assumptions must coexist during migration.',
    hard: 'The transition is not one protocol swap; it is a long-lived compatibility system with two failure surfaces.',
  },
  {
    id: 'CS-01', field: 'computer', name: 'Distributed consensus & replication', short: 'Consensus',
    depth: 9.9, integration: 9.0, state: 10.0, opacity: 9.7, adversary: 5.6, consequence: 10,
    core: 'Independent machines must agree on durable order despite delay, duplication, partition, restart, and partial failure.',
    hard: 'Timing cannot reliably distinguish a dead node from a slow one, yet safety and useful progress must both survive.',
  },
  {
    id: 'CS-02', field: 'computer', name: 'Concurrency & memory models', short: 'Concurrency',
    depth: 9.8, integration: 7.8, state: 9.8, opacity: 9.8, adversary: 4.8, consequence: 8,
    core: 'Many operations interleave while hardware, compilers, runtimes, and languages expose different ordering guarantees.',
    hard: 'The number of possible schedules explodes, and rare races can vanish under observation.',
  },
  {
    id: 'CS-03', field: 'computer', name: 'Operating systems, kernels & runtimes', short: 'Kernels & runtimes',
    depth: 9.4, integration: 9.1, state: 9.3, opacity: 9.4, adversary: 6.5, consequence: 10,
    core: 'Scheduling, virtual memory, I/O, isolation, filesystems, and hardware meet at the narrowest layer of the stack.',
    hard: 'Tiny mistakes cross privilege and process boundaries, while performance depends on invisible interactions below application code.',
  },
  {
    id: 'CS-04', field: 'computer', name: 'Database engines & distributed transactions', short: 'Transactions',
    depth: 9.5, integration: 9.4, state: 9.8, opacity: 9.6, adversary: 5.8, consequence: 10,
    core: 'Storage, indexing, query planning, replication, isolation, and recovery must preserve useful semantics under load and failure.',
    hard: 'Every guarantee trades against latency, availability, coordination, and the shape of real workloads.',
  },
  {
    id: 'CS-05', field: 'computer', name: 'Compilers & static analysis', short: 'Compilers',
    depth: 9.6, integration: 8.6, state: 7.4, opacity: 9.0, adversary: 5.0, consequence: 8,
    core: 'Human intent is transformed through parsing, semantics, optimization, code generation, and machine execution.',
    hard: 'An optimization must change the program radically without changing what the program means.',
  },
  {
    id: 'CS-06', field: 'computer', name: 'Formal methods & verification', short: 'Formal verification',
    depth: 10.0, integration: 7.7, state: 7.1, opacity: 8.6, adversary: 4.6, consequence: 9,
    core: 'A system and its required properties are expressed precisely enough for proofs or exhaustive model exploration.',
    hard: 'The proof can only be as meaningful as the model, while real systems resist being reduced without losing important behavior.',
  },
  {
    id: 'SEC-01', field: 'security', name: 'Cryptographic protocol & key lifecycle', short: 'Crypto & keys',
    depth: 9.8, integration: 9.2, state: 8.8, opacity: 9.7, adversary: 10.0, consequence: 10,
    core: 'Algorithms, protocol states, identities, randomness, storage, rotation, revocation, and recovery form one trust system.',
    hard: 'Sound primitives still fail through composition, implementation, side channels, key handling, or a mistaken threat model.',
  },
  {
    id: 'SEC-02', field: 'security', name: 'Identity federation & authorization', short: 'Identity federation',
    depth: 8.9, integration: 9.9, state: 9.2, opacity: 9.5, adversary: 9.8, consequence: 10,
    core: 'People, services, devices, credentials, claims, roles, policies, and organizations exchange authority across trust boundaries.',
    hard: 'Authentication answers who; authorization answers what, where, when, and why—and stale authority is often invisible.',
  },
  {
    id: 'SEC-03', field: 'security', name: 'Zero-trust multi-cloud enforcement', short: 'Zero-trust cloud',
    depth: 8.8, integration: 10.0, state: 9.1, opacity: 9.6, adversary: 9.9, consequence: 10,
    core: 'Identity-aware policy must follow users, workloads, data, devices, gateways, and services across on-premises and cloud environments.',
    hard: 'A consistent decision depends on fresh identity, posture, telemetry, network context, and enforcement that no single platform owns.',
  },
  {
    id: 'SEC-04', field: 'security', name: 'Software supply-chain security', short: 'Supply chain',
    depth: 8.5, integration: 10.0, state: 8.6, opacity: 9.5, adversary: 10.0, consequence: 10,
    core: 'Source, dependencies, builders, artifacts, registries, deployment, provenance, and runtime must preserve an evidence chain.',
    hard: 'Trust crosses many organizations and tools; one compromised upstream component can inherit downstream privilege at scale.',
  },
  {
    id: 'SEC-05', field: 'security', name: 'Detection engineering & incident response', short: 'Detection & response',
    depth: 8.2, integration: 9.6, state: 10.0, opacity: 10.0, adversary: 10.0, consequence: 10,
    core: 'Telemetry from endpoints, identity, cloud, applications, and networks must become a defensible story quickly enough to act.',
    hard: 'The evidence is incomplete, the system keeps changing, and the opponent can observe and adapt to the response.',
  },
  {
    id: 'SEC-06', field: 'security', name: 'Cloud IAM & policy composition', short: 'Cloud IAM',
    depth: 9.0, integration: 9.9, state: 9.4, opacity: 9.8, adversary: 9.9, consequence: 10,
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
  },
]

export function dimensionAverage(field, key) {
  const rows = systemsConcepts.filter((concept) => concept.field === field)
  return rows.reduce((sum, concept) => sum + concept[key], 0) / rows.length
}

