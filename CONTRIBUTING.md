# Contributing

Use Node.js 22 or later. No dependency installation is required.

```sh
npm test
```

The tests use Node's built-in test runner and deterministic fixtures. Keep changes local and reproducible. When changing reservation behavior, check both the returned status and the full observable ledger state. Public behavior is governed by `docs/contracts.md`; historical notes are not additional requirements.

## Investigation instruments

For reviewed Farm Hunter and Gardener calibration, the local test instruments are `node --version`, `npm test`, and `node --test farm-probe.test.js`, subject to the native workflow's tool permissions. Use Node.js 22 or later. Run the unchanged baseline suite first. Verify the test entry point and inspected source before execution; do not install dependencies, contact external services, or change the package scripts or production source. If a required tool or runtime is unavailable, record the limitation.

A focused experiment may create one transient root-level `farm-probe.test.js` if that filename is unused. Use only the public library interface, deterministic inputs and Node's built-in test and assertion modules. Derive expectations independently from the applicable public contract. No network, child processes, secret access, or unrelated filesystem operations are in scope. Keep the probe out of the committed tree. Record its full reproducible contents, command, observed outcome and limitations in the sanitized investigation report. If the result is known from earlier observations, classify it as confirmation or new evidence, not an independent discovery.
