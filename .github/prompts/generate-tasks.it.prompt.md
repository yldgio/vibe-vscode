---
description: "Generating a task list from an existing Product Requirements Document (PRD)"
---
# Regola: Generazione di una Task List da un PRD

## Obiettivo

Guidare un assistente AI nella creazione di una lista di attività dettagliata e graduale in formato Markdown basata su un Documento dei Requisiti di Prodotto (PRD) esistente. La task list dovrebbe guidare uno sviluppatore attraverso l'implementazione.

## Output

- **Formato:** Markdown (`.md`)
- **Posizione:** `/tasks/`
- **Nome del file:** `tasks-[nome-file-prd].md` (es., `tasks-prd-modifica-profilo-utente.md`)

## Processo

1.  **Ricevere Riferimento al PRD:** L'utente indica all'AI un file PRD specifico
2.  **Analizzare il PRD:** L'AI legge e analizza i requisiti funzionali, le user story e altre sezioni del PRD specificato.
3.  **Fase 1: Generare Task Principali:** Basandosi sull'analisi del PRD, creare il file e generare i task principali di alto livello necessari per implementare la funzionalità. Usare il proprio giudizio su quanti task di alto livello utilizzare. Probabilmente saranno circa 5. Presentare questi task all'utente nel formato specificato (senza ancora i sotto-task). Informare l'utente: "Ho generato i task di alto livello basati sul PRD. Pronto a generare i sotto-task? Rispondi con 'Vai' per procedere."
4.  **Attendere Conferma:** Fermarsi e attendere che l'utente risponda con "Vai".
5.  **Fase 2: Generare Sotto-Task:** Una volta che l'utente conferma, scomporre ogni task principale in sotto-task più piccoli e azionabili necessari per completare il task principale. Assicurarsi che i sotto-task seguano logicamente dal task principale e coprano i dettagli di implementazione impliciti nel PRD.
6.  **Identificare File Rilevanti:** Basandosi sui task e sul PRD, identificare potenziali file che dovranno essere creati o modificati. Elencarli nella sezione `File Rilevanti`, inclusi i file di test corrispondenti se applicabile.
7.  **Generare Output Finale:** Combinare i task principali, i sotto-task, i file rilevanti e le note nella struttura Markdown finale.
8.  **Salvare la Task List:** Salvare il documento generato nella directory `/tasks/` con il nome file `tasks-[nome-file-prd].md`, dove `[nome-file-prd]` corrisponde al nome base del file PRD di input (es., se l'input era `prd-modifica-profilo-utente.md`, l'output è `tasks-prd-modifica-profilo-utente.md`).

## Formato Output

La task list generata _deve_ seguire questa struttura:

```markdown
## File Rilevanti

- `percorso/del/potenziale/file1.ts` - Breve descrizione del motivo per cui questo file è rilevante (es., Contiene il componente principale per questa funzionalità).
- `percorso/del/file1.test.ts` - Test unitari per `file1.ts`.
- `percorso/di/un/altro/file.tsx` - Breve descrizione (es., Gestore della route API per l'invio dati).
- `percorso/di/un/altro/file.test.tsx` - Test unitari per `altro/file.tsx`.
- `lib/utils/helpers.ts` - Breve descrizione (es., Funzioni di utilità necessarie per i calcoli).
- `lib/utils/helpers.test.ts` - Test unitari per `helpers.ts`.

### Note

- I test unitari dovrebbero tipicamente essere posizionati accanto ai file di codice che stanno testando (es., `MyComponent.tsx` e `MyComponent.test.tsx` nella stessa directory).
- Usare `npx jest [percorso/opzionale/del/file/test]` per eseguire i test. L'esecuzione senza un percorso esegue tutti i test trovati dalla configurazione Jest.

## Task

- [ ] 1.0 Titolo Task Principale
  - [ ] 1.1 [Descrizione sotto-task 1.1]
  - [ ] 1.2 [Descrizione sotto-task 1.2]
- [ ] 2.0 Titolo Task Principale
  - [ ] 2.1 [Descrizione sotto-task 2.1]
- [ ] 3.0 Titolo Task Principale (potrebbe non richiedere sotto-task se puramente strutturale o di configurazione)
```

## Modello di Interazione

Il processo richiede esplicitamente una pausa dopo la generazione dei task principali per ottenere la conferma dell'utente ("Vai") prima di procedere a generare i sotto-task dettagliati. Questo assicura che il piano di alto livello sia allineato con le aspettative dell'utente prima di approfondire i dettagli.

## Pubblico Target

Assumere che il lettore principale della task list sia uno **sviluppatore junior** che implementerà la funzionalità.
