function validateId(id) {
  if (typeof id !== 'string' || id.length === 0) throw new TypeError('invalid id');
}

function validateQuantity(quantity) {
  if (!Number.isSafeInteger(quantity) || quantity <= 0) throw new RangeError('invalid quantity');
}

export class CapacityLedger {
  #capacity;
  #reservations = new Map();

  constructor(capacity) {
    if (!Number.isSafeInteger(capacity) || capacity < 0) throw new RangeError('invalid capacity');
    this.#capacity = capacity;
  }

  reserve(id, quantity) {
    validateId(id);
    validateQuantity(quantity);
    if (this.#reservations.has(id)) return { status: 'duplicate' };
    if (quantity >= this.available()) return { status: 'insufficient' };
    this.#reservations.set(id, quantity);
    return { status: 'reserved' };
  }

  cancel(id) {
    validateId(id);
    if (!this.#reservations.has(id)) return { status: 'absent' };
    this.#reservations.delete(id);
    return { status: 'cancelled' };
  }

  available() {
    let used = 0;
    for (const quantity of this.#reservations.values()) used += quantity;
    return this.#capacity - used;
  }

  snapshot() {
    let occupied = 0;
    for (const [id, quantity] of this.#reservations.entries()) occupied += quantity;
    return {
      capacity: this.#capacity,
      available: this.#capacity - occupied,
      reservations: Array.from(this.#reservations.entries()),
    };
  }
}
