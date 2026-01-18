# 🚀 AI Dev Tasks 

Welcome to **AI Dev Tasks**! This repository provides a collection of **Copilot agents** and prompt files designed to supercharge your feature development workflow in VS Code. By leveraging these specialized agents, you can systematically approach building features, from ideation to implementation, with built-in checkpoints for verification.

Stop wrestling with monolithic AI requests and start guiding your AI collaborator step-by-step!

## 🆕 Agents vs Prompts: Understanding the Difference

This repository now uses **GitHub Copilot agents** as the primary system for AI assistance:

- **Copilot Agents** (`.github/agents/*.agent.md`) - Modern, specialized AI assistants that integrate directly with GitHub Copilot. Use these with `@agent-name` syntax.
- **Prompt Files** (`.github/prompts/*.prompt.md`) - Task-specific prompts referenced with `#filename` syntax.
- **Legacy Chatmodes** (`.github/chatmodes/*.chatmode.md`) - **DEPRECATED**. See `MIGRATE_TO_AGENT.md` for migration guidance.

**For all new workflows, use Copilot agents (`@agent-name`) instead of legacy chatmodes.**

## ✨ The Core Idea

Building complex features with AI can sometimes feel like a black box. This workflow aims to bring structure, clarity, and control to the process by:

1.  **Defining Scope:** Clearly outlining what needs to be built with a Product Requirement Document (PRD).
2.  **Detailed Planning:** Breaking down the PRD into a granular, actionable task list.
3.  **Iterative Implementation:** Guiding the AI to tackle one task at a time, allowing you to review and approve each change.

This structured approach helps ensure the AI stays on track, makes it easier to debug issues, and gives you confidence in the generated code.

## Workflow: From Idea to Implemented Feature 💡➡️💻

Here's the step-by-step process using the `.md` files in this repository:

### 1️⃣ Create a Product Requirement Document (PRD)

First, lay out the blueprint for your feature. A PRD clarifies what you're building, for whom, and why.

You can create a lightweight PRD directly within your editor (VS Code) using the **PRD agent**:

**Option 1: Using the PRD Agent (Recommended)**
```
@prd I want to build [Describe your feature in detail]
Reference these files: #file1.py #file2.ts
```

**Option 2: Using the Prompt File (Legacy)**
```
Use #create-prd.prompt.md
Here's the feature I want to build: [Describe your feature in detail]
Reference these files to help you: [Optional: #file1.py #file2.ts]
```

The **@prd** agent will guide you through creating a comprehensive PRD by asking clarifying questions and ensuring all necessary sections are covered.

### 2️⃣ Generate Your Task List from the PRD

With your PRD drafted (e.g., `MyFeature-PRD.md`), the next step is to generate a detailed, step-by-step implementation plan.

**Option 1: Using the Plan Agent (Recommended)**
```
@plan Create an implementation plan based on #MyFeature-PRD.md
```

**Option 2: Using the Prompt File (Legacy)**
```
Take #MyFeature-PRD.md and create tasks using #generate-tasks.prompt.md
```

The **@plan** agent will analyze your PRD and create a structured implementation plan with clear steps and testing requirements.


### 3️⃣ Examine Your Task List

You'll now have a well-structured task list, often with tasks and sub-tasks, ready for the AI to start working on. This provides a clear roadmap for implementation.

### 4️⃣ Instruct the AI to Work Through Tasks (and Mark Completion)

To ensure methodical progress and allow for verification, use the TDD agent or the task list prompt to work through tasks one at a time.

**Option 1: Using the TDD Agent (Recommended for code features)**
```
@tdd Start implementing task 1.1 from #task-list.md
```

**Option 2: Using the Process Task List Prompt**
```
Please start on task 1.1 and use #process-task-list.prompt.md
```

The **@tdd** agent enforces the Red-Green-Refactor cycle, ensuring tests are written before implementation. For non-code tasks, use the prompt file approach.

The AI will attempt the task and then prompt you to review before proceeding.

### 5️⃣ Review, Approve, and Progress ✅

As the AI completes each task, you review the changes.
*   If the changes are good, simply reply with "yes" (or a similar affirmative) to instruct the AI to mark the task complete and move to the next one.
*   If changes are needed, provide feedback to the AI to correct the current task before moving on.

You'll see a satisfying list of completed items grow, providing a clear visual of your feature coming to life!

While it's not always perfect, this method has proven to be a very reliable way to build out larger features with AI assistance.

## 🗂️ Available Agents and Files

