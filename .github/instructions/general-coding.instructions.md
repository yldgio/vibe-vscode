---
description: General coding instructions and best practices for all programming languages
---

# General Coding Instructions

## Code Quality Standards

### Naming Conventions
- Use **descriptive, self-documenting names** for variables, functions, and classes
- Prefer `isLoading`, `hasError`, `canSubmit` over generic names like `flag`, `status`
- Use consistent naming patterns within the same codebase
- Avoid abbreviations unless they're widely understood in the domain

### Function Design
- **Single Responsibility**: Each function should do one thing well
- **Pure functions** when possible - no side effects, predictable outputs
- Keep functions **small** (ideally under 20 lines)
- Use **early returns** to reduce nesting and improve readability

### Error Handling
- **Always handle errors explicitly** - never ignore or suppress them
- **Fail fast** with clear, actionable error messages
- **Log errors appropriately** without exposing sensitive information
- Use appropriate error types for the context (exceptions, error objects, etc.)

### Code Structure
- **DRY Principle**: Don't Repeat Yourself - extract common logic
- **Consistent indentation** and formatting throughout the codebase
- **Group related functionality** together
- **Separate concerns** - business logic, UI, data access should be distinct

## Security First
- **Validate all inputs** at system boundaries
- **Sanitize outputs** to prevent injection attacks
- **Never hardcode secrets** - use environment variables or secure vaults
- **Principle of least privilege** - grant minimal necessary permissions

## Performance Considerations
- **Optimize for readability first**, performance second
- **Avoid premature optimization** - measure before optimizing
- **Use appropriate data structures** for the task
- **Consider memory usage** and avoid unnecessary allocations

## Documentation
- **Write self-documenting code** with clear variable and function names
- **Comment the 'why', not the 'what'** - explain business logic and complex decisions
- **Keep comments up-to-date** with code changes
- **Document public APIs** and complex algorithms

## Testing Principles
- **Write testable code** - avoid tightly coupled dependencies
- **Test edge cases** and error conditions
- **Use descriptive test names** that explain the scenario
- **Keep tests simple** and focused on single behaviors

## Version Control
- **Make atomic commits** - one logical change per commit
- **Write clear commit messages** following conventional commit format
- **Keep commits small** and focused
- **Review code before committing** - check for issues and formatting

## General Principles
- **KISS**: Keep It Simple, Stupid - prefer simple solutions
- **YAGNI**: You Aren't Gonna Need It - don't over-engineer
- **Composition over inheritance** where applicable
- **Fail fast and fail clearly** with meaningful error messages
- **Be consistent** with existing codebase patterns and conventions

## Code Review Checklist
- Does the code solve the problem correctly?
- Is it readable and maintainable?
- Are there any security vulnerabilities?
- Are edge cases handled appropriately?
- Is error handling comprehensive?
- Are there adequate tests?
- Does it follow the project's coding standards?
