# Design notes

The current implementation stores active reservations in a Map keyed by ID. Insertion order is part of the public snapshot format. Reserve and cancel intentionally report different statuses for an already-present and an already-absent ID: the two operations serve different callers and retry policies.

## Historical alternatives (not current contracts)

An early sketch considered holding one unit in reserve as a buffer. That sketch was not adopted; consult the current public contract for capacity boundaries. The project has not yet specified a persistent storage format or cross-process coordination, and neither is in scope.

## Reviewed observations

These are source-linked observations, not additional contracts. The public contract remains authoritative. Recheck affected files and scope when the baseline changes.

### Exact-fit reservation boundary

**Status:** reproduced by the maintainer-side review; implementation correction deferred for the reference project's evaluation. Do not treat the issue as fixed or claim it as a new discovery without new evidence.

Source: [Hunter run 45502751464](https://github.com/grove/farm-example/actions/runs/45502751464), [Gardener run 45504154692](https://github.com/grove/farm-example/actions/runs/45504154692), both at [`d1e427c`](https://github.com/grove/farm-example/commit/d1e427c621dc140d8795070349debedbca2bb98e). The agent reports were static for this boundary: the exact probe command did not execute. Gardener did run the unchanged baseline suite, which passed all five tests.

Independent review outside the agent sandbox used Node.js 22.16.0 and a disposable copy of the source, tests, package manifest, contracts and design notes with Git blob hashes matching that revision. `npm test` passed 5/5. A separate public-API check found the following:

| Setup (capacity 5) | New reservation | Expected status / remaining | Observed status / remaining |
| --- | --- | --- | --- |
| Empty | b: 5 | reserved / 0 | insufficient / 5 |
| a: 2 | b: 3 | reserved / 0 | insufficient / 3 |
| a: 2 | b: 4 | insufficient / 3 | insufficient / 3 |
| a: 2 | b: 2 | reserved / 1 | reserved / 1 |

Both exact-fit cases violated the contract; both controls passed. Rejected requests left the prior state unchanged. The applicable rule is in [Reservations](contracts.md#reservations), and the relevant implementation is `reserve()` in [src/ledger.js](../src/ledger.js). The previous buffer sketch does not override that rule.

A maintainer can reproduce the observations in a disposable checkout of the cited revision using the following public-API check. This is review evidence, not an additional approved agent command.

```sh
node --input-type=module <<'EOF'
import { CapacityLedger } from './src/ledger.js';
for (const [initial, qty] of [[0, 5], [2, 3], [2, 4], [2, 2]]) {
  const ledger = new CapacityLedger(5);
  if (initial) ledger.reserve('a', initial);
  const before = ledger.snapshot();
  const result = ledger.reserve('b', qty);
  console.log(JSON.stringify({ initial, qty, before, result, after: ledger.snapshot() }));
}
EOF
```

Compare the returned status and complete snapshots with the contract and the table above. The existing test suite is not sufficient evidence of the exact-fit behavior. No production or test file was changed in the review.

### Structural investigation disposition

**Proposed review disposition: retain the current implementation for now; revisit on material divergence or maintenance burden.**

[Gardener run 45506019076](https://github.com/grove/farm-example/actions/runs/45506019076), at [`81dca50`](https://github.com/grove/farm-example/commit/81dca5064334c373f8d353537c4e7df93a023e28), followed the retained boundary observation and investigated the distinct structural concern that the [first Gardener run](https://github.com/grove/farm-example/actions/runs/45504154692) had deferred. Its [delivered investigation record](https://github.com/grove/farm-example/actions/runs/45506019076/artifacts/14972224870) and staged proposal identify the duplicated summation of active reservations in `available()` and `snapshot()` in [src/ledger.js](../src/ledger.js).

The duplication is real but small. A private shared calculation is a plausible future simplification if maintenance evidence warrants it. Directly invoking the public `available()` method from `snapshot()` would also introduce a new dynamic-dispatch dependency on that method; the contract does not settle the supported extension/override behavior. Do not silently assume those alternatives are equivalent. Retaining the present two short calculations is proportionate to the current evidence.

Any future change must preserve the public snapshot shape, insertion order, detached entry pairs, capacity conservation, validation, rejection behavior and intentionally distinct reservation/cancellation outcomes. Establish expected states from the public contract rather than only comparing two paths that share the same calculation. Treat the known exact-fit defect as a separate correctness change.

The agent reported 5/5 baseline tests passing and explicitly did not implement or test a refactoring. The runtime log shows a compound `npm test` command piped to `tail` rather than the documented standalone command; its successful shell exit is not independent proof of the test process exit status. The Node version was not verified. No behavioral-equivalence claim or new issue publication is accepted from this review.

Revisit this disposition if either calculation changes, evidence of divergence appears, a relevant extension contract is clarified, or recurring maintenance cost justifies the simplification. A later investigation should use this decision rather than restage the same proposal without new evidence.
