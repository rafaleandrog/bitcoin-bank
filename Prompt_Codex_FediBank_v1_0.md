# Prompt para Codex — FediBank v1.0

Você é um engenheiro(a) sênior full-stack responsável por construir e manter uma aplicação web chamada **FediBank v1.0** — um app de investimento white-label Bitcoin-first com seção de ativos RWA.

---

## MISSÃO PRINCIPAL

Construir uma interface web completamente funcional do ponto de vista visual e interativo. Cada página, botão, formulário, input, output, tabela, modal e notificação **deve funcionar corretamente** como em uma versão final de produto — mesmo que o backend seja inteiramente mockado e o app não se conecte a serviços reais.

**O critério de aceite é**: qualquer pessoa que abrir o app no browser consegue navegar, preencher formulários, simular operações e ver resultados visuais coerentes, sem encontrar estados em branco, erros, botões sem ação ou navegação quebrada.

---

## STACK OBRIGATÓRIA

```
Framework:    Next.js 14 (App Router, TypeScript)
Estilização:  TailwindCSS 3 (dark mode, design tokens customizados)
Estado:       Zustand 5 com persist middleware (localStorage)
Formulários:  React Hook Form + Zod
Notificações: Sonner (toast)
QR Code:      qrcode.react (QRCodeSVG)
Ícones:       Lucide React
UI Primitivos: @radix-ui/react-dialog, @radix-ui/react-tooltip
Testes:       Vitest (unit) + Playwright (e2e)
```

**Proibido** adicionar dependências não listadas acima sem justificativa explícita.

---

## DESIGN SYSTEM

### Tokens Tailwind (tailwind.config.ts)

```js
colors: {
  bg: '#08090c',
  panel: '#12141a',
  accent: '#f7931a',
}
```

### Classes globais (globals.css)

```css
.card     { @apply bg-panel border border-zinc-800 rounded-xl p-4 shadow-sm; }
.btn      { @apply px-4 py-2 rounded-lg font-medium transition-colors; }
.btn-primary   { @apply btn bg-accent text-black hover:bg-amber-500; }
.btn-secondary { @apply btn border border-zinc-600 text-zinc-200 hover:border-accent; }
.input    { @apply w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white; }
.label    { @apply text-xs font-semibold uppercase tracking-widest text-zinc-400; }
```

### Paleta

- Background principal: `#08090c`
- Painéis/cards: `#12141a`
- Accent (Bitcoin orange): `#f7931a`
- Texto primário: `#ffffff`
- Texto secundário: `#a1a1aa`
- Sucesso: `text-emerald-400`
- Alerta: `text-amber-300`
- Erro: `text-red-400`

---

## ARQUITETURA DE ARQUIVOS

```
/app                          Next.js App Router
  /app/(dashboard)
    layout.tsx                AppShell + proteção federação
    page.tsx                  Dashboard (saldos BTC, BRL, USDT)
    /bitcoin
      page.tsx                Hub Bitcoin (4 quick links)
      /receive/page.tsx       Receber via LN
      /send/page.tsx          Enviar via LN
      /vault/page.tsx         Vault
      /stake
        page.tsx              Lista de stakes
        /new/page.tsx         Criar stake
        /[id]/page.tsx        Detalhe do stake
      /loans
        page.tsx              Marketplace de empréstimos
        /borrow/[id]/page.tsx Contratar empréstimo
        /lend/new/page.tsx    Criar oferta de empréstimo
        /lend/[id]/page.tsx   Detalhe da oferta
    /activity/page.tsx
    /federation/page.tsx
    /security/proof-of-reserves/page.tsx
    /rwa/page.tsx
    /settings/page.tsx
/components
  app-shell.tsx               Layout principal com sidebar
  rule-banner.tsx             Banner de regra de colateral
/lib
  types.ts                    Interfaces TypeScript
  store.ts                    Zustand store
  loan.ts                     Funções de negócio (LTV, extensão, regras)
/features/adapters/index.ts   Adaptadores mock
/config/brand.json            Configuração white-label
/docs/index.html              Showcase GitHub Pages
```

---

## ESTADO GLOBAL (lib/store.ts)

O store Zustand deve conter e persistir:

```typescript
interface State {
  // Federação
  joinedFederation: boolean;
  federationName?: string;

  // Saldos
  btcBalance: number;          // default: 0.24
  btcPriceBrl: number;         // default: 350000
  brlBalance: number;          // default: 1850.00
  usdtBalance: number;         // default: 320.00

  // Segurança
  pin: string;                 // default: "1234"

  // Posições
  stakes: StakePosition[];
  offers: LoanOffer[];
  loans: LoanContract[];
  activity: ActivityEntry[];

  // Ações
  joinFederation(name: string): void;
  receiveBtc(btc: number): void;
  sendBtc(btc: number): boolean;
  addStake(s: StakePosition): void;
  closeStake(id: string): void;
  addOffer(o: LoanOffer): void;
  addLoan(l: LoanContract): void;
  addBrl(amount: number): void;
  addUsdt(amount: number): void;
}
```

---

## TIPOS (lib/types.ts)

```typescript
export type ActivityType = "receive" | "send" | "stake" | "loan" | "federation";

export interface ActivityEntry {
  id: string;
  type: ActivityType;
  desc: string;
  amount: string;
  at: string; // ISO date string
}

export interface StakePosition {
  id: string;
  btc: number;
  rate: number;           // taxa anual em %
  durationDays: number;
  yieldProjectedBrl: number;
  yieldAccumulatedBrl: number;
  startDate: string;      // ISO date string
  status: "active" | "closed";
}

export interface LoanOffer {
  id: string;
  apr: number;
  durationDays: number;
  minBrl: number;
  maxBrl: number;
  type: "amortizing" | "interest_only" | "bullet";
}

export interface LoanContract {
  id: string;
  offerId: string;
  borrowedBrl: number;
  collateralBtc: number;
  ltv: number;
  type: LoanOffer["type"];
  apr: number;
  durationDays: number;
  startDate: string;
  status: "active" | "repaid";
}
```

---

## FUNÇÕES DE NEGÓCIO (lib/loan.ts)

```typescript
// Calcula LTV: (empréstimo BRL / (colateral BTC * preço BTC)) * 100
export function calcLtv(loanBrl, collateralBtc, btcPriceBrl): number

// Extensão de bullet só permitida se LTV <= 50%
export function canExtendBullet(ltv): boolean

// Texto da regra obrigatória
export function loanRuleLabel(): string

// Gera tabela de amortização SAC (retorna array de parcelas)
export function calcAmortizationTable(principal, apr, durationDays): AmortizationRow[]

// Gera preview de empréstimo interest_only
export function calcInterestOnlyPreview(principal, apr, durationDays): { monthlyInterest, totalInterest, balloonPayment }

// Gera preview de empréstimo bullet
export function calcBulletPreview(principal, apr, durationDays): { totalDue, extensionAllowed }
```

---

## PÁGINAS — ESPECIFICAÇÃO DETALHADA

### /app (Dashboard)

Exibir 4 cards de saldo:
1. **BTC Balance** — valor em BTC + equivalente em R$
2. **BRL** — saldo em reais (vindo de `store.brlBalance`)
3. **USDT** — saldo em dólar (vindo de `store.usdtBalance`)
4. **Rendimento** — soma de yield acumulado de todos os stakes ativos

Abaixo dos cards: 4 botões de ação rápida: Vault, Stake, Empréstimos, Receber BTC.

Abaixo: tabela de atividade recente (últimas 5 entradas, link para `/app/activity`).

---

### /app/bitcoin/receive

- Título: "Receber Bitcoin via Lightning Network"
- Subtítulo: "Transfira de qualquer carteira ou corretora externa (ex: Bipa). Não há compra de BTC dentro do app."
- Input para quantidade em sats
- Botão "Gerar Invoice"
- Ao gerar: exibir QR code (QRCodeSVG) + texto da invoice (quebra automática) + botão "Copiar invoice"
- Botão "Simular recebimento" (para testes) — chama `store.receiveBtc(sats/1e8)` e exibe toast de sucesso

---

### /app/bitcoin/vault

Layout com 3 cards:
1. **Total em Custódia** = btcBalance + allocated (stakes ativos)
2. **Alocado em Stake** = soma de btc de stakes com status "active"
3. **Disponível no Vault** = btcBalance

Badge destacado: "Protegido pelos Guardiões da Federação" com ícone de escudo.

