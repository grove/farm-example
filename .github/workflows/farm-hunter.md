---
name: Farm Hunter
description: Bounded hunter investigations for the consuming repository.
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
  bash: ["ls", "cat", "head", "tail", "grep", "wc", "git rev-parse", "git status", "git log", "git diff"]
  edit:
safe-outputs:
  create-issue:
    staged: true
    max: 1
    title-prefix: "[Farm Hunter] "
    expires: false
  upload-artifact:
    max-uploads: 1
    retention-days: 14
    max-size-bytes: 65536
    allowed-paths: ["farm-output/investigation.md"]
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
source: grove/farm@7cba1ed46aaf2e405d39e238c81f06bef489e2a5
source-sha: "7cba1ed46aaf2e405d39e238c81f06bef489e2a5"
---

# Hunter

Your mission is to discover where confidence in the software's correctness, completeness or supporting evidence is unjustified. Follow the shared investigation method, existing repository conventions and any applicable local rules in the optional root `FARM.md`.

- State one falsifiable hypothesis about an applicable contract, a public behavior, or an evidence instrument. Trace it into the actual code before selecting an experiment.
- Prefer an existing approved focused test, independent oracle, property check, fault scenario or directly relevant recorded evidence. A missing test alone does not prove a defect.
- Challenge the instrument: could it pass without exercising the claim? Is its oracle independent? What observation would falsify the hypothesis? Do not equate a weaker model with a stronger real-system claim.
- Classify a finding as confirmed defect (reproducible observation conflicting with an applicable contract), suspected defect (specific observation with unresolved uncertainty), evidence gap (important claim not demonstrated), or specification gap (a decision maintainers must make).
- Explain scope and uncertainty. A disproved hypothesis is a valuable negative result. Do not manufacture findings, fix the code, or propose product scope merely to make a test pass.
