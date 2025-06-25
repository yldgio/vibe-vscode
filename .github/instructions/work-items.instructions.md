---
description: Creazione Work Items su Azure DevOps secondo Agile
---

# Prompt per Agente AI: Creazione Work Items su Azure DevOps secondo Agile

1. **Obiettivo**  
   Genera Work Items (User Story, Task, Bug, Epic) per Azure DevOps seguendo le best practice del framework Agile.

2. **Linee guida generali**
   - Utilizza una struttura chiara e concisa.
   - Ogni Work Item deve essere autonomo, testabile e di valore per l’utente finale.
   - Segui la convenzione INVEST (Indipendente, Negozabile, di Valore, Stimabile, Piccolo, Testabile).
   - Scrivi in italiano chiaro e professionale.

3. **User Story**
   - Formato:  
     _Come [ruolo] voglio [funzionalità] così che [beneficio]_
   - Includi criteri di accettazione chiari e misurabili (Given/When/Then).
   - Associa la User Story a un Epic se pertinente.

4. **Task**
   - Descrivi attività tecniche atomiche e assegnabili.
   - Specifica input, output e dipendenze.
   - Limita la durata a massimo 1-2 giorni lavorativi.

5. **Bug**
   - Descrivi il comportamento atteso e quello effettivo.
   - Indica i passi per riprodurre il problema.
   - Specifica ambiente, versione e impatto.

6. **Epic**
   - Definisci obiettivi di business di alto livello.
   - Suddividi l’Epic in User Stories correlate.

7. **PBI (Product Backlog Item)**
   - Descrivi una funzionalità o requisito di prodotto che apporta valore all’utente o al business.
   - Utilizza la stessa struttura delle User Story, includendo criteri di accettazione chiari e misurabili.
   - Associa il PBI a Epic o Initiative se pertinente.
   - Specifica la priorità e la stima (story points o tempo).

8. **Initiative**
   - Rappresenta un obiettivo strategico o un tema di alto livello che raggruppa più Epic o PBIs.
   - Definisci chiaramente lo scopo, i risultati attesi e i criteri di successo.
   - Suddividi l’Initiative in Epic e/o PBIs correlati.
   - Indica la relazione con la roadmap di prodotto o aziendale.

9. **Best Practice Agile**
   - Mantieni Work Items aggiornati e tracciabili.
   - Collega Work Items tra loro (Initiative → Epic → PBI/User Story → Task/Bug).
   - Usa tag e aree per facilitare la ricerca e la categorizzazione.
   - Evita ambiguità e dettagli tecnici superflui nelle User Story e nei PBIs.

10. **Esempio User Story**
   ```
   Come utente autenticato
   voglio poter reimpostare la mia password tramite email
   così che possa recuperare l’accesso in caso di smarrimento.

   Criteri di accettazione:
   - Given un utente autenticato, When richiede il reset, Then riceve un’email con link sicuro.
   - Given il link scaduto, When l’utente tenta l’accesso, Then riceve un messaggio di errore.
   ```

11. **Formato Output**
   - Titolo: [Tipo] - [Breve descrizione]
   - Descrizione: [Dettagli secondo le linee guida sopra]
   - Criteri di accettazione (per User Story/PBI/Bug)
   - Collegamenti (Initiative, Epic, PBI, Task, Bug correlati)
   - Tag/Aree
   - Priorità e stima (per PBI)

12. **Nota**
    - Non includere dati sensibili o informazioni personali.
    - Segui le policy di sicurezza e privacy aziendali.

---
