---
description: Instructions for C# and .NET development
applyTo: "**/*.cs,**/*.csproj,**/*.sln"
---

# C# + .NET Development Instructions

## Code Structure and Organization
- Use **namespace** declarations that match folder structure
- Organize code in this order:
  1. Using statements (grouped: System, Microsoft, third-party, local)
  2. Namespace declaration
  3. Class/interface/enum declarations
  4. Fields and properties
  5. Constructors
  6. Methods (public first, then private)
- Use **file-scoped namespaces** in .NET 6+ projects
- **One class per file** with matching filename

## Naming Conventions
- **PascalCase** for classes, methods, properties, events, namespaces
- **camelCase** for local variables, method parameters, private fields
- **PascalCase** for public fields (avoid public fields, use properties)
- **IPascalCase** for interfaces (prefix with 'I')
- Use **descriptive names** that explain intent, not implementation
- Avoid abbreviations unless they're domain-specific and well-known

## Type System and Null Safety
- Enable **nullable reference types** (`<Nullable>enable</Nullable>`)
- Use **nullable annotations** (`string?`, `int?`) appropriately
- **Validate parameters** at method entry points
- Use **null-conditional operators** (`?.`, `??`, `??=`) for safe null handling
- Prefer **value types** and **immutable types** where appropriate

## Properties and Fields
- Use **auto-properties** for simple getters/setters
- Use **expression-bodied properties** for computed values
- **Initialize properties** in constructors or with default values
- Use **readonly** fields for immutable data
- Prefer **properties over fields** for public/protected members

```csharp
// Good examples
public string Name { get; init; } = string.Empty;
public int Count => _items.Count;
private readonly List<string> _items = new();
```

## Methods and Functions
- Keep methods **small and focused** (single responsibility)
- Use **async/await** for I/O-bound operations
- **Return Task** for async methods without return values
- Use **ConfigureAwait(false)** in library code
- Prefer **expression-bodied methods** for simple operations
- Use **local functions** for helper logic used only within a method

## Error Handling
- Use **specific exception types** rather than generic Exception
- **Validate arguments** and throw ArgumentException variants
- Use **try-catch** sparingly - prefer prevention over handling
- **Log exceptions** with appropriate context
- Implement **custom exceptions** for domain-specific errors
- Use **Result patterns** or **Option types** for expected failures

```csharp
public Result<User> GetUser(int id)
{
    if (id <= 0)
        return Result<User>.Failure("Invalid user ID");
    
    // ... logic
}
```

## Async/Await Best Practices
- **Don't block** on async code - use await all the way up
- Use **Task.Run** only for CPU-bound work
- **Cancel operations** with CancellationToken when appropriate
- Use **ValueTask** for frequently called, often-synchronous methods
- **Avoid async void** except for event handlers

## LINQ and Collections
- Use **LINQ methods** for data transformations
- Prefer **IEnumerable<T>** for method parameters
- Use **specific collection types** for return values
- Use **collection expressions** in .NET 8+ (`[1, 2, 3]`)
- **Avoid multiple enumeration** - materialize with ToList() when needed

## Dependency Injection
- **Register services** with appropriate lifetimes (Singleton, Scoped, Transient)
- Use **interfaces** for service contracts
- **Inject dependencies** through constructors
- Use **IOptions<T>** for configuration
- Avoid **service locator pattern** - prefer constructor injection

## Entity Framework and Data Access
- Use **async methods** for database operations
- **Dispose contexts** properly (using statements/DI scoping)
- Use **Include()** for eager loading, **Load()** for explicit loading
- **Project to DTOs** for read-only scenarios
- Use **value converters** for complex type mappings
- **Configure entities** using Fluent API or data annotations

## Testing Considerations
- Write **testable code** with dependency injection
- Use **pure functions** where possible
- **Mock dependencies** with interfaces
- Use **data-driven tests** with [Theory] and [InlineData]
- **Arrange-Act-Assert** pattern for test structure
- Use **meaningful test names** that describe the scenario

