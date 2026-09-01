# Issue Labels and Triage Workflow

This document describes the labels used across issue templates and how issues are triaged in the Lily Frontend repository.

## Label Reference

| Label | Description | When to Apply |
|-------|-------------|---------------|
| `bug` | Something isn't working | Reproducible defects, regressions, or broken behavior |
| `enhancement` | New feature or request | New functionality, improvements, or capability additions |
| `documentation` | Improvements or additions to documentation | Docs-only changes, missing guides, or clarification needs |
| `accessibility` | Barrier affecting people with disabilities | WCAG violations, screen reader issues, keyboard navigation gaps |
| `good first issue` | Good for newcomers | Well-scoped tasks with clear acceptance criteria and minimal context needed |
| `help wanted` | Extra attention is needed | Stalled issues, complex problems needing fresh perspectives |
| `dependencies` | Pull requests that update a dependency file | Automated or manual dep updates (Dependabot, npm audit) |
| `javascript` | Pull requests that update javascript code | Auto-applied by labeler for JS/TS file changes |
| `duplicate` | This issue or pull request already exists | Exact duplicate of an existing open or closed issue |
| `invalid` | This doesn't seem right | Spam, off-topic, or fundamentally unactionable reports |
| `question` | Further information is requested | Needs clarification from the author before triage can proceed |
| `wontfix` | This will not be worked on | Out of scope, deprecated surface, or intentionally unsupported |

## Triage Expectations

1. **New issues** should receive at least one category label (`bug`, `enhancement`, `documentation`) within 48 hours.
2. **Bounty issues** are tagged via the title pattern `[Bounty: $XX]` and do not require a separate bounty label.
3. **Good first issues** must have complete acceptance criteria and linked reference files before the label is applied.
4. **Assignment** is self-service: comment `/claim #NNN` on the issue and open a draft PR within 7 days to retain the claim.
5. **Stale claims** are released if no PR activity occurs within 14 days of the claim comment.
6. **Priority** is signaled by bounty amount when applicable; non-bounty issues are prioritized by maintainer discretion and `help wanted` status.

## Template-to-Label Mapping

| Issue Template | Default Labels | Notes |
|----------------|----------------|-------|
| Bug report | `bug` | Add `accessibility` if the defect affects assistive tech |
| Feature request | `enhancement` | Add `documentation` if the request is docs-only |
| Contributor task | *(none)* | Apply `good first issue` only after verifying scope and criteria |
