---
description: 'Generate complete end-to-end tests using Playwright in TypeScript'
mode: 'generate'
---

# Istruzioni per Generazione Test Playwright

## Processo di Generazione Test
- Analizza lo scenario di test fornito dal prompt
- Genera un test Playwright completo e ottimizzato in TypeScript 
- Utilizza `@playwright/test` come framework di riferimento
- Salva il test generato nella directory `tests/`
- Esegui e itera il test fino al suo completo funzionamento

## Requisiti Obbligatori
- Genera test completi, non implementazioni incrementali passo-passo
- Evita di utilizzare strumenti MCP Playwright per esecuzioni step-by-step
- Includi commenti esplicativi per sezioni complesse del test
- Verifica che il test copra tutti gli aspetti dello scenario richiesto
- Includi assertions significative per validare correttamente il comportamento