Botão: "Alocar em Stake" → `/app/bitcoin/stake/new`
Botão: "Receber BTC" → `/app/bitcoin/receive`

Explicação: "O Vault mantém seu BTC sob custódia multisig da federação Fedimint. Sem risco de contraparte."

---

### /app/bitcoin/stake/new

Formulário com React Hook Form + Zod:
- Input: **Quantidade BTC** (min 0.0001, validação de saldo disponível)
- Input: **Taxa anual %** (min 1, max 30)
- Input: **Duração em dias** (min 30, max 365)
- Input: **PIN** (obrigatório)

**Resumo de contratação** (calculado em tempo real conforme preenchimento):
- Valor em BRL do BTC alocado
- Yield projetado total em BRL
- Yield mensal estimado em BRL
- Data de início e data de vencimento

**Tabela de projeção de yield** (gerada ao preencher taxa e duração):
| Mês | Data | Yield estimado (BRL) | Acumulado |
|-----|------|---------------------|-----------|

Mostrar pelo menos 4 linhas de projeção mensal.

Aviso em destaque: "Ao confirmar, seu BTC sai do Vault e fica disponível como colateral para operações RWA. Taxa e prazo não podem ser alterados após a contratação."

Botão: "Confirmar Stake" (PIN obrigatório) → toast de sucesso → redireciona para `/app/bitcoin/stake`

---

### /app/bitcoin/stake/[id]

Header com ID e status badge (active/closed).

4 cards:
1. BTC alocado
2. Taxa % ao ano
3. Prazo restante (dias)
4. Data de vencimento

**Seção de Yield:**
- Yield Acumulado em BRL (com barra de progresso % do projetado)
- Yield Projetado Total em BRL
- Percentual de conclusão

**Mini gráfico de yield** (SVG inline simulado): linha crescente mostrando acumulação ao longo do tempo.

Botão: "Encerrar Stake Antecipadamente" (btn-secondary, exige confirmação via modal) → `closeStake(id)` → toast → redireciona para lista.

---

### /app/bitcoin/loans

Duas seções:

**Ofertas Disponíveis:**
Lista de cards com:
- APR %
- Tipo (badge colorido: Amortizando / Juros+Balloon / Bullet)
- Prazo
- Faixa de valor (min - max BRL)
- Botão "Contratar" → `/app/bitcoin/loans/borrow/[id]`

**Meus Contratos Ativos:**
Tabela com: ID, valor, colateral BTC, LTV%, tipo, status

Botão: "Criar Oferta de Empréstimo" → `/app/bitcoin/loans/lend/new`

`<RuleBanner/>` fixo no topo da página.

---

### /app/bitcoin/loans/borrow/[id]  ← PÁGINA CRÍTICA

Esta página é o coração do módulo de empréstimos. Deve ser clara, completa e funcionar perfeitamente.

**Estrutura:**

1. `<RuleBanner/>` no topo com ícone de escudo e texto: "Seu BTC não será liquidado por queda de preço. O colateral só é executado em caso de inadimplência."

2. **Informações da oferta**: APR, prazo, tipo (badge).

3. **Formulário de entrada:**
   - Input: Valor do empréstimo em BRL (validar entre minBrl e maxBrl)
   - Input: Colateral BTC (step 0.0001)

4. **LTV Indicator dinâmico** (atualiza em tempo real):
   - Verde: LTV ≤ 50%
   - Amarelo: LTV 51–80%
   - Vermelho: LTV 81–100%
   - Bloqueado: LTV > 100% (impede confirmação)
   - Texto: "LTV: 72.3% — Preço do BTC afeta parcelas e saldo, não dispara liquidação."

5. **Painel de projeção por tipo** (renderizado conforme `offer.type`):

   **Se `amortizing`:**
   - Título: "Amortização Padrão — Parcelas mensais desde o início"
   - Tabela de amortização (SAC simplificado, mínimo 4 linhas):
     | Parcela | Vencimento | Amortização | Juros | Total | Saldo |

   **Se `interest_only`:**
   - Título: "Juros + Balloon — Pague apenas os juros durante o período"
   - Card com:
     - Parcela mensal (juros): R$ X
     - Período: N meses
     - Pagamento final (balloon): R$ X (principal completo)
     - Total pago: R$ X

   **Se `bullet`:**
   - Título: "Bullet — Sem pagamentos até o vencimento (modelo Ledn)"
   - Card com:
     - Saldo devedor no vencimento: R$ X (principal + juros acumulados)
     - Data de vencimento: DD/MM/AAAA
     - Extensão de prazo: disponível se LTV ≤ 50% — indicador dinâmico
     - Texto: "Nenhum pagamento obrigatório até o vencimento. Você pode estender o prazo se seu LTV estiver abaixo de 50%."

