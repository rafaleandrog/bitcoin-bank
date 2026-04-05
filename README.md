# FediBank v1.0

App de investimento white-label Bitcoin-first, construído sobre o protocolo Fedimint. Interface institucional premium para custódia, stake e empréstimos com colateral BTC, com blueprint de ativos RWA.

> **Demo visual:** [GitHub Pages](https://rafaleandrog.github.io/bitcoin-bank/) — ative em Settings → Pages → Source: `docs/`

---

## Visão geral

| Seção | Descrição |
|-------|-----------|
| **Bitcoin** | Depósito via LN, Vault, Stake com yield em BRL, Empréstimos com colateral BTC |
| **RWA** | Placeholder institucional — CRI, CCB, SCP, Notas, Fundos (versões futuras) |

**Regra central dos empréstimos**: Sem liquidação automática por queda de preço do BTC. O colateral só é executado em caso de inadimplência. (Modelo Peoples Reserve / Ledn)

---

## Início rápido

```bash
pnpm install
pnpm dev
```

Acesse: `http://localhost:3000`

**Fluxo de demonstração:**
1. Landing → Onboarding
2. Join Federation → buscar "Brasil" → entrar
3. Dashboard → saldos BTC + BRL + USDT
4. Receber BTC via Lightning (simular)
5. Vault → Stake → Empréstimos (3 modalidades)

**PIN padrão de demonstração**: `1234`

---

## Scripts

```bash
pnpm dev        # servidor de desenvolvimento
pnpm build      # build de produção
pnpm start      # servidor de produção
pnpm test       # testes unitários (Vitest)
pnpm test:e2e   # testes E2E (Playwright)
```

---

## Stack

- **Next.js 14** (App Router, TypeScript)
- **TailwindCSS 3** (dark theme, design tokens: `bg #08090c`, `accent #f7931a`)
- **Zustand 5** (estado persistido em localStorage)
- **React Hook Form + Zod** (formulários com validação)
- **Sonner** (notificações toast)
- **Vitest + Playwright** (testes)

---

## Estrutura principal

```
app/                  Next.js App Router (28 rotas)
  app/                Dashboard, Bitcoin, Stake, Loans, RWA, Settings
  auth/               Login, Signup, Reset
  join/               Entrar em uma federação
components/           AppShell, RuleBanner
lib/                  types.ts, store.ts, loan.ts
features/adapters/    Adaptadores mock (Fedimint, LN, Price, Yield)
config/brand.json     Configuração white-label
docs/index.html       Showcase estático GitHub Pages
```

---

## Modalidades de empréstimo

| Tipo | Funcionamento |
|------|---------------|
| **Amortização Padrão** | Parcelas mensais desde o início (SAC/PRICE) |
| **Juros + Balloon** | Apenas juros mensais + principal no vencimento |
| **Bullet (Ledn)** | Sem pagamentos até o vencimento; extensão se LTV ≤ 50% |

---

## GitHub Pages (showcase visual)

1. Vá em **Settings → Pages**
2. Source: **Deploy from branch**
3. Branch: `claude/cleanup-code-github-view-WT2vP` (ou `main` após merge)
4. Folder: `/docs`
5. Salvar — o site ficará disponível em `https://rafaleandrog.github.io/bitcoin-bank/`

---

## White-label

Editar `config/brand.json` para customizar nome, cor, moeda base e tagline.

```json
{
  "name": "FediBank",
  "primaryColor": "#f7931a",
  "currency": "BRL",
  "tagline": "Institutional Bitcoin banking"
}
```

---

## Referências de produto

- [Harbor Wallet](https://github.com/HarborWallet/harbor) — implementação Fedimint
- [Peoples Reserve](https://www.peoplesreserve.com/) — empréstimo sem liquidação por preço
- [Ledn](https://www.ledn.io/pt) — modelo Bullet com extensão por LTV
- [Ondo Finance](https://ondo.finance/) — yielded products
- [Securitize](https://securitize.io/institutional-tokenization) — tokenização de ativos
- [Centrifuge](https://centrifuge.io/) — RWA onchain
- [Maple Finance](https://maple.finance/) — asset management institucional
- [Bloxs](https://bloxs.com.br/pt-BR) — distribuição e originação middle market
- [Botanix Labs](https://botanixlabs.com/) — bridge BTC-EVM
- [Arch Lending](https://archlending.com/) — garantia institucional BTC

---

## Roadmap

- **v1.0** (atual): UI completa com mocks, fluxo Bitcoin end-to-end, showcase GitHub Pages
- **v2.0**: Fedimint SDK real, Lightning real, price feed real, auth backend, KYC básico
- **v3.0+**: RWA marketplace real, tokenização, bridge Botanix, P2P inter-federações