### Copilot Agents (Current Standard)
Located in `.github/agents/`:

*   **`@prd`** (prd.agent.md): Guides you through creating comprehensive Product Requirement Documents
*   **`@plan`** (plan.agent.md): Generates implementation plans for features or refactoring tasks
*   **@tdd** (tdd.agent.md): Enforces Test-Driven Development with the Red-Green-Refactor cycle
*   **@devops** (devops.agent.md): DevSecOps expert for Microsoft ecosystem, Git, and deployment strategies
*   **@lyra** (lyra.agent.md): AI prompt optimization specialist for improving AI interactions

### Prompt Files (Task-Specific)
Located in `.github/prompts/`:

*   **`create-prd.prompt.md`**: Template for generating Product Requirement Documents (legacy - use @prd instead)
*   **`generate-tasks.prompt.md`**: Breaks down PRDs into detailed task lists (legacy - use @plan instead)
*   **`process-task-list.prompt.md`**: Guides step-by-step task completion with checkpoints
*   **`git.prompt.md`**: Git workflow and best practices guidance
*   **`devops.prompt.md`**: DevOps and deployment strategies
*   **Additional specialized prompts**: See `.github/prompts/` for the complete list

### Legacy Chatmodes (Deprecated)
Located in `.github/chatmodes/`:

⚠️ **These are deprecated.** Please use the equivalent Copilot agents instead. See `MIGRATE_TO_AGENT.md` for details.

## 🌟 Benefits

*   **Structured Development:** Enforces a clear process from idea to code.
*   **Step-by-Step Verification:** Allows you to review and approve AI-generated code at each small step, ensuring quality and control.
*   **Manages Complexity:** Breaks down large features into smaller, digestible tasks for the AI, reducing the chance of it getting lost or generating overly complex, incorrect code.
*   **Improved Reliability:** Offers a more dependable approach to leveraging AI for significant development work compared to single, large prompts.
*   **Clear Progress Tracking:** Provides a visual representation of completed tasks, making it easy to see how much has been done and what's next.

## 🛠️ How to Use

1.  **Clone or Download:** Get these `.md` files into your project or a central location where Cursor can access them.
2.  **Follow the Workflow:** Systematically use the `.md` files in Cursor's Agent chat as described in the 5-step workflow above.
3.  **Adapt and Iterate:**
    *   Feel free to modify the prompts within the `.md` files to better suit your specific needs or coding style.
    *   If the AI struggles with a task, try rephrasing your initial feature description or breaking down tasks even further.

## 🔄 Migration from Chatmodes to Agents

If you've been using the legacy chatmode system, here's how to migrate:

### Quick Reference

| Old Chatmode | New Agent | How to Use |
|-------------|-----------|------------|
| `#PRD.chatmode.md` | `@prd` | `@prd Create a PRD for [feature]` |
| `#TDD.chatmode.md` | `@tdd` | `@tdd Implement [feature] using TDD` |
| `#Plan.chatmode.md` | `@plan` | `@plan Create plan for #MyFeature-PRD.md` |
| `#devops.chatmode.md` | `@devops` | `@devops Help with Git workflow` |
| `#lyra.chatmode.md` | `@lyra` | `@lyra Optimize this prompt: [prompt]` |

### Benefits of Agents

- **Native Copilot Integration**: Better integration with GitHub Copilot ecosystem
- **Cleaner Syntax**: Use `@agent-name` instead of `#file.chatmode.md`
- **Consistent Format**: Standardized frontmatter and structure
- **Better Tooling**: Enhanced support in VS Code and GitHub

For complete migration details, see **`MIGRATE_TO_AGENT.md`**.

## 💡 Tips for Success

*   **Be Specific:** The more context and clear instructions you provide (both in your initial feature description and any clarifications), the better the AI's output will be.
*   **Use Agents First**: Prefer `@agent-name` syntax over legacy prompt files for better integration.
*   **Combine Approaches**: Use agents for structured workflows and prompt files for specific tasks.
*   **Correct File Tagging:** Always ensure you're accurately tagging files (e.g., `#MyFeature-PRD.md`) when needed.
*   **Patience and Iteration:** AI is a powerful tool, but it's not magic. Be prepared to guide, correct, and iterate. This workflow is designed to make that iteration process smoother.

## 🤝 Contributing

Got ideas to improve these `.md` files or have new ones that fit this workflow? Contributions are welcome!
Please feel free to:
*   Open an issue to discuss changes or suggest new features.
*   Submit a pull request with your enhancements.

---

Happy AI-assisted developing!
