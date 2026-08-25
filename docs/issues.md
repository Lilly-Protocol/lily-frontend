# Issue labels and triage

This guide explains the labels added by the repository's issue templates and how issues move from a report or proposal to assigned work.

## Template labels

| Label | Meaning | Contributor guidance |
| --- | --- | --- |
| `bug` | A reproducible problem or regression in the Lily frontend. | Reports need clear reproduction steps, expected behavior, and enough environment details or screenshots to investigate. A `bug` label does not by itself mean the issue is ready to implement. |
| `enhancement` | A proposed product, user-experience, or engineering improvement. | Maintainers must confirm the scope and direction before implementation. Contributors should wait until the proposal has acceptance criteria and is marked ready for assignment. |
| `contributor-friendly` | A scoped implementation task intended for community contributors. | These are the best issues for a first contribution. The issue should contain an expected outcome, implementation notes, and acceptance criteria before anyone is assigned. |

Labels describe the kind of issue; they do not guarantee priority, approval, or assignment. In particular, `contributor-friendly` is this repository's signal for work suitable for a first-time contributor.

## Triage workflow

Maintainers triage new issues before implementation begins:

1. Confirm that the issue belongs in the frontend repository and is not a duplicate.
2. Check that the selected template and label match the request. Maintainers may update labels as the issue becomes clearer.
3. Request missing information. Bug reports should be reproducible, feature requests should explain the problem and proposed direction, and contributor tasks should have testable acceptance criteria.
4. Confirm priority, dependencies, design or product decisions, and a sufficiently narrow scope.
5. Mark the issue ready in the discussion and assign it to a contributor when work can begin. Issues that still need investigation or a decision remain unassigned.

## Picking up and assigning work

- Start with an unassigned `contributor-friendly` issue when looking for a first issue.
- Before writing code, comment on the issue to confirm availability and wait for a maintainer to assign it. Assignment avoids duplicated work and indicates that the scope is ready.
- Do not assume that an unassigned `bug` or `enhancement` is ready to build. Ask whether triage is complete if the issue does not have clear acceptance criteria or maintainer approval.
- Keep work within the agreed scope. Raise newly discovered requirements on the issue before expanding the change.
- If an assignee can no longer continue, they should let maintainers know so the issue can be made available again.

When opening a new issue, choose the closest available template. Maintainers will handle any label changes needed during triage.
