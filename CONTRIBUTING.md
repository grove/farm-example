# Contributing

Use Node.js 22 or later. No dependency installation is required.

```sh
npm test
```

The tests use Node's built-in test runner and deterministic fixtures. Keep changes local and reproducible. When changing reservation behavior, check both the returned status and the full observable ledger state. Public behavior is governed by `docs/contracts.md`; historical notes are not additional requirements.
