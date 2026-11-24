import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CapacityLedger } from '../src/ledger.js';

test('reserves capacity and rejects requests beyond the limit', () => {
  const ledger = new CapacityLedger(5);
  assert.deepEqual(ledger.reserve('a', 3), { status: 'reserved' });
  assert.deepEqual(ledger.reserve('b', 3), { status: 'insufficient' });
  assert.equal(ledger.available(), 2);
});

test('duplicate reservation does not consume capacity', () => {
  const ledger = new CapacityLedger(10);
  ledger.reserve('a', 2);
  const before = ledger.snapshot();
  assert.deepEqual(ledger.reserve('a', 3), { status: 'duplicate' });
  assert.deepEqual(ledger.snapshot(), before);
});

test('cancellation releases capacity and is safe to retry', () => {
  const ledger = new CapacityLedger(10);
  ledger.reserve('a', 3);
  assert.deepEqual(ledger.cancel('a'), { status: 'cancelled' });
  assert.deepEqual(ledger.cancel('a'), { status: 'absent' });
  assert.deepEqual(ledger.snapshot(), { capacity: 10, available: 10, reservations: [] });
});

test('snapshot is detached and preserves insertion order', () => {
  const ledger = new CapacityLedger(10);
  ledger.reserve('A', 2);
  ledger.reserve('a', 3);
  const snapshot = ledger.snapshot();
  assert.deepEqual(snapshot, { capacity: 10, available: 5, reservations: [['A', 2], ['a', 3]] });
  snapshot.reservations[0][1] = 99;
  snapshot.reservations.push(['external', 1]);
  assert.deepEqual(ledger.snapshot(), { capacity: 10, available: 5, reservations: [['A', 2], ['a', 3]] });
});

test('invalid inputs are rejected before mutating state', () => {
  assert.throws(() => new CapacityLedger(-1), RangeError);
  const ledger = new CapacityLedger(5);
  const before = ledger.snapshot();
  assert.throws(() => ledger.reserve('a', 0), RangeError);
  assert.throws(() => ledger.reserve('', 1), TypeError);
  assert.throws(() => ledger.reserve('a', 1.5), RangeError);
  assert.deepEqual(ledger.snapshot(), before);
});
