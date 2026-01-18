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

Questo template può essere arricchito con **skills specializzate** per Copilot e altri sistemi AI, progettate per accelerare workflow di sviluppo specifici. Di seguito alcune **curated skills** di riferimento da repository esterni che puoi studiare e adattare al tuo progetto.

### GitHub Copilot Skills (awesome-copilot)

La repository [github/awesome-copilot](https://github.com/github/awesome-copilot/tree/main/skills) contiene skills progettate per integrazioni e task avanzati:

- **[appinsights-instrumentation](https://github.com/github/awesome-copilot/tree/main/skills/appinsights-instrumentation)**: Aggiunge automaticamente Application Insights instrumentation al codice per monitoring e telemetria. Utile per progetti Azure che richiedono tracciamento performance e diagnostica.

- **[azure-resource-visualizer](https://github.com/github/awesome-copilot/tree/main/skills/azure-resource-visualizer)**: Visualizza risorse Azure e dipendenze infrastrutturali. Ideale per comprendere architetture cloud complesse e pianificare deployment.

- **[azure-role-selector](https://github.com/github/awesome-copilot/tree/main/skills/azure-role-selector)**: Assiste nella selezione e configurazione dei ruoli Azure RBAC appropriati. Migliora la sicurezza suggerendo permission set minimali secondo il principio di least privilege.

### Anthropic Skills

La repository [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills) offre skills per design, documentazione e building tools:

- **[frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design)**: Assistenza nella progettazione di interfacce frontend moderne, con focus su UX/UI patterns, accessibilità e responsive design.

- **[canvas-design](https://github.com/anthropics/skills/tree/main/skills/canvas-design)**: Skills specializzate per lavorare con HTML5 Canvas, grafica 2D e visualizzazioni interattive.

- **[docx](https://github.com/anthropics/skills/tree/main/skills/docx)**: Generazione e manipolazione di documenti Microsoft Word (.docx) tramite AI, utile per report automatici e documentazione.

- **[mcp-builder](https://github.com/anthropics/skills/tree/main/skills/mcp-builder)**: Costruzione di Model Context Protocol (MCP) servers per estendere le capacità degli AI agents con tool e data sources personalizzati.

### Come Utilizzare le Skills

1. **Esplora le repositories esterne** per comprendere struttura e implementazione delle skills
2. **Adatta le skills al tuo contesto** seguendo i pattern del progetto e le best practices
3. **Integra con gli agenti Copilot** esistenti (`@prd`, `@plan`, `@tdd`, `@devops`, `@lyra`)
4. **Referenzia le skills nei prompt** per task specifici (es. "@devops usa pattern da azure-role-selector per configurare RBAC")
5. **Mantieni coerenza** con gli standard di sicurezza, testing e accessibilità del template

### Best Practices per Skills Integration

- **Valida la sicurezza**: Controlla che le skills non introducano vulnerabilità
- **Testa approfonditamente**: Ogni skill deve essere testata nel contesto del progetto
- **Documenta l'utilizzo**: Aggiungi esempi pratici di come usare ogni skill
- **Segui gli standard**: Applica le istruzioni di coding del template (`.github/instructions/`)
- **Versionamento**: Traccia le skills utilizzate e le loro versioni per riproducibilità

**Nota**: Le skills referenziate sono esempi esterni da studiare e adattare. Non sono incluse direttamente in questo template ma rappresentano pattern e approcci consigliati.

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

This template can be enriched with **specialized skills** for Copilot and other AI systems, designed to accelerate specific development workflows. The following curated skills from external repositories can be studied and adapted to your project:

**GitHub Copilot Skills** ([awesome-copilot](https://github.com/github/awesome-copilot/tree/main/skills)):
- **appinsights-instrumentation**: Adds Application Insights instrumentation for monitoring and telemetry
- **azure-resource-visualizer**: Visualizes Azure resources and infrastructure dependencies
- **azure-role-selector**: Assists in selecting and configuring appropriate Azure RBAC roles

**Anthropic Skills** ([anthropics/skills](https://github.com/anthropics/skills/tree/main/skills)):
- **frontend-design**: Assistance in designing modern frontend interfaces with focus on UX/UI patterns
- **canvas-design**: Specialized skills for working with HTML5 Canvas and interactive visualizations
- **docx**: Generation and manipulation of Microsoft Word documents via AI
- **mcp-builder**: Building Model Context Protocol (MCP) servers to extend AI agents capabilities

For detailed documentation on how to use and integrate these skills, refer to the "Skills Specs e Utilizzo" section above.

---

**Happy Vibe Coding!** 🎵✨

Inizia il tuo prossimo progetto con fiducia utilizzando questo template strutturato e le best practices consolidate.
