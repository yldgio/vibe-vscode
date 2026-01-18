# 🚀 Vibe Coding Template per Visual Studio Code

Benvenuti nel **Vibe Coding Template**! Questo repository fornisce un template completo e strutturato per lo sviluppo software con Visual Studio Code, includendo **Copilot agents**, istruzioni di coding, best practices e workflow per multiple tecnologie e linguaggi di programmazione.

Inizia a sviluppare con fiducia seguendo standard professionali consolidati!

## 🤖 Sistema di Agenti Copilot

Questo template include **agenti specializzati GitHub Copilot** per assistenza AI mirata:

- **@prd**: Assistente per Product Requirements Documents
- **@plan**: Generazione piani di implementazione
- **@tdd**: Sviluppo guidato da test (Test-Driven Development)
- **@devops**: Esperto DevSecOps per Microsoft ecosystem
- **@lyra**: Specialista ottimizzazione prompt AI

Per dettagli, vedi `.github/agents/` e `MIGRATE_TO_AGENT.md`.

## 🎓 Skills Specs e Utilizzo

Questo template include **skills specializzate** per GitHub Copilot, progettate per accelerare workflow di sviluppo specifici. Le skills sono disponibili nella directory `.github/skills/` e forniscono pattern, best practices e implementazioni di riferimento.

### Skills Incluse

Tutte le skills sono disponibili localmente in `.github/skills/` e vengono utilizzate automaticamente da GitHub Copilot quando necessario.

#### Azure & Cloud Skills

- **[appinsights-instrumentation](.github/skills/appinsights-instrumentation)**: Aggiunge automaticamente Application Insights instrumentation al codice per monitoring e telemetria. Utile per progetti Azure che richiedono tracciamento performance e diagnostica.

- **[azure-resource-visualizer](.github/skills/azure-resource-visualizer)**: Visualizza risorse Azure e dipendenze infrastrutturali. Ideale per comprendere architetture cloud complesse e pianificare deployment.

- **[azure-role-selector](.github/skills/azure-role-selector)**: Assista nella selezione e configurazione dei ruoli Azure RBAC appropriati. Migliora la sicurezza suggerendo permission set minimali secondo il principio di least privilege.

#### Frontend & Design Skills

- **[frontend-design](.github/skills/frontend-design)**: Assistenza nella progettazione di interfacce frontend moderne, con focus su UX/UI patterns, accessibilità e responsive design.

- **[canvas-design](.github/skills/canvas-design)**: Skills specializzate per lavorare con HTML5 Canvas, grafica 2D e visualizzazioni interattive.

#### Document Generation Skills

- **[docx](.github/skills/docx)**: Generazione e manipolazione di documenti Microsoft Word (.docx) tramite codice, utile per report automatici e documentazione.

#### Extensibility Skills

- **[mcp-builder](.github/skills/mcp-builder)**: Costruzione di Model Context Protocol (MCP) servers per estendere le capacità di GitHub Copilot con tool e data sources personalizzati.

### Come Utilizzare le Skills

Le skills sono utilizzate automaticamente da GitHub Copilot quando rileva task correlati. Puoi anche referenziarle esplicitamente:

1. **Usa Copilot normalmente**: Le skills vengono applicate automaticamente quando pertinenti
2. **Referenzia esplicitamente**: "@workspace usa appinsights-instrumentation skill per aggiungere telemetria"
3. **Integra con gli agenti**: Combina con `@prd`, `@plan`, `@tdd`, `@devops`, `@lyra`
4. **Segui i pattern**: Ogni skill include esempi di codice e best practices

### Best Practices per Skills Integration

- **Valida la sicurezza**: Controlla che le implementazioni seguano gli standard di sicurezza
- **Testa approfonditamente**: Verifica ogni integrazione nel contesto del progetto
- **Documenta l'utilizzo**: Aggiungi esempi pratici nelle PR e nella documentazione
- **Segui gli standard**: Applica le istruzioni di coding del template (`.github/instructions/`)
- **Contribuisci**: Migliora le skills esistenti o aggiungine di nuove

Per dettagli completi, consulta [.github/skills/README.md](.github/skills/README.md).

### Skills di Riferimento Esterne

