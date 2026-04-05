# FediBank v1.0 — Spec Resumido

> Sincronizado com `FediBank_v1_0_Spec_Atualizado.md`

## Stack
Next.js 14 · TypeScript · TailwindCSS · Zustand persist · React Hook Form + Zod · Sonner · Vitest + Playwright

## Tokens Suportados
- **BTC** — reserva de valor, colateral
- **BRL** — saldo em reais, yield de stake
- **USDT** — saldo em dólar estável

## Regras Críticas (Empréstimos)
1. Sem liquidação automática por variação de preço do BTC
2. Colateral executado apenas em inadimplência
3. Preço BTC afeta apenas juros, parcelas e projeções
4. LTV máximo: 100%
5. Prazo: 90–360 dias
6. Extensão Bullet: apenas se LTV ≤ 50%

## Módulos Implementados
- Federação (join search/invite/QR)
- Dashboard (BTC + BRL + USDT)
- Receive/Send Lightning (mock)
- Vault (custódia multisig Fedimint)
- Stake (yield BRL, taxa+prazo fixos, tabela projeção)
- Loans marketplace (3 tipos: amortizing, interest_only, bullet)
- Activity log + CSV export
- Proof of Reserves (mock)
- RWA placeholder institucional
- Settings + logout
- GitHub Pages showcase (`docs/index.html`)
