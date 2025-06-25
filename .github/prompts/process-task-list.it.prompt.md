---
description: "Gestione della Task List in file markdown per monitorare i progressi nel completamento di un PRD"
---
# Gestione della Task List

Linee guida per la gestione delle task list in file markdown per monitorare i progressi nel completamento di un PRD

## Implementazione dei Task

- **Un sotto-task alla volta:** NON iniziare il sotto-task successivo finché non chiedi il permesso all'utente e questi dice "sì" o "y"
- **Protocollo di completamento:**  
  1. Quando completi un **sotto-task**, segnalo immediatamente come completato cambiando `[ ]` in `[x]`.  
  2. Se **tutti** i sotto-task sotto un task principale sono ora `[x]`, segna anche il **task principale** come completato.  
- **Protocollo di Esecuzione:**
  1. Se il progetto è sotto controllo di versione (git), verifica lo stato del repository git
  2. lo stato di git deve essere 'porcelain'
  3. Se ci sono file modificati e non committati, chiedere conferma all'utente su come procedere
  4. Usa sempre le prassi indicate nel file `.github/instructions/git.instructions.md`
  5. Fai un commit per ogni task
- Fermati dopo ogni sotto-task e attendi il via libera dell'utente.

## Manutenzione della Task List

1. **Aggiorna la task list mentre lavori:**
   - Segna task e sotto-task come completati (`[x]`) secondo il protocollo sopra.
   - Aggiungi nuovi task man mano che emergono.

2. **Mantieni aggiornata la sezione "File Rilevanti":**
   - Elenca ogni file creato o modificato.
   - Fornisci per ogni file una breve descrizione della sua funzione.

## Istruzioni per l'AI

Quando lavora con le task list, l'AI deve:

1. Aggiornare regolarmente il file della task list dopo aver completato qualsiasi lavoro significativo.
2. Seguire il protocollo di completamento:
   - Segnare ogni **sotto-task** completato con `[x]`.
   - Segnare il **task principale** con `[x]` una volta che **tutti** i suoi sotto-task sono `[x]`.
3. Aggiungere i nuovi task scoperti.
4. Mantenere la sezione "File Rilevanti" accurata e aggiornata.
5. Prima di iniziare il lavoro, controllare quale sotto-task è il prossimo.
6. Se il progetto è sotto controllo di versione (git), verifica lo stato del repository git
7. lo stato di git deve essere 'porcelain'
8. Se ci sono file modificati e non committati, chiedere conferma all'utente su come procedere
9. Usa sempre le prassi indicate nel file `.github/instructions/git.instructions.md`
10. Fai un commit per ogni task
11. Dopo l'implementazione di un sotto-task, aggiornare il file e poi fermarsi per l'approvazione dell'utente.