Per ulteriori esempi e pattern, consulta:
- [GitHub Awesome Copilot Skills](https://github.com/github/awesome-copilot/tree/main/skills)
- [Anthropic Skills](https://github.com/anthropics/skills/tree/main/skills)


## ✨ Obiettivo del Progetto

Il **Vibe Coding Template** è progettato per fornire una base solida e standardizzata per lo sviluppo software moderno. Il template include:

1. **Istruzioni di Coding Multi-linguaggio:** Guide dettagliate per C#/.NET, React/TypeScript e principi generali di programmazione
2. **Best Practices di Sviluppo:** Standard consolidati per sicurezza, performance, testing e accessibilità
3. **Workflow Strutturato:** Processi step-by-step per lo sviluppo features con AI assistance
4. **Gestione Progetto:** Istruzioni per Git, Azure DevOps e metodologie Agile

Questo approccio strutturato garantisce codice di qualità, facilità di manutenzione e collaborazione efficace nel team.

## 🛠️ Tecnologie e Linguaggi Supportati

### Frontend Development
- **React + TypeScript** con istruzioni complete per componenti funzionali, hooks e best practices
- **TailwindCSS** per styling responsive e accessibile
- **Playwright** per testing end-to-end

### Backend Development  
- **C# + .NET** con pattern moderni, dependency injection e Entity Framework
- **Async/await** patterns e performance optimization
- **Security-first** approach con validazione inputs e error handling

### Metodologie e Tools
- **Git** con Conventional Commits
- **Azure DevOps** per work items e metodologie Agile
- **Visual Studio Code** come IDE principale
- **pnpm** come package manager

## 📁 Struttura del Progetto

```
.github/
├── agents/                              # Agenti Copilot specializzati
│   ├── prd.agent.md                     # Product Requirements Document assistant
│   ├── plan.agent.md                    # Implementation planning agent
│   ├── tdd.agent.md                     # Test-Driven Development agent
│   ├── devops.agent.md                  # DevSecOps expert agent
│   └── lyra.agent.md                    # AI prompt optimization agent
├── instructions/                        # Istruzioni di coding per linguaggi specifici
│   ├── general-coding.instructions.md   # Best practices generali
│   ├── csharp-dotnet.instructions.md    # Istruzioni C#/.NET
│   ├── react-ts.instructions.md         # Istruzioni React/TypeScript
│   ├── git.instructions.md              # Workflow Git e commit standards
│   └── work-items.instructions.md       # Azure DevOps e metodologie Agile
├── copilot-instructions.md              # Configurazione GitHub Copilot
├── prompts/                             # Template per sviluppo guidato AI
└── chatmodes/                           # DEPRECATED - usa agents invece
```

## 🎯 Caratteristiche Principali

### Sicurezza Prima di Tutto
- **Validazione rigorosa** di tutti gli input esterni
- **Sanitizzazione** degli output per prevenire XSS e injection attacks
- **Gestione errori** che non espone informazioni sensibili
- **Best practices** per autenticazione e autorizzazione

### Qualità del Codice
- **Type safety** con TypeScript strict mode
- **Nullable reference types** in C#
- **Naming conventions** descrittive e consistenti
- **Single Responsibility Principle** e pattern SOLID

### Performance e Accessibilità
- **Ottimizzazioni performance** per frontend e backend
- **WCAG 2.1 AA compliance** per accessibilità
- **Design responsive** per tutti i dispositivi
- **Async/await patterns** per operazioni I/O

### Testing e Qualità
- **Testing automatizzato** con Playwright
- **Unit testing** con pattern Arrange-Act-Assert
- **Copertura** di sicurezza, performance e accessibilità
- **Cross-browser compatibility**

## 🚀 Come Iniziare

### 1. Setup Iniziale
```bash
# Clona il repository
git clone <repository-url>
cd vibe-vscode

# Installa dipendenze (se presente package.json)
pnpm install
```

### 2. Configura il Tuo Progetto
1. **Copia le istruzioni** dalla cartella `.github/instructions/` nel tuo progetto
2. **Personalizza** il file `copilot-instructions.md` con i dettagli del tuo progetto
3. **Adatta** le istruzioni specifiche alle tue esigenze

### 3. Workflow di Sviluppo Guidato AI

Per sviluppare nuove feature usando l'AI assistance con gli **agenti Copilot**:

1. **Crea una PRD** usando `@prd` agent
   ```
   @prd Voglio costruire [descrivi la feature]
   ```

2. **Genera piano di implementazione** con `@plan` agent
   ```
   @plan Crea un piano basato su #MyFeature-PRD.md
   ```

3. **Implementa con TDD** usando `@tdd` agent
   ```
   @tdd Implementa task 1.1 da #task-list.md
   ```

4. **Segui i standard** di commit e branching definiti

Per workflow alternativi, consulta `PRD-README.md`.

## 📋 Standard di Sviluppo

### Git Workflow
- **Conventional Commits** per messaggi di commit chiari
- **Feature branches** con naming pattern `feature/<feature-name>`
- **Atomic commits** con scope specifico
- **Code review** obbligatorio prima del merge

### Struttura del Codice
- **Organizzazione modulare** con separazione delle responsabilità
- **Dependency injection** per testabilità
- **Error boundaries** e gestione errori robusta
- **Documentation** integrata nel codice

### Azure DevOps Integration
- **Work items** strutturati secondo metodologia Agile
- **User Stories** con criteri di accettazione chiari
- **Task breakdown** granulare e stimabile
- **Tracking** completo del progresso

## 🤝 Contribuire al Template

Questo template è progettato per essere esteso e migliorato:

1. **Aggiungi nuovi linguaggi** creando file di istruzioni specifici
2. **Migliora le best practices** basandoti sull'esperienza del team
3. **Estendi i workflow** con nuovi pattern e metodologie
4. **Condividi feedback** per migliorare il template

### Linee Guida per Contributi
- Segui le istruzioni di coding esistenti
- Aggiungi documentazione per nuove funzionalità
- Testa le modifiche prima di proporre pull request
- Mantieni la coerenza con gli standard esistenti

## 📚 Risorse Aggiuntive

### Standard e Documentazione
- **[Conventional Commits](https://www.conventionalcommits.org/)** - Standard per messaggi di commit
- **[WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)** - Linee guida per accessibilità
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - Documentazione TypeScript
- **[.NET Guidelines](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/)** - Best practices .NET

### Skills e AI Tools
- **[GitHub Awesome Copilot Skills](https://github.com/github/awesome-copilot/tree/main/skills)** - Curated Copilot skills per Azure, monitoring e altro
- **[Anthropic Skills](https://github.com/anthropics/skills/tree/main/skills)** - Skills per design, documentation e MCP builders

---

## 🌍 English Summary

### Skills Specs and Usage

This template includes **specialized skills** for GitHub Copilot, designed to accelerate specific development workflows. Skills are available locally in `.github/skills/` and are automatically used by GitHub Copilot when relevant.

**Included Skills:**

- **appinsights-instrumentation**: Adds Application Insights instrumentation for monitoring and telemetry
- **azure-resource-visualizer**: Visualizes Azure resources and infrastructure dependencies
- **azure-role-selector**: Assists in selecting and configuring appropriate Azure RBAC roles
- **frontend-design**: Assistance in designing modern frontend interfaces with focus on UX/UI patterns
- **canvas-design**: Specialized skills for working with HTML5 Canvas and interactive visualizations
- **docx**: Generation and manipulation of Microsoft Word documents programmatically
- **mcp-builder**: Building Model Context Protocol (MCP) servers to extend GitHub Copilot capabilities

**How to Use:**
- Skills are applied automatically by GitHub Copilot when working on related tasks
- Reference explicitly: `@workspace use appinsights-instrumentation skill to add telemetry`
- Combine with agents: `@prd`, `@plan`, `@tdd`, `@devops`, `@lyra`
- Each skill includes code examples, best practices, and implementation guides

For complete details, see [.github/skills/README.md](.github/skills/README.md).

**External References:**
- [GitHub Awesome Copilot Skills](https://github.com/github/awesome-copilot/tree/main/skills)
- [Anthropic Skills](https://github.com/anthropics/skills/tree/main/skills)

---

**Happy Vibe Coding!** 🎵✨

Inizia il tuo prossimo progetto con fiducia utilizzando questo template strutturato e le best practices consolidate.