6. **Input PIN**

7. **Botão "Confirmar Contrato":**
   - Valida PIN, LTV ≤ 100%, campos preenchidos
   - Chama `store.addLoan(...)` com todos os campos
   - Toast de sucesso
   - Redireciona para `/app/bitcoin/loans`

---

### /app/bitcoin/loans/lend/new

Formulário para criar oferta:
- APR % (min 1, max 50)
- Duração em dias (90–360)
- Valor mínimo e máximo em BRL
- Seletor de tipo: 3 opções com descrição de cada uma
- PIN

Ao confirmar: `store.addOffer(...)` → toast → redirect para marketplace.

---

### /app/activity

Filtros por tipo (all | receive | send | stake | loan | federation).

Tabela: Data/hora, Tipo (badge), Descrição, Valor.

Botão "Exportar CSV" (gera e baixa arquivo CSV dos itens filtrados).

---

### /app/rwa

Placeholder institucional premium.

Header com título "Investimentos RWA" e subtítulo explicativo.

Grid de 3 cards de oportunidades mock:
1. **FIDC SP Prime Offices** — CRI, 13,5% a.a., 24 meses
2. **CCB Agro Export Fund** — CCB, 16,2% a.a., 18 meses
3. **Nota Promissória TechCo** — Nota Promissória, 22% a.a., 12 meses

Cada card: nome, tipo (badge), retorno alvo, duração, mínimo, botão "Em breve" (disabled).

Banner: "Conecte seu BTC ao mercado de capitais. Em breve você poderá investir em ativos reais com o yield do seu Stake como ponto de entrada."

Botão: "Entrar na lista de espera" (abre modal com input de email + botão confirmar que fecha o modal com toast).

---

### /app/settings

- Tema (dark apenas por ora)
- Moeda base (BRL / USDT)
- PIN: exibir mascarado com botão "alterar" (abre modal com PIN atual + novo PIN + confirmar)
- Federação atual com botão "sair da federação"
- Botão "Sair" (limpa localStorage e redireciona para `/`)

---

## COMPONENTE: RuleBanner

```tsx
// components/rule-banner.tsx
export function RuleBanner() {
  return (
    <div className="card border-l-4 border-l-accent bg-amber-500/10 flex gap-3 items-start">
      <ShieldCheck className="text-accent mt-0.5 shrink-0" size={20} />
      <div>
        <p className="font-semibold text-amber-300 text-sm">Regra de Proteção do Colateral</p>
        <p className="text-zinc-200 text-sm mt-0.5">
          Seu BTC <strong>não será liquidado</strong> por queda de preço.
          O colateral é executado apenas em caso de inadimplência.
          Variações de preço afetam apenas juros, parcelas e projeções.
        </p>
      </div>
    </div>
  );
}
```

---

## REGRAS OBRIGATÓRIAS DE QUALIDADE

1. **Sem botões mortos**: todo botão executa uma ação (navegação, ação de estado, modal, toast) — nunca deixe um botão sem `onClick` ou sem resultado visível.
2. **Sem estados em branco**: toda lista vazia deve mostrar um estado vazio explicativo com CTA. Ex: "Você ainda não tem stakes. [Criar meu primeiro stake →]"
3. **Formulários completos**: todo formulário tem validação de campos obrigatórios, tipos e limites. Erros exibidos inline abaixo do campo.
4. **Feedback imediato**: toda ação de estado mostra toast de sucesso ou erro.
5. **Tipos TypeScript**: nenhum `any` explícito. Usar interfaces de `lib/types.ts`.
6. **PIN em operações financeiras**: stake, empréstimo, envio de BTC exigem PIN "1234" (default do mock).
7. **Responsividade**: funcionar corretamente em viewport ≥ 375px (mobile) e ≥ 1024px (desktop).

---

## ADAPTADORES MOCK (features/adapters/index.ts)

