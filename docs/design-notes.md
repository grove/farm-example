# Design notes

The current implementation stores active reservations in a Map keyed by ID. Insertion order is part of the public snapshot format. Reserve and cancel intentionally report different statuses for an already-present and an already-absent ID: the two operations serve different callers and retry policies.

## Historical alternatives (not current contracts)

An early sketch considered holding one unit in reserve as a buffer. That sketch was not adopted; consult the current public contract for capacity boundaries. The project has not yet specified a persistent storage format or cross-process coordination, and neither is in scope.
