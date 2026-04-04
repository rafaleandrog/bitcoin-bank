# Prompt para Codex — Construção do FediBank v1.0

Você é um engenheiro(a) sênior full-stack responsável por construir uma aplicação web de produção chamada **FediBank v1.0**.

## Missão
Entregar uma aplicação UI-first com aparência de produto final e fluxos interativos completos, mesmo com backend mockado.

## Prioridade máxima
**Módulo Bitcoin** deve ser o mais completo e refinado do produto.

## Stack obrigatória
- Next.js (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui (ou sistema equivalente)
- React Hook Form + Zod
- Zustand (estado com persistência local)
- Mock backend (Route Handlers/MSW)
- Vitest + Playwright

## Regras de negócio mandatórias (Loans)
1. Sem liquidação automática por preço BTC.
2. Colateral executado apenas em inadimplência.
3. Preço do BTC afeta juros/parcelas/projeções.
4. Bullet só estende com LTV <= 50%.
5. LTV máximo 100%.
6. Prazo 90–360 dias.

Exiba essas regras claramente em:
- simulação,
- tooltips,
- resumo contratual,
- modal de confirmação.

## Escopo funcional obrigatório do v1.0

### 1) Federação
- gate obrigatório antes de acessar /app
- join por search / invite / qr (mock)

### 2) Bitcoin
- dashboard com saldos BTC + BRL
- receive LN mock (invoice, QR, copy, simular recebimento)
- send LN mock (parse invoice, PIN, sucesso/erro)
- Vault
- Stake (yield em BRL/USDT)
- Loans P2P intra-federação:
  - marketplace
  - criar oferta lend
  - aceitar oferta borrow
  - simulação + confirmação com PIN
  - gestão de contrato ativo

### 3) RWA (placeholder funcional)
- landing institucional
- cards de oportunidades (equity, dívida, recebíveis)
- detalhe da operação com indicadores mock
- CTA “Coming soon” + trilha visual de evolução

## UX / UI
- dark mode institucional
- acento laranja
- visual premium
- botões sem dead-end
- todos os formulários com validação + loading + erro + sucesso

## Rotas
Implemente todas as rotas do spec atualizado (`FediBank_v1_0_Spec_Atualizado.md`, seção 7).

## Entregáveis técnicos
- `/app`, `/components`, `/features`, `/lib`, `/mocks`, `/config`, `/docs`
- `brand.json` para white-label
- `docs/spec.md` sincronizado com o escopo
- testes básicos Vitest + Playwright
- README com comandos:
  - `pnpm install`
  - `pnpm dev`

## Qualidade esperada
- código limpo, modular, reutilizável
- estados vazios/carregando/erro/sucesso visíveis
- sem integrações reais (somente mocks)
- pronto para demo executiva

## Roadmap pós-v1 (deixe comentários TODO no código)
- integração Fedimint real
- integração LN real
- módulo regulatório e operacional de tokenização RWA
- integração de compliance/KYC

Agora escreva todo o código necessário para entregar a experiência completa do v1.0.
