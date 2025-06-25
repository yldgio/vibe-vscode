# 🚀 Vibe Coding Template per Visual Studio Code

Benvenuti nel **Vibe Coding Template**! Questo repository fornisce un template completo e strutturato per lo sviluppo software con Visual Studio Code, includendo istruzioni di coding, best practices e workflow per multiple tecnologie e linguaggi di programmazione.

Inizia a sviluppare con fiducia seguendo standard professionali consolidati!

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
├── instructions/           # Istruzioni di coding per linguaggi specifici
│   ├── general-coding.instructions.md     # Best practices generali
│   ├── csharp-dotnet.instructions.md      # Istruzioni C#/.NET
│   ├── react-ts.instructions.md           # Istruzioni React/TypeScript
│   ├── git.instructions.md                # Workflow Git e commit standards
│   └── work-items.instructions.md         # Azure DevOps e metodologie Agile
├── copilot-instructions.md                # Configurazione GitHub Copilot
└── prompts/                               # Template per sviluppo guidato AI
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

Per sviluppare nuove feature usando l'AI assistance:

1. **Crea una PRD** usando i template forniti
2. **Genera task list** dettagliate dalla PRD  
3. **Implementa step-by-step** con revisione e approvazione di ogni task
4. **Segui i standard** di commit e branching definiti

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

- **[Conventional Commits](https://www.conventionalcommits.org/)** - Standard per messaggi di commit
- **[WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)** - Linee guida per accessibilità
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - Documentazione TypeScript
- **[.NET Guidelines](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/)** - Best practices .NET

---

**Happy Vibe Coding!** 🎵✨

Inizia il tuo prossimo progetto con fiducia utilizzando questo template strutturato e le best practices consolidate.
