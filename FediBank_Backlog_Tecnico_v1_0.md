# FediBank v1.0 — Backlog Técnico

> Documento operacional para execução e manutenção do MVP v1.0.
> Critério geral: toda tela navegável, toda ação com feedback, sem estados quebrados.

---

## Status da implementação

| Épico | Status |
|-------|--------|
| Fundação (stack, design system) | Completo |
| Federação (join/search/invite/QR) | Completo |
| Dashboard (BTC + BRL + USDT) | Completo |
| Receive via Lightning | Completo |
| Send via Lightning | Completo |
| Vault | Completo |
| Stake (novo + lista + detalhe) | Completo |
| Loans Marketplace | Completo |
| Loan Borrow (3 modalidades) | Completo |
| Activity + CSV export | Completo |
| Settings + Proof of Reserves | Completo |
| RWA Placeholder institucional | Completo |
| GitHub Pages showcase (docs/index.html) | Completo |

---

## Épicos e critérios de aceite

### E1 — Fundação
- [x] Next.js 14 App Router configurado
- [x] TailwindCSS com design tokens (bg, panel, accent)
- [x] Classes globais: `.card`, `.btn-primary`, `.btn-secondary`, `.input`, `.label`
- [x] Zustand store com persist middleware
- [x] `config/brand.json` para white-label
- [x] `features/adapters/index.ts` com todos os mocks

### E2 — Federação (gate do app)
- [x] Redirect para `/join` se `joinedFederation = false`
- [x] `/join` com 3 opções: busca, convite, QR
- [x] `/join/search`: input + lista de resultados + botão entrar
- [x] `/join/invite`: input de link + botão entrar
- [x] `/join/qr`: simulação de escaneamento de QR
- [x] Após entrar: redirect para `/app`

### E3 — Dashboard
- [x] Card BTC balance + equivalente BRL
- [x] Card saldo BRL (`store.brlBalance`)
- [x] Card saldo USDT (`store.usdtBalance`)
- [x] Card rendimento acumulado (soma de stakes ativos)
- [x] Quick actions: Vault, Stake, Empréstimos, Receber
- [x] Atividade recente (últimas 5, link para `/app/activity`)

### E4 — Receive via Lightning
- [x] Input sats
- [x] Botão gerar invoice → string mock
- [x] QR code (QRCodeSVG)
- [x] Botão copiar invoice
- [x] Botão simular recebimento → store.receiveBtc → toast
- [x] Mensagem: "Sem compra de BTC no app — transfira de carteira externa"

### E5 — Send via Lightning
- [x] Input de invoice
- [x] Parse invoice → exibir destino e valor
- [x] Input PIN
- [x] Botão confirmar → store.sendBtc → toast (sucesso ou saldo insuficiente)

### E6 — Vault
- [x] Card: Total em custódia = btcBalance + allocated
- [x] Card: Alocado em Stake
- [x] Card: Disponível no Vault
- [x] Badge "Protegido pelos Guardiões da Federação"
- [x] Botão: Alocar em Stake → `/app/bitcoin/stake/new`
- [x] Botão: Receber BTC → `/app/bitcoin/receive`

### E7 — Stake
- [x] Lista: cards de stakes com status, BTC, taxa, prazo, yield acumulado
- [x] Estado vazio com CTA para criar
- [x] Novo Stake: formulário RHF+Zod (BTC, taxa, duração, PIN)
- [x] Tabela de projeção de yield mensal em BRL
- [x] Resumo de contratação (valor BRL, yield total, data vencimento)
- [x] Detalhe: 4 cards + barra de progresso yield + mini gráfico SVG
- [x] Fechar stake: modal de confirmação → closeStake → toast

### E8 — Loans Marketplace
- [x] Lista de ofertas com APR, tipo, prazo, faixa de valor
- [x] Badges coloridos por tipo (amortizing / interest_only / bullet)
- [x] Meus contratos ativos (tabela)
- [x] Botão criar oferta → `/app/bitcoin/loans/lend/new`
- [x] `<RuleBanner/>` no topo

### E9 — Loan Borrow (CRÍTICO)
- [x] `<RuleBanner/>` proeminente
- [x] Inputs: valor BRL + colateral BTC
- [x] LTV indicator dinâmico (verde/amarelo/vermelho)
- [x] **Tipo amortizing**: tabela SAC preview (≥ 4 linhas)
- [x] **Tipo interest_only**: parcela mensal + balloon final
- [x] **Tipo bullet**: saldo devedor no vencimento + extensão por LTV
- [x] PIN obrigatório
- [x] Validação: LTV ≤ 100%, PIN correto, campos dentro dos limites
- [x] store.addLoan → toast → redirect

### E10 — Activity
- [x] Filtros: all | receive | send | stake | loan | federation
- [x] Tabela: data, tipo badge, descrição, valor
- [x] Exportar CSV dos itens filtrados

### E11 — Settings + Proof of Reserves + Federation
- [x] Settings: moeda base, PIN (alterar via modal), logout
- [x] Proof of Reserves: custody BTC, issued, verification ID mock
- [x] Federation: status da conexão, nome, guardiões

### E12 — RWA Placeholder
- [x] Header explicativo
- [x] 3 cards de oportunidades mock (CRI, CCB, Nota Promissória)
- [x] Modal de lista de espera com input email
- [x] Banner de conexão BTC ↔ RWA

### E13 — GitHub Pages Showcase
- [x] `docs/index.html` auto-contido (zero deps externas)
- [x] Tabs: Dashboard | Bitcoin | Vault | Stake | Empréstimos | RWA
- [x] LTV calculator interativo (JS vanilla)
- [x] Dark theme idêntico ao app
- [x] `docs/.nojekyll` presente

---

## Checklist de PR

### Geral
- [ ] Todas as rotas do spec existem e respondem 200
- [ ] `pnpm build` sem erros
- [ ] `pnpm test` passa (Vitest)
- [ ] Nenhum botão sem ação
- [ ] Nenhuma lista vazia sem estado vazio com CTA
- [ ] Nenhum `any` TypeScript explícito

### Bitcoin (foco crítico v1.0)
- [ ] Fluxo completo: join → dashboard → receive → vault → stake → loan
- [ ] 3 modalidades de empréstimo com projeções simuladas distintas
- [ ] LTV indicator dinâmico e correto
- [ ] `<RuleBanner/>` em todas as páginas de empréstimo
- [ ] PIN obrigatório em stake, empréstimo, envio

### Visual
- [ ] Dark theme consistente (#08090c background, #f7931a accent)
- [ ] Responsivo em 375px e 1024px
- [ ] Badges de tipo coloridos e legíveis
- [ ] Barras de progresso e estados visuais funcionando

### Documentação
- [ ] `FediBank_v1_0_Spec_Atualizado.md` atualizado
- [ ] `Prompt_Codex_FediBank_v1_0.md` atualizado
- [ ] `docs/spec.md` sincronizado
- [ ] `README.md` com instrução GitHub Pages

---

## Definição de "Done" (v1.0)

1. Todas as 19 rotas existem e carregam sem erro
2. Fluxo Bitcoin navegável de ponta a ponta com dados mockados
3. 3 modalidades de empréstimo visualmente distintas
4. Regra de proteção de colateral claramente comunicada
5. Dashboard com saldos BTC + BRL + USDT
6. Stake com tabela de projeção de yield
7. `docs/index.html` funciona offline (zero dependências externas)
8. `pnpm test` passa
9. README com instrução de deploy GitHub Pages
