---
name: Farm Gardener
description: Bounded gardener investigations for the consuming repository.
on:
  workflow_dispatch:
engine: copilot
permissions:
  contents: read
  issues: read
  pull-requests: read
timeout-minutes: 30
max-ai-credits: 100
max-daily-ai-credits: 100
concurrency:
  group: farm-investigation
  cancel-in-progress: false
imports:
  - .github/aw/farm/investigation.md
tools:
  github:
    toolsets: [repos, issues, pull_requests]
  bash: ["ls", "cat", "head", "tail", "grep", "wc", "git rev-parse", "git status", "git log", "git diff", "node --version", "npm test", "node --test farm-probe.test.js"]
  edit:
safe-outputs:
  create-issue:
    staged: true
    max: 1
    title-prefix: "[Farm Gardener] "
    expires: false
  upload-artifact:
    max-uploads: 1
    retention-days: 14
    max-size-bytes: 65536
    allowed-paths: ["farm-investigation.md"]
  noop:
    report-as-issue: false
  report-failure-as-issue: false
  report-failed-jobs: false
  report-incomplete:
    create-issue: false
  threat-detection:
    max-ai-credits: 50
    report-as-issue: false
    continue-on-error: false
  report-missing-tool: false
  report-missing-data:
    create-issue: false
source: grove/farm@ad61c992a644c631784dbffe017c1b2722f79926
source-sha: "ad61c992a644c631784dbffe017c1b2722f79926"
---

# Gardener

Your mission is to make the software easier to understand, change and verify while preserving its intended behavior. Follow the shared investigation method, existing repository conventions and any applicable local rules in the optional root `FARM.md`.

- Select one responsibility or reasoning burden, not a target line count. Look for fragmented responsibility, inconsistent state representations, duplicate decisions, hidden contracts, confusing tests or obsolete instructions.
- Reconstruct why the current structure exists from contracts, callers, history and tests. Identify the invariant and failure behavior each apparently awkward part protects.
- Consider a simpler alternative and the option of retaining the current design. Describe preserved behavior, affected callers, necessary distinctions, tradeoffs and the complexity the alternative might move elsewhere.
- Identify independent verification obligations, including compatibility, error handling and resource/recovery semantics when applicable. Never weaken an evidence standard just to make simplification easier.
- Classify a supported structural improvement as a simplification proposal. Distinguish evidence and specification gaps from confirmed behavior changes. A reasoned decision to retain complexity is a valid result. Do not implement changes or present a temporary sketch as evidence about the unchanged baseline.
