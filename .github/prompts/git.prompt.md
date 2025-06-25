---
description: Instructions for managing Git commits and branches in the project.
mode: 'agent'
---
# istruzioni per ogni modifica applicata

per ogni modifica applicata al codice sorgente bisogna creare un commit.
il commit deve seguire lo standard per conventional commits. nel body del messaggio deve essere indicato il nome del istrozione di prompting ricevuta e una breve spiegazione del motivo
## branching e workflow

1. controlla lo stato del repository (`git status`)
   - se siamo sul branch principale (`main`) e non ci sono file modificati, crea un nuovo branch con la sintassi: `feature/{{feature-name}}`
   - se siamo sul branch principale (`main`) e ci sono file modificati, hiedi cosa fare  
   - se siamo su un branch `feature/*`, controlla la lista dei file modificati e chiedi cosa fare  


## conventional commits

Generate a git commit message following this structure:
1. First line: conventional commit format (type: concise description) (remember to use semantic types like feat, fix, docs, style, refactor, perf, test, chore, etc.)
2. Optional bullet points if more context helps:
   - Keep the second line blank
   - Keep them short and direct
   - Focus on what changed
   - Always be terse
   - Don't overly explain
   - Drop any fluffy or formal language

Return ONLY the commit message - no introduction, no explanation, no quotes around it.

### Quick examples
* `feat: new feature`
* `fix(scope): bug in scope`
* `feat!: breaking change` / `feat(scope)!: rework API`
* `chore(deps): update dependencies`

# Commit types
* `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* `ci`: Changes to CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* **`chore`: Changes which doesn't change source code or tests e.g. changes to the build process, auxiliary tools, libraries**
* `docs`: Documentation only changes
* **`feat`: A new feature**
* **`fix`: A bug fix**
* `perf`: A code change that improves performance
* `refactor`:  A code change that neither fixes a bug nor adds a feature
* `revert`: Revert something
* `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* `test`: Adding missing tests or correcting existing tests

# Reminders
* Put newline before extended commit body
* More details at **[conventionalcommits.org](https://www.conventionalcommits.org/)**
