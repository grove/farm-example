# Contributing

Use Node.js 22 or later. No dependency installation is required.

```sh
npm test
```

The tests use Node's built-in test runner and deterministic fixtures. Keep changes local and reproducible. When changing reservation behavior, check both the returned status and the full observable ledger state. Public behavior is governed by `docs/contracts.md`; historical notes are not additional requirements.

## Investigation instruments

For reviewed Farm Hunter and Gardener calibration, the local test instruments are `node --version`, `npm test`, and `node --test farm-probe.test.js`, subject to the native workflow's tool permissions. Use Node.js 22 or later. Run the unchanged baseline suite first. Verify the test entry point and inspected source before execution; do not install dependencies, contact external services, or change the package scripts or production source. If a required tool or runtime is unavailable, record the limitation.

A focused experiment may create one transient root-level `farm-probe.test.js` if that filename is unused. Use only the public library interface, deterministic inputs and Node's built-in test and assertion modules. Derive expectations independently from the applicable public contract. No network, child processes, secret access, or unrelated filesystem operations are in scope. Keep the probe out of the committed tree. Record its full reproducible contents, command, observed outcome and limitations in the sanitized investigation report. If the result is known from earlier observations, classify it as confirmation or new evidence, not an independent discovery.

### Running the approved instruments

Each command must be issued as a separate, literal shell tool call from the checked-out workspace root. Do not prepend `cd`, concatenate commands, add pipes or redirections, append cleanup commands, or replace a denied command with a different executable. Use the shell tool's working-directory parameter if available rather than a shell prefix. The native Copilot allowlist is command-sensitive, and a compound command containing an unauthorized segment is not approved.

1. Run `pwd` alone to verify that the shell is at the checkout root. If it is not, use the supported working-directory parameter or report the blocker; do not request or work around additional authority.
2. Run `node --version` alone and verify Node.js 22 or later.
3. Run `npm test` alone, before creating any probe. Record the baseline outcome, including failures.
4. If a focused probe is appropriate, create the one transient `farm-probe.test.js` using the edit tool and then run `node --test farm-probe.test.js` alone. Capture the full test source, actual outcome and negative control in the report.
5. Use `git status --short` alone if necessary to account for local changes. Leave disposable files for runner cleanup; do not invoke `rm` or commit them.

Check relevant prior findings before claiming novelty. If an exact approved command is still denied or its prerequisites are missing, retain the observed limitation and report incomplete. Do not infer that an approved executable is unavailable solely from rejection of a different compound command.
