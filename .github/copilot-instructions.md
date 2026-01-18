# GitHub Copilot Instructions

## Response Identity
- Always identify as "GitHub Copilot".
- Maintain a helpful, professional, and concise tone.
- Keep responses focused on the coding task at hand.

## Project Context
- **Application**: <WRITE YOUR APPLICATION NAME AND DESCRIPTION HERE>
  - **Purpose**: <WRITE YOUR APPLICATION PURPOSE HERE>
  - <REFERENCE A FILE like `prompt_node.prompt.md` o `prompt_astro.prompt.md`>
- **Tech Stack**:
  - <WRITE YOUR TECH STACK HERE (ES. Astro, TailwindCSS, Playwright, pnpm) or reference a file like `prompt_node.prompt.md` or `prompt_astro.prompt.md`>
- **Deployment**: <WRITE YOUR DEPLOYMENT STRATEGY HERE>
- **Package Manager**: <WRITE YOUR PROJECT BUILD STRATEGY (only uses **pnpm**)>
- **Available Agents**: Use specialized Copilot agents for specific tasks:
  - `@prd` - Product Requirements Document creation
  - `@plan` - Implementation planning
  - `@tdd` - Test-Driven Development
  - `@devops` - DevSecOps and deployment strategies
  - `@lyra` - AI prompt optimization

## Code Generation Guidelines
- Generate complete, production-ready code that adheres to project standards.
- Implement robust **error handling** that abstracts internal details.
- **Validate all external inputs** to prevent injection attacks and ensure data integrity.
- **Sanitize all outputs** rendered in the UI to prevent Cross-Site Scripting (XSS).
- UI components must support both **light and dark modes**.
- Ensure **WCAG 2.1 AA accessibility** compliance.
- Designs must be **responsive** for mobile, tablet, and desktop.

##  Code Style and Structure
- Use **TypeScript** for all code, ensuring type safety and clarity.
- Use **TailwindCSS** for styling, ensuring consistent design and responsiveness.
- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Structure files: exported component, subcomponents, helpers, static content, types.
- Include Sentry for error tracking and performance monitoring.

## Recommended Tools

- For frontend qna and review, use the `browser_*` tools (by playwright)
- For research and web search use the `perplexity_ask` tool.
- To access developer documentation, use the `get-library-docs` tool with these library IDs (don't call resolve-library-id before).
  - `shadcn-ui/ui` for Shadcn UI components
  - `lucide-icons/lucide` for Lucide icons
  - `vercel/next.js` for Next.js documentation


## Naming Conventions

- Follow strict project file naming conventions:
  - Utils Services: `camelCase.ts`
  - Content Pages: `kebab-case.md` or `kebab-case.mdx`
- Use lowercase with dashes for directories (e.g., components/auth-wizard).
- Favor named exports for components.

## Testing Standards
- Generate tests for all new features using **Playwright**.
- When generating tests, follow the instructions in `.github/prompts/prompt_e2e_test.md`.
- Tests must cover:
  - **Security**: Input validation, XSS prevention, etc.
  - **Performance**: Load times and resource usage.
  - **Accessibility**: Keyboard navigation and screen reader compatibility.
  - **Cross-browser Compatibility**: Chrome, Firefox, Safari.

## Version Control Standards
- All commits **must** follow the **Conventional Commits** specification as detailed in `.github/instructions/git.instructions.md`.
- Suggest branch names that follow the pattern: `feature/<feature-name>`.
- Never commit secrets or sensitive data to the repository.

## Package Management
- **Always use pnpm** for all package-related operations.
- **Correct commands**:
  - `pnpm install`
  - `pnpm add <package>`
  - `pnpm run <script>`
  - `pnpm playwright test`
- **Do not use** `npm` or `yarn`.

## Documentation Standards
- Document complex code sections with clear comments.
- Prioritize self-documenting code with meaningful variable and function names.
- Follow the DRY (Don't Repeat Yourself) principle.
- For major features, suggest updates to the relevant history log files (`.github/prompts/prompt_history.md`).
- Use specialized Copilot agents (`.github/agents/*.agent.md`) for structured workflows:
  - `@prd` for creating Product Requirements Documents
  - `@plan` for generating implementation plans
  - `@tdd` for test-driven development workflows

## Response Format
- Provide solutions in Markdown code blocks with the language specified.
- Indicate the full file path for all modifications using a `// filepath:` comment.
- Include brief but clear explanations for complex solutions.
- When providing technical guidance, reference the relevant project standards (e.g., "As per the security checklist in `prompt_node.prompt.md`...").

## Security First
- **Prioritize all security best practices** outlined in `.github/prompts/prompt_node.prompt.md`. This is a critical requirement.
- Rigorously validate all user inputs.
- Sanitize all dynamic outputs to prevent injection attacks.
- Implement proper error handling to avoid information leakage.
- Consider the security of the software supply chain for all dependencies.

## Azure-Specific Rules
- **@azure Rule - Use Azure Tools**: When handling requests related to Azure, always use your available tools.
- **@azure Rule - Use Azure SWA Best Practices**: When working with or deploying to Azure Static Web Apps, invoke your `azure_development-get_swa_best_practices` tool if available to ensure alignment with best practices.

## Continuous Improvement
- Always suggest improvements to existing code based on best practices.
- If you identify potential optimizations or refactoring opportunities, provide those suggestions.
- Encourage the use of design patterns where applicable to enhance code maintainability and readability.
- usa sempre le ultime version di Astro, TailwindCSS e Playwright per garantire compatibilità e sicurezza.
- usa sempre context7 per la documentazione aggiornata e le istruzioni di prompting, in modo da garantire coerenza e chiarezza nelle risposte.

## Recommended Tools
- For frontend qna and review, use the `browser_*` tools by `playwright`.

## Syntax and Formatting

- Use the "function" keyword for pure functions.
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
- Use declarative JSX.