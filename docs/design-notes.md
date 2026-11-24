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

Gardener's [first record](https://github.com/grove/farm-example/actions/runs/45504154692/artifacts/14972316773) mentioned a duplicated calculation but deferred structural analysis while investigating the known boundary defect. Its proposed simplification is not accepted or verified yet. The next structural review should assess one responsibility or reasoning burden, compare keeping the present design with a simpler alternative, and identify the exact preservation obligations. It may use read-only evidence; any dynamic verification still required must be recorded as unexecuted if unavailable. The known boundary discrepancy is a separate correctness matter, not an instruction to implement a fix.
