# Contributing

Use Node.js 22 or later. No dependency installation is required.

```sh
npm test
```

The tests use Node's built-in test runner and deterministic fixtures. Keep changes local and reproducible. When changing reservation behavior, check both the returned status and the full observable ledger state. Public behavior is governed by `docs/contracts.md`; historical notes are not additional requirements.

## Investigation instruments

Choose the investigation question before choosing an instrument. The role's mission determines the question; the availability of a test command does not make running it mandatory.

- Hunter investigates correctness and the quality of evidence. Read the applicable contract, implementation, prior findings and tests; select an experiment only when it adds evidence.
- Gardener investigates a responsibility, reasoning burden or preservation obligation. Start with structure and public behavior; an existing correctness concern can constrain a simplification but does not need to be rediscovered or experimentally resolved to analyze the structure. A supported no-change decision is useful.
- Check [reviewed observations in the design notes](docs/design-notes.md#reviewed-observations) before selecting a question. Verify the cited revision and affected paths against the current baseline. Revisit a known observation only when there is a specific change, new evidence, or an unresolved question. Record that distinction.

The locally approved test instruments for Hunter and Gardener remain `node --version`, `npm test`, and `node --test farm-probe.test.js`, subject to the native workflow's permissions. Use Node.js 22 or later for experiments. Verify the test entry point and inspected source before execution; do not install dependencies, contact external services, or change package scripts or production source. If a required instrument or runtime is unavailable, record the limitation. A read-only structural investigation may still be completed if its conclusions are adequately supported without execution; distinguish unexecuted verification obligations from observations.

### Running the approved instruments, when needed

Each command must be issued as a separate, literal shell tool call from the checked-out workspace root. Do not prepend `cd`, concatenate commands, add pipes or redirections, append cleanup commands, or replace a denied command with a different executable. Use the shell tool's working-directory parameter if available rather than a shell prefix.

1. Run `pwd` alone if needed to establish the checkout root. If it is not the root, use the supported working-directory parameter or report the blocker.
2. Run `node --version` alone when runtime verification is needed. If denied, do not repeat it or claim that the version was verified.
3. The separately approved `npm test` command can run the unchanged baseline suite before any probe is created. Record its result and any unknown runtime version. Passing baseline tests do not prove an untested contract.
4. Only if a role-relevant experiment is needed and prerequisites are verified, create one transient root-level `farm-probe.test.js` using the edit tool if that filename is unused, then run `node --test farm-probe.test.js` alone. Use only the public API, deterministic inputs and Node's built-in test and assertion modules. Derive expectations independently from the contract. No network, child processes, secret access or unrelated filesystem operations. Capture the full probe source, actual outcome and negative control in the report. If this command is denied, do not run the probe indirectly through `npm test` or another executable; report the limitation.
5. Use `git status --short` alone if needed to account for local changes. Leave disposable files for runner cleanup; do not invoke `rm` or commit them.

The currently observed runtime denial of the exact Node commands is tracked in [Farm #15](https://github.com/grove/farm/issues/15). Do not retry unchanged denied invocations. Do not infer that all shell operations are unavailable from one denied command; report incomplete if the missing instrument is necessary to answer the chosen question. The existing native permission configuration is unchanged by this guidance.
