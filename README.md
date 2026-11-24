# Capacity Ledger

A small in-memory JavaScript library for tracking reservations against a fixed capacity. It has no third-party dependencies, persistence, network access or background processes.

```js
import { CapacityLedger } from './src/ledger.js';

const ledger = new CapacityLedger(5);
ledger.reserve('booking-1', 2); // { status: 'reserved' }
ledger.available(); // 3
ledger.cancel('booking-1'); // { status: 'cancelled' }
```

The [public contract](docs/contracts.md) is authoritative. [Design notes](docs/design-notes.md) explain the current representation and a few historical decisions. See [CONTRIBUTING.md](CONTRIBUTING.md) to run the tests.
