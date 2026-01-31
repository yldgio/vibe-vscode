# Progressive Disclosure Quick Reference

> **TL;DR:** Keep core instructions minimal, reference detailed docs, let the AI load what it needs.

## The Golden Rules

1. **Core file < 60 lines** - Only universal, always-relevant info
2. **Reference, don't repeat** - Point to detailed docs instead of inline content
3. **Layer your context** - Core → Specific → Advanced
4. **Let AI decide** - Agent loads details when task requires them

## File Roles

| File Type | When Loaded | Purpose | Keep Under |
|-----------|-------------|---------|------------|
| `copilot-instructions.md` | Always | Universal rules | 100 lines |
| `.github/instructions/*.md` | File pattern match | Language-specific | 150 lines |
| `.github/agents/*.md` | `@agent` invocation | Domain expertise | 200 lines |
| `.github/prompts/*.md` | Slash command | Task templates | 100 lines |
| `.github/docs/*.md` | Reference only | Detailed procedures | No limit |

## Good vs Bad Examples

### ✅ Good: Progressive Disclosure

```markdown
# AGENTS.md (45 lines)

## Overview
Tech: Node.js, React, TypeScript
Purpose: Document collaboration platform

## How to Work
- Build: see .github/docs/building.md
- Test: see .github/docs/testing.md
- Style: see .github/docs/style.md
```

### ❌ Bad: Context Bloat

```markdown
# AGENTS.md (450 lines)

## Overview
[200 lines of history and details]

## Build Process
[100 lines of every edge case]

## Testing
[150 lines of every scenario]
```

## Context Loading Example

When editing `App.tsx`:

```
✓ Loaded: copilot-instructions.md (100 lines)
✓ Loaded: react-ts.instructions.md (90 lines)
✓ Loaded: Current file content
✓ Available: App.test.tsx (if open)

❌ Not loaded: csharp-dotnet.instructions.md
❌ Not loaded: git.instructions.md (until needed)
❌ Not loaded: @agents (until invoked)
```

**Context used:** ~400 lines  
**Context saved:** ~800 lines for actual code understanding

## Quick Checklist

When writing instructions:

- [ ] Is this always relevant? → Core file
- [ ] Is this language-specific? → instructions/
- [ ] Is this a reusable task? → prompts/
- [ ] Is this detailed reference? → docs/
- [ ] Can I reference instead of repeat?
- [ ] Is it under the line limit?

## Performance Impact

| Instruction Count | AI Performance |
|-------------------|----------------|
| 0-60 lines | ⭐⭐⭐⭐⭐ Optimal |
| 60-150 lines | ⭐⭐⭐⭐ Good |
| 150-200 lines | ⭐⭐⭐ Acceptable |
| 200+ lines | ⭐⭐ Degraded |
| 300+ lines | ⭐ Poor |

## Common Mistakes

1. **Instruction Bloat** - Adding "just in case" information
2. **Repetition** - Same info in multiple files
3. **Historical Baggage** - Outdated edge cases that no longer apply
4. **Over-documentation** - Documenting every possible scenario
5. **No Layering** - Everything in one flat file

## How to Fix Bloat

1. **Audit** - Count lines in core files
2. **Extract** - Move detailed content to referenced docs
3. **Reference** - Point to extracted docs
4. **Test** - Verify AI can still find info when needed
5. **Monitor** - Review quarterly for drift

## Further Reading

- Full guide: `.github/PROGRESSIVE_DISCLOSURE.md`
- Structure guide: `.github/README.md`
- HumanLayer blog: https://www.hlyr.dev/blog/writing-a-good-claude-md
- Copilot docs: https://docs.github.com/en/copilot

---

**Remember:** Less is more. The AI is smart—give it pointers, not novels.