## Performance Best Practices
- Use **StringBuilder** for string concatenation in loops
- Prefer **Span<T>** and **Memory<T>** for high-performance scenarios
- Use **object pooling** for frequently allocated objects
- **Avoid boxing** value types unnecessarily
- Use **readonly structs** for immutable value types
- **Profile before optimizing** - measure performance impact

## Security Practices
- **Validate all inputs** at API boundaries
- Use **parameterized queries** to prevent SQL injection
- **Hash passwords** with proper salt (BCrypt, Argon2)
- **Sanitize outputs** for web applications
- Use **HTTPS** and secure communication protocols
- **Never log sensitive data** (passwords, API keys, PII)

## Configuration and Environment
- Use **IConfiguration** for application settings
- Store **secrets** in Azure Key Vault or similar secure storage
- Use **environment-specific** configurations (appsettings.Development.json)
- **Validate configuration** at startup
- Use **strongly-typed configuration** with IOptions<T>

## Common Anti-Patterns to Avoid
- **Don't** catch and ignore exceptions without logging
- **Don't** use `async void` (except for event handlers)
- **Don't** block on async code with `.Result` or `.Wait()`
- **Don't** use `DateTime.Now` for UTC times (use `DateTime.UtcNow`)
- **Don't** ignore compiler warnings - fix them
- **Don't** use `var` when the type isn't obvious from context

## File Organization
```
src/
├── Domain/           # Domain entities and business logic
├── Application/      # Application services and DTOs
├── Infrastructure/   # Data access and external services
├── Web/             # Controllers, middleware, startup
└── Tests/           # Unit and integration tests
```

## Code Example Template
```csharp
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace MyApp.Application.Services;

public interface IUserService
{
    Task<Result<User>> GetUserAsync(int id, CancellationToken cancellationToken = default);
    Task<Result<User>> CreateUserAsync(CreateUserRequest request, CancellationToken cancellationToken = default);
}

public sealed class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly ILogger<UserService> _logger;

    public UserService(IUserRepository userRepository, ILogger<UserService> logger)
    {
        _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<Result<User>> GetUserAsync(int id, CancellationToken cancellationToken = default)
    {
        if (id <= 0)
        {
            _logger.LogWarning("Invalid user ID: {UserId}", id);
            return Result<User>.Failure("Invalid user ID");
        }

        try
        {
            var user = await _userRepository.GetByIdAsync(id, cancellationToken);
            return user is not null 
                ? Result<User>.Success(user)
                : Result<User>.Failure("User not found");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving user with ID: {UserId}", id);
            return Result<User>.Failure("An error occurred while retrieving the user");
        }
    }

    public async Task<Result<User>> CreateUserAsync(CreateUserRequest request, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        var validation = ValidateCreateUserRequest(request);
        if (!validation.IsSuccess)
            return Result<User>.Failure(validation.Error);

        var user = new User
        {
            Name = request.Name.Trim(),
            Email = request.Email.ToLowerInvariant(),
            CreatedAt = DateTime.UtcNow
        };

        try
        {
            await _userRepository.CreateAsync(user, cancellationToken);
            _logger.LogInformation("Created user: {UserId}", user.Id);
            return Result<User>.Success(user);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating user: {UserEmail}", request.Email);
            return Result<User>.Failure("An error occurred while creating the user");
        }
    }

    private static Result ValidateCreateUserRequest(CreateUserRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return Result.Failure("Name is required");

        if (string.IsNullOrWhiteSpace(request.Email))
            return Result.Failure("Email is required");

        if (!IsValidEmail(request.Email))
            return Result.Failure("Invalid email format");

        return Result.Success();
    }

    private static bool IsValidEmail(string email) =>
        new EmailAddressAttribute().IsValid(email);
}

public sealed record CreateUserRequest
{
    public required string Name { get; init; }
    public required string Email { get; init; }
}
```
