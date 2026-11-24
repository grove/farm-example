# FARM.md (optional example)

Most projects do not need this file. If you have additional domain knowledge or local workflow rules, create a root `FARM.md` and include only what is useful. This example is not live configuration. There are no required headings or fields; delete anything you do not need. Link to existing documents instead of copying them.

Farm's optional onboarding workflow can draft the relevant notes and ask targeted questions first; see [the onboarding method in Farm](https://github.com/grove/farm/blob/main/docs/onboarding.md) once released. Review source links and distinguish agreed contracts from unresolved hypotheses. Do not turn inferred implementation behavior into a requirement.

For example, a small library might only need:

> Keep the documented public API backward compatible. Do not simplify the compatibility adapter without exercising the compatibility tests. Prefer investigations of changed public interfaces. See CONTRIBUTING.md for the normal test entry point.

A more complex project may benefit from a few extra notes:

## Domain knowledge

- Link to the authoritative contracts if they are hard to discover or distinguish from historical material.
- Describe invariants, necessary distinctions or compatibility constraints that cannot be inferred safely from code.
- Explain which territories deserve extra attention, or are out of scope.

## Hunter rules

- Specify a domain-specific correctness or evidence rule, e.g. compare observable outputs against an independent oracle rather than another path through the same implementation.
- Link to existing focused tests and their limits when they are not obvious. Do not repeat a complete test inventory.

## Gardener rules

- Explain necessary complexity, protected boundaries or stronger verification obligations, e.g. preserve externally visible error behavior when consolidating a lifecycle.
- Exclude generated code or other areas where changes would be misleading.

## Shared rules

- Name exclusions, data restrictions or additional evidence requirements if not already documented.
- Link to reviewed observations and private reporting guidance if they use unusual locations.
- Mention approved experiment entry points where useful. The actual tools, dependencies, engine, credentials, budgets, network and publication authority remain trusted native gh-aw settings.

Use these rules to narrow scope and strengthen evidence, not to weaken Farm's boundaries. Never include secret values or production data. If a required experiment is unavailable or unsafe, the workflow must report its limitations. A missing optional file is not itself a reason to stop.
