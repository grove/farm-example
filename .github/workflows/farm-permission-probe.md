---
name: Farm Permission Probe
description: One-shot runtime qualification of exact command permissions using the native Copilot SDK.
on:
  workflow_dispatch:
engine:
  id: copilot
  copilot-sdk: true
permissions:
  contents: read
timeout-minutes: 5
max-ai-credits: 40
max-tool-denials: 4
concurrency:
  group: farm-investigation
  cancel-in-progress: false
tools:
  bash: ["pwd", "node --version", "npm test", "node --test test/ledger.test.js"]
  edit:
safe-outputs:
  upload-artifact:
    max-uploads: 1
    retention-days: 14
    max-size-bytes: 16384
    allowed-paths: ["farm-permission-probe.md"]
  noop:
    report-as-issue: false
  report-failure-as-issue: false
  report-failed-jobs: false
  report-incomplete:
    create-issue: false
  threat-detection:
    max-ai-credits: 20
    report-as-issue: false
    continue-on-error: false
  report-missing-tool: false
  report-missing-data:
    create-issue: false
---

# Bounded permission qualification

This is a one-shot diagnostic, not a software investigation or implementation assignment. Use the native SDK mode and configured restricted shell only. The repository is a public dependency-free test fixture with a previously reviewed `npm test` entry point. Do not change its source, test suite, scripts, credentials, network settings or workflow files. Do not run package installation.

Invoke each command below as a separate literal shell call from the checkout root, without cd, compound operators, pipes, redirection or alternate executables. Record the actual result or denial and exit status when available. Do not retry a denied command. Failure of one command does not imply failure of another independently approved command.

1. `pwd`
2. `node --version`
3. `npm test`
4. `node --test test/ledger.test.js`

The following harmless negative control is deliberately absent from the allowlist: `node -p 1+1`. Attempt that exact command once to verify it is denied, not to obtain the value. Do not attempt any alternative way of executing it. If it unexpectedly executes, record the boundary failure and stop command execution immediately. Do not infer authorization from a permissive result.

Write one sanitized Markdown record to the exact workspace-root filename `farm-permission-probe.md`, listing the checked-out revision, each requested command, whether it executed, observed exit status/output summary, and whether the negative control was denied. Do not overwrite an existing file, include raw logs, or claim success without actual observations. Use the exact configured artifact tool and filename. An upload acknowledgment is staging, not final delivery. If the expected results cannot be established, record the partial evidence and use report_incomplete; otherwise record completion using noop. No GitHub issue, PR, code change, or other workflow dispatch is authorized.