Manter os adaptadores existentes. Para v1.0, todos os serviços externos são mockados:

```typescript
FedimintAdapter.connect()         // → { status: "connected" }
LightningAdapter.generateInvoice(sats) // → string invoice mock
LightningAdapter.parseInvoice(str)     // → { destination, amountSats }
LightningAdapter.payInvoice()          // → { ok: boolean } (90% sucesso)
PriceFeedAdapter.btcBrl()              // → 350000
YieldEngineAdapter.projectedBrlYield(btc, rate, days, price) // → number
FederationAdapter.search(query)        // → [{ id, name, members }]
FederationAdapter.join()               // → { joined: true }
```

---

## WHITE-LABEL (config/brand.json)

```json
{
  "name": "FediBank",
  "version": "1.0",
  "theme": "dark",
  "primaryColor": "#f7931a",
  "currency": "BRL",
  "tagline": "Institutional Bitcoin banking"
}
```

Usar `brand.name` no AppShell e landing page. Usar `brand.primaryColor` como accent onde aplicável.

---

## SHOWCASE GITHUB PAGES (docs/index.html)

Criar um único arquivo HTML auto-contido (sem dependências externas, sem CDN) com:

- Dark theme idêntico ao app (#08090c bg, #f7931a accent)
- Navegação via tabs JavaScript vanilla: Dashboard | Bitcoin | Vault | Stake | Empréstimos | RWA
- Cada tab mostra o mock interativo da respectiva tela
- LTV calculator funcional (inputs + cálculo JS)
- Tabela de amortização simulada (gerada por JS)
- RuleBanner em destaque
- Totalmente responsivo
- Zero dependências externas — apenas HTML + CSS + JS inline

Arquivo `docs/.nojekyll` deve existir para GitHub Pages funcionar corretamente.

---

## CONEXÕES FUTURAS (não implementar agora — apenas documentar em comentários)

```typescript
// TODO v2.0: substituir FedimintAdapter por integração real com Fedimint SDK
// TODO v2.0: substituir LightningAdapter por LDK ou CLN real
// TODO v2.0: substituir PriceFeedAdapter por Coingecko/Yadio API
// TODO v2.0: auth backend (Supabase ou equivalente)
// TODO v2.0: KYC/AML via provider regulatório
// TODO v3.0: RWA marketplace real via Securitize/Centrifuge APIs
// TODO v3.0: Botanix Labs bridge BTC-EVM para colateral onchain
// TODO v3.0: P2P lending entre federações via protocolo Fedimint inter-federation
```

---

## TESTES

### Unitários (Vitest)

- `calcLtv()`: valores nominais, zeros, extremos
- `canExtendBullet()`: LTV = 50 (true), LTV = 51 (false)
- `calcAmortizationTable()`: verificar soma das amortizações = principal
- `YieldEngineAdapter.projectedBrlYield()`: verificar fórmula

### E2E (Playwright)

- Fluxo: join federation → dashboard visível
- Fluxo: receber BTC → saldo aumenta
- Fluxo: criar stake → aparece na lista
- Fluxo: contratar empréstimo tipo bullet → aparece em contratos ativos
- Fluxo: filtrar activity por tipo → lista filtrada corretamente

---

## CHECKLIST DE ENTREGA

### Produto
- [ ] Todas as rotas listadas existem e carregam sem erro
- [ ] Fluxo Bitcoin (receive → vault → stake → loans) navegável de ponta a ponta
- [ ] 3 modalidades de empréstimo visualmente distintas com projeções simuladas
- [ ] RuleBanner visível em todas as páginas de empréstimo
- [ ] Dashboard com saldos BTC, BRL e USDT
- [ ] Stake com tabela de projeção de yield

### Código
- [ ] Sem `any` TypeScript explícito
- [ ] Sem botões sem ação
- [ ] Sem estados de lista vazia sem CTA
- [ ] Formulários com validação e erros inline
- [ ] PIN obrigatório em operações financeiras

### Qualidade
- [ ] `pnpm build` sem erros
- [ ] `pnpm test` passa
- [ ] `docs/index.html` abre no browser sem dependências externas

### GitHub
- [ ] `docs/index.html` presente
- [ ] `docs/.nojekyll` presente
- [ ] README com instrução de ativação do GitHub Pages
