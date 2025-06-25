---
description: "Generazione di un Product Requirements Document (PRD) in formato Markdown"
---
# Regola: Generazione di un Product Requirements Document (PRD)

## Obiettivo

Guidare un assistente AI nella creazione di un Product Requirements Document (PRD) dettagliato in formato Markdown, basato su una richiesta iniziale dell'utente. Il PRD deve essere chiaro, attuabile e adatto per essere compreso e implementato da uno sviluppatore junior.

## Processo

1.  **Ricezione Richiesta Iniziale:** L'utente fornisce una breve descrizione o richiesta per una nuova funzionalità.
2.  **Domande di Chiarimento:** Prima di scrivere il PRD, l'AI *deve* porre domande di chiarimento per raccogliere dettagli sufficienti. L'obiettivo è comprendere il "cosa" e il "perché" della funzionalità, non necessariamente il "come" (che sarà compito dello sviluppatore).
3.  **Generazione PRD:** Basandosi sulla richiesta iniziale e sulle risposte dell'utente alle domande di chiarimento, generare un PRD utilizzando la struttura delineata di seguito.
4.  **Salvataggio PRD:** Salvare il documento generato come `prd-[nome-funzionalità].md` nella directory `/tasks`.

## Domande di Chiarimento (Esempi)

L'AI dovrebbe adattare le sue domande in base alla richiesta, ma ecco alcune aree comuni da esplorare:

*   **Problema/Obiettivo:** "Quale problema risolve questa funzionalità per l'utente?" o "Qual è l'obiettivo principale che vogliamo raggiungere con questa funzionalità?"
*   **Utente Target:** "Chi è l'utente principale di questa funzionalità?"
*   **Funzionalità Core:** "Puoi descrivere le azioni chiave che un utente dovrebbe poter eseguire con questa funzionalità?"
*   **User Stories:** "Potresti fornire alcune user story? (es., Come [tipo di utente], voglio [eseguire un'azione] in modo da [beneficio].)"
*   **Criteri di Accettazione:** "Come sapremo quando questa funzionalità è stata implementata con successo? Quali sono i criteri chiave di successo?"
*   **Ambito/Limiti:** "Ci sono cose specifiche che questa funzionalità *non deve* fare (non-obiettivi)?"
*   **Requisiti Dati:** "Che tipo di dati deve visualizzare o manipolare questa funzionalità?"
*   **Design/UI:** "Esistono mockup di design o linee guida UI da seguire?" o "Puoi descrivere l'aspetto e il comportamento desiderati?"
*   **Casi Limite:** "Ci sono potenziali casi limite o condizioni di errore da considerare?"

## Struttura PRD

Il PRD generato deve includere le seguenti sezioni:

1.  **Introduzione/Panoramica:** Descrivere brevemente la funzionalità e il problema che risolve. Dichiarare l'obiettivo.
2.  **Obiettivi:** Elencare gli obiettivi specifici e misurabili per questa funzionalità.
3.  **User Stories:** Dettagliare le narrative utente che descrivono l'utilizzo e i benefici della funzionalità.
4.  **Requisiti Funzionali:** Elencare le funzionalità specifiche che la feature deve avere. Utilizzare un linguaggio chiaro e conciso (es., "Il sistema deve permettere agli utenti di caricare una foto profilo"). Numerare questi requisiti.
5.  **Non-Obiettivi (Fuori Ambito):** Dichiarare chiaramente cosa questa funzionalità *non* includerà per gestire l'ambito.
6.  **Considerazioni di Design (Opzionale):** Collegare mockup, descrivere requisiti UI/UX o menzionare componenti/stili rilevanti se applicabile.
7.  **Considerazioni Tecniche (Opzionale):** Menzionare eventuali vincoli tecnici noti, dipendenze o suggerimenti (es., "Dovrebbe integrarsi con il modulo Auth esistente").
8.  **Metriche di Successo:** Come verrà misurato il successo di questa funzionalità? (es., "Aumentare il coinvolgimento degli utenti del 10%", "Ridurre i ticket di supporto relativi a X").
9.  **Domande Aperte:** Elencare eventuali domande rimanenti o aree che necessitano di ulteriori chiarimenti.

## Pubblico Target

Assumere che il lettore principale del PRD sia uno **sviluppatore junior**. Pertanto, i requisiti devono essere espliciti, non ambigui ed evitare il gergo tecnico quando possibile. Fornire dettagli sufficienti per comprendere lo scopo e la logica core della funzionalità.

## Output

*   **Formato:** Markdown (`.md`)
*   **Posizione:** `/tasks/`
*   **Nome File:** `prd-[nome-funzionalità].md`

## Istruzioni Finali

1. NON iniziare l'implementazione del PRD
2. Assicurarsi di porre all'utente domande di chiarimento
3. Prendere le risposte dell'utente alle domande di chiarimento e migliorare il PRD
