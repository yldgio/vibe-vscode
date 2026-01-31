# Creating a New Issue: Progressive Disclosure Implementation

This document provides a template for creating a new GitHub issue to track the progressive disclosure pattern implementation and future optimization tasks.

---

## Issue Template

### Title
```
Optimize AGENTS.md following Progressive Disclosure Pattern
```

### Labels
- `documentation`
- `enhancement`
- `good first issue` (for some subtasks)

### Description

```markdown
## Summary

Following the implementation of the progressive disclosure pattern documentation (see #[PR_NUMBER]), we should now optimize our core instruction files to better follow these best practices.

## Background

The progressive disclosure pattern (documented in `.github/PROGRESSIVE_DISCLOSURE.md`) recommends:
- Core instruction files under 60 lines
- Detailed information in referenced supplemental files
- Layered context system (Core → Specific → Advanced)

## Current State

- `AGENTS.md`: 293 lines (target: ~60 lines)
- `.github/copilot-instructions.md`: 124 lines (target: ~100 lines)

Much of the detailed content in these files could be moved to supplemental documentation while keeping references accessible.

## Proposed Changes

### 1. Create Supplemental Documentation

Move detailed content from `AGENTS.md` to new files:

- [ ] Create `.github/docs/git-workflow.md`
  - Move Git conventions section
  - Move branch naming and workflow details
  - Keep only essential reference in AGENTS.md

- [ ] Create `.github/docs/code-style.md`
  - Move TypeScript style guidelines
  - Move file naming conventions
  - Move directory structure details
  - Keep only reference to this file in AGENTS.md

- [ ] Create `.github/docs/testing.md`
  - Move testing procedures
  - Move test command examples
  - Keep only basic command reference in AGENTS.md

- [ ] Create `.github/docs/security.md`
  - Move security requirements details
  - Keep only critical security rules in AGENTS.md

### 2. Optimize AGENTS.md

Reduce `AGENTS.md` to core essentials:

- [ ] Keep only: WHAT (tech stack), WHY (purpose), HOW (where to find details)
- [ ] Replace detailed sections with references
- [ ] Target: ~60 lines total
- [ ] Add clear references to supplemental docs

**Example structure:**
```markdown
# AGENTS.md

## Repository Overview
[Brief description - 5 lines]

## Quick Reference
[Essential commands only - 10 lines]

## How to Work
- Git workflow: See .github/docs/git-workflow.md
- Code style: See .github/docs/code-style.md
- Testing: See .github/docs/testing.md
- Security: See .github/docs/security.md

## Key Files Reference
[Table - 10 lines]

## Available Agents
[Table - 10 lines]
```

### 3. Optimize copilot-instructions.md

Review and potentially reduce `.github/copilot-instructions.md`:

- [ ] Audit for always-relevant vs. task-specific content
- [ ] Move task-specific rules to appropriate instruction files
- [ ] Keep universal rules only
- [ ] Target: ~100 lines

### 4. Validation

- [ ] Test with GitHub Copilot to ensure instructions are still accessible
- [ ] Verify AI can find referenced information when needed
- [ ] Confirm no loss of functionality
- [ ] Document any performance improvements

## Benefits

1. **Improved AI Performance**
   - Reduced context bloat in always-loaded files
   - More space for actual code understanding
   - Faster, more focused suggestions

2. **Better Maintainability**
   - Easier to update specific topics
   - Clear separation of concerns
   - Reduced file size for core documents

3. **Enhanced Discoverability**
   - Clear navigation structure
   - Topic-focused documentation
   - Easier for new contributors

4. **Alignment with Best Practices**
   - Follows HumanLayer methodology
   - Implements progressive disclosure correctly
   - Community-aligned approach

## Success Criteria

- [ ] `AGENTS.md` under 80 lines (ideally ~60)
- [ ] `.github/copilot-instructions.md` under 100 lines
- [ ] All detailed content accessible via references
- [ ] No loss of information or functionality
- [ ] GitHub Copilot still finds and uses instructions effectively
- [ ] Documentation reviewed and approved by team

## References

- [Progressive Disclosure Pattern](.github/PROGRESSIVE_DISCLOSURE.md)
- [GitHub Copilot Configuration](.github/README.md)
- [Quick Reference](.github/QUICK_REFERENCE.md)
- [Implementation Summary](IMPLEMENTATION_SUMMARY.md)
- [HumanLayer Blog](https://www.hlyr.dev/blog/writing-a-good-claude-md)

## Related Issues

- #[ORIGINAL_ISSUE] - Initial request for progressive disclosure pattern
- #[PR_NUMBER] - PR implementing progressive disclosure documentation

## Timeline

**Priority:** Medium  
**Estimated Effort:** 2-4 hours  
**Suggested Milestone:** Next sprint

## Notes

- This is a documentation refactoring task
- No code changes required
- Low risk - can be easily reverted if needed
- Good opportunity to validate the progressive disclosure pattern
- Can be split into smaller tasks if needed
```

---

## How to Create the Issue

1. Go to the repository on GitHub
2. Click "Issues" → "New Issue"
3. Copy the template above
4. Fill in the `[PR_NUMBER]` and `[ORIGINAL_ISSUE]` placeholders
5. Adjust timeline and priority based on your team's schedule
6. Add appropriate labels: `documentation`, `enhancement`
7. Optionally assign to a team member
8. Submit the issue

## Optional: Create Individual Subtasks

For better tracking, you can create separate issues for each subtask:

### Issue 1: Create Supplemental Documentation Files
- Create `.github/docs/` directory structure
- Create individual doc files (git-workflow, code-style, testing, security)
- Populate with content extracted from AGENTS.md

### Issue 2: Optimize AGENTS.md
- Reduce to core essentials
- Add references to supplemental docs
- Target ~60 lines

### Issue 3: Optimize copilot-instructions.md
- Audit for always-relevant content
- Move task-specific content to appropriate files
- Target ~100 lines

### Issue 4: Validation and Testing
- Test with GitHub Copilot
- Validate AI can find referenced information
- Document performance improvements

---

## Example Issue Link Structure

```markdown
## Related Issues and PRs

- Implements: #[ORIGINAL_ISSUE]
- Documentation added in: #[PR_NUMBER]
- Blocked by: None
- Blocks: None
- Related to: Progressive Disclosure Initiative
```

---

This template provides a complete, actionable plan for the next phase of progressive disclosure implementation while maintaining all the context and rationale for the changes.
