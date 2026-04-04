# Plano de Ação — FediBank v1.0

## Objetivo
Construir um MVP visualmente finalizado com prioridade no módulo Bitcoin e base white-label.

## Fase 1 — Fundação (dias 1-3)
1. Setup Next.js + TS + Tailwind + UI kit.
2. Definir design tokens e `brand.json`.
3. Montar layout base (sidebar/header/mobile nav).
4. Criar store global persistida e mocks de adapters.

## Fase 2 — Federação + Wallet BTC (dias 4-7)
1. Onboarding + auth mock.
2. Join federation (search/invite/qr).
3. Dashboard BTC/BRL.
4. Receive/Send LN com estados completos.
5. Activity + export CSV mock.

## Fase 3 — Vault + Stake (dias 8-10)
1. Vault (total/disponível/comprometido).
2. Fluxo de stake com RHF/Zod + PIN.
3. Posições de stake (lista/detalhe/encerramento).
4. Simulação de yield em BRL/USDT.

## Fase 4 — Loans (dias 11-15)
1. Marketplace de ofertas.
2. Criação de oferta lend.
3. Simulador borrow + seleção de colateral.
4. Regras mandatórias em todos os pontos críticos.
5. Gestão de contrato ativo e ações pós-contratação.

## Fase 5 — RWA visual + fechamento (dias 16-18)
1. Landing institucional RWA.
2. Cards de oportunidades e detalhe mock.
3. Integração visual BTC stake -> funding RWA (apenas narrativa + dados mock).
4. Proof-of-reserves e settings.

## Fase 6 — QA e demo (dias 19-20)
1. Testes Vitest (regras de negócio).
2. Testes Playwright (fluxos ponta a ponta).
3. Revisão UX (botões, feedback, validações, loading/error/success).
4. Checklist de release v1.0.

## Dependências externas para evoluir além do mock
- API Fedimint
- gateway LN
- price feed com SLA
- provedor de custódia/ledger
- módulo regulatório/jurídico para RWA
