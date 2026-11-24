# Public contract

## Capacity

A ledger is created with a nonnegative safe integer capacity. Invalid capacity throws `RangeError`. Quantities are positive safe integers; invalid quantities throw `RangeError` without changing the state. Reservation IDs are nonempty strings and are compared exactly, including case; invalid IDs throw `TypeError` without changing the state.

## Reservations

- Reserving a new ID succeeds if its quantity is at most the available capacity, including equality. The result is `{ status: 'reserved' }`.
- An existing ID is rejected as `{ status: 'duplicate' }`. This prevents an accidental second booking. Duplicate checks precede capacity checks after input validation.
- An otherwise valid request beyond available capacity returns `{ status: 'insufficient' }`.
- Neither rejection changes the ledger's state.

## Cancellation

Cancelling an existing ID releases its entire quantity and returns `{ status: 'cancelled' }`. A subsequent or unknown cancellation returns `{ status: 'absent' }` and changes nothing. Cancellation is deliberately safe to retry; reservation is not an idempotent success operation.

## Observation

`available()` returns capacity minus the sum of active reservations. `snapshot()` returns `{ capacity, available, reservations }`; reservations are `[id, quantity]` pairs in insertion order. The result is detached: modifying a returned snapshot cannot change the ledger. All externally observable states conserve capacity and have nonnegative availability.
