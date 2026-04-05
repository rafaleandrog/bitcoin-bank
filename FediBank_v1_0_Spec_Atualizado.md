# FediBank v1.0 — Especificação do Produto

> Versão: 1.0 | Última atualização: 2026-04-04

---

## 1. Visão do Produto

**FediBank** é um app de investimento white-label que combina a segurança do Bitcoin via protocolo Fedimint com oportunidades de investimento em ativos do mundo real (RWA). O produto não é uma carteira para pagamentos do dia a dia — é uma plataforma de investimento e custódia institucional com linguagem de banco digital premium.

### Princípios

- **Bitcoin-first**: BTC é a reserva de valor central. Toda a arquitetura orbita em torno do protocolo Fedimint.
- **White-label**: Totalmente configurável via `config/brand.json`. Nome, cores, moeda base e tagline são instanciáveis por operador.
- **Não-custodial por padrão**: O BTC do usuário fica sob custódia federada (guardiões). O usuário tem controle explícito sobre qualquer alocação fora do Vault.
- **Sem liquidação forçada por preço**: Empréstimos com colateral em BTC nunca sofrem liquidação automática por queda de preço. Execução do colateral ocorre somente em inadimplência.
- **Institucional**: Design, terminologia e fluxos seguem o padrão de plataformas de investimento profissional, não de fintech de varejo.

---

## 2. Seções Principais

### 2.1 Seção Bitcoin (v1.0 — Foco Principal)

Construída sobre o protocolo **Fedimint** (referência de implementação: [Harbor Wallet](https://github.com/HarborWallet/harbor)).

O usuário faz a entrada de BTC via **Lightning Network** a partir de carteiras externas ou corretoras (ex: Bipa). Não há compra de BTC dentro do app.

Após o depósito, o usuário tem três caminhos:

#### 2.1.1 Vault
- BTC 100% dentro da federação
- Protegido pelos guardiões da federação (multisig Fedimint)
- Função de poupança simples — sem rendimento, sem risco operacional
- ecash gerado pela federação pode ser usado em transações internas

#### 2.1.2 Stake
- O investidor aloca BTC para receber yield em BRL (ou USDT) a uma taxa e prazo fixados no momento da contratação
- Ao fazer Stake, o investidor cede custódia do BTC da federação e o disponibiliza como colateral para captadores (lado RWA)
- Taxa e prazo são imutáveis após contratação
- Projeção de yield em BRL calculada na tela de contratação e exibida com tabela de datas
- O investidor pode fechar a posição antes do vencimento (sujeito a regras de saída antecipada)

#### 2.1.3 Empréstimos com Colateral BTC

Modelo baseado em [Peoples Reserve](https://www.peoplesreserve.com/) e [Ledn](https://www.ledn.io/pt).

**Regras Obrigatórias (invioláveis):**

| # | Regra |
|---|-------|
| 1 | Não há liquidação automática por variação de preço do BTC |
| 2 | O colateral é executado somente em caso de inadimplência |
| 3 | A variação do preço do BTC afeta apenas juros, parcelas e projeções |
| 4 | LTV máximo: 100% |
| 5 | Prazo: 90 a 360 dias |
| 6 | Extensão de prazo em modalidade Bullet: permitida somente se LTV ≤ 50% |

**Três Modalidades de Empréstimo:**

**Tipo 1 — Amortização Padrão (SAC/PRICE)**
- Pagamento de parcelas mensais desde o início
- Amortização do principal + juros a cada parcela
- Tabela de amortização simulada exibida antes da confirmação

**Tipo 2 — Juros + Balloon**
- Durante o período contratado, o tomador paga apenas os juros mensais
- O principal é pago integralmente no vencimento (balloon payment)
- Adequado para quem quer maximizar liquidez no período

**Tipo 3 — Bullet (modelo Ledn)**
- Sem obrigação de pagamento de qualquer valor até o vencimento
- Saldo devedor (principal + juros acumulados) pago ao final
- Extensão de prazo disponível se LTV ≤ 50% no momento do pedido de extensão
- Adequado para holders de longo prazo que não querem fluxo de caixa comprometido

---

### 2.2 Seção RWA — Ativos do Mundo Real (Blueprint para versões futuras)

Baseada nas referências:
- **[Ondo Finance](https://ondo.finance/)** — yielded products onchain
- **[Securitize](https://securitize.io/institutional-tokenization)** — tokenização de ativos, fundos privados, SPEs, SCPs
- **[Centrifuge](https://centrifuge.io/)** — RWA tokenization para gestores e investidores
- **[Maple Finance](https://maple.finance/)** — asset management onchain institucional
- **[Bloxs](https://bloxs.com.br/pt-BR)** — plataforma de distribuição e originação de operações middle market
- **[Botanix Labs](https://botanixlabs.com/)** — bridge BTC-EVM para vincular colateral BTC com RWA onchain
- **[Arch Lending](https://archlending.com/)** — empréstimo institucional com garantia BTC

**Tipos de veículos de investimento planejados:**

| Tipo | Descrição |
|------|-----------|
| Participação em Negócios | Equity em empresas via tokenização |
| CRI | Certificado de Recebíveis Imobiliários |
| CCB | Cédula de Crédito Bancário |
| SCP | Sociedade em Conta de Participação |
| Nota Promissória | Título de dívida corporativo |
| Fundo Privado | Estrutura de fundo fechado tokenizado |

**Conexão BTC ↔ RWA:**
- BTC em Stake na federação pode ser usado como colateral por captadores do lado RWA
- O yield pago ao investidor de Stake vem dos resultados das operações RWA que usaram o BTC como garantia
- Botanix Labs serve como ponte técnica entre a custódia BTC (Fedimint) e contratos EVM de RWA

**Visão v1.0**: apenas placeholder visual institucional com cards de oportunidades mock. Sem operações reais.

---

## 3. Tokens e Saldos Suportados

| Token | Função | Gerado por |
|-------|--------|-----------|
| BTC | Reserva de valor, colateral | Depósito via LN externo |
| ecash (eCash BTC) | Transações internas na federação | Fedimint mint |
| BRL | Saldo em reais, yield de Stake | Mock / futuro: integração bancária |
| USDT | Saldo em dólar estável, yield de Stake | Mock / futuro: stablecoin bridge |

---

## 4. Arquitetura Técnica

### Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Next.js 14 (App Router), TypeScript |
| Estilização | TailwindCSS 3 + design tokens customizados |
| Estado | Zustand 5 com `persist` middleware (localStorage) |
| Formulários | React Hook Form + Zod |
| Notificações | Sonner |
| QR Code | qrcode.react |
| Testes | Vitest (unit) + Playwright (e2e) |

### Design Tokens

```json
{
  "bg": "#08090c",
  "panel": "#12141a",
  "accent": "#f7931a",
  "textPrimary": "#ffffff",
  "textSecondary": "#a1a1aa"
}
```

### Adaptadores Mock (v1.0)

```
features/adapters/index.ts
  FedimintAdapter   — conexão com federação (mock)
  LightningAdapter  — geração/pagamento de invoice LN (mock)
  PriceFeedAdapter  — preço BTC/BRL (estático: R$ 350.000)
  YieldEngineAdapter — cálculo de yield projetado
  FederationAdapter — busca e entrada em federação (mock)
```

### White-label

```json
// config/brand.json
{
  "name": "FediBank",
  "version": "1.0",
  "theme": "dark",
  "primaryColor": "#f7931a",
  "currency": "BRL",
  "tagline": "Institutional Bitcoin banking"
}
```

---

## 5. Rotas MVP v1.0

### Públicas

| Rota | Descrição |
|------|-----------|
| `/` | Landing page com hero e CTA |
| `/onboarding` | Onboarding explicativo |
| `/auth/login` | Login com email/senha |
| `/auth/signup` | Cadastro |
| `/auth/reset` | Recuperação de senha |
| `/join` | Menu para entrar na federação |
| `/join/search` | Buscar federação por nome |
| `/join/invite` | Entrar via link de convite |
| `/join/qr` | Entrar via QR code |

### App (federação obrigatória)

| Rota | Descrição |
|------|-----------|
| `/app` | Dashboard (saldos BTC, BRL, USDT) |
| `/app/bitcoin` | Hub Bitcoin |
| `/app/bitcoin/receive` | Receber BTC via LN |
| `/app/bitcoin/send` | Enviar BTC via LN |
| `/app/bitcoin/vault` | Gestão do Vault |
| `/app/bitcoin/stake` | Lista de stakes ativos |
| `/app/bitcoin/stake/new` | Criar novo stake |
| `/app/bitcoin/stake/[id]` | Detalhe do stake |
| `/app/bitcoin/loans` | Marketplace de empréstimos |
| `/app/bitcoin/loans/borrow/[id]` | Contratar empréstimo |
| `/app/bitcoin/loans/lend/new` | Criar oferta de empréstimo |
| `/app/bitcoin/loans/lend/[id]` | Detalhe da oferta |
| `/app/activity` | Histórico de atividades |
| `/app/federation` | Status da federação |
| `/app/security/proof-of-reserves` | Prova de reservas |
| `/app/rwa` | RWA marketplace (placeholder v1.0) |
| `/app/settings` | Configurações |

---

## 6. Fluxo do Usuário (Happy Path Bitcoin)

```
Landing → Onboarding → Login/Signup
  → Join Federation (search / invite / QR)
  → Dashboard (saldos BTC + BRL + USDT)
  → Receive BTC via LN (invoice + QR + simulação)
  → Vault (visualizar BTC alocado e disponível)
  → Stake (escolher taxa % + prazo + ver projeção de yield em BRL)
  → Loans (escolher oferta → selecionar tipo → preencher valores → confirmar com PIN)
  → Activity (histórico)
```

---

## 7. Regras de Negócio Críticas

### 7.1 Empréstimos

1. **Sem liquidação por preço**: implementada em `lib/loan.ts → loanRuleLabel()` e exibida via `<RuleBanner/>` em todas as páginas de empréstimo.
2. **LTV calculado em tempo real**: `calcLtv(loanBrl, collateralBtc, btcPriceBrl)` — alertas visuais verde/amarelo/vermelho.
3. **Extensão Bullet**: `canExtendBullet(ltv)` retorna `true` apenas se `ltv <= 50`.
4. **PIN obrigatório** em toda operação financeira: stake, empréstimo, envio.

### 7.2 Stake

1. Taxa e prazo são fixados no momento da contratação e não podem ser alterados.
2. Yield é pago em BRL (ou USDT), nunca em BTC.
3. Ao fazer Stake, o BTC sai do Vault e fica alocado.
4. O investidor cede custódia — o BTC fica disponível como colateral para captadores RWA.

### 7.3 Federação

1. O acesso ao `/app` é bloqueado até o usuário entrar em uma federação.
2. A federação é o pré-requisito para qualquer operação com BTC.

---

## 8. Referências de Produto

| Referência | O que foi incorporado |
|------------|----------------------|
| [Harbor Wallet](https://github.com/HarborWallet/harbor) | Visual e fluxos do Fedimint, ecash, federação |
| [Peoples Reserve](https://www.peoplesreserve.com/) | Modelo de empréstimo sem liquidação por preço, colateral BTC |
| [Ondo Finance](https://ondo.finance/) | Yielded products, conexão com outras plataformas |
| [Securitize](https://securitize.io/institutional-tokenization) | Tokenização de ativos, fundos privados, SPEs, SCPs |
| [Centrifuge](https://centrifuge.io/) | RWA onchain para gestores e investidores |
| [Maple Finance](https://maple.finance/) | Asset management onchain, produtos financeiros seguros |
| [Bloxs](https://bloxs.com.br/pt-BR) | Plataforma sell-side/buy-side middle market |
| [Botanix Labs](https://botanixlabs.com/) | Bridge BTC-EVM para vincular colateral BTC com RWA onchain |
| [Ledn](https://www.ledn.io/pt) | Empréstimo Bullet sem parcelas + extensão por LTV |
| [Arch Lending](https://archlending.com/) | Modelo de garantia institucional com BTC |

---

## 9. Roadmap

### v1.0 (atual)
- [x] Federação mock (join via search/invite/QR)
- [x] Wallet Bitcoin (receive/send LN mock)
- [x] Vault
- [x] Stake com yield projetado em BRL
- [x] Empréstimos P2P (3 modalidades, sem liquidação por preço)
- [x] Activity log com filtros e export CSV
- [x] Prova de reservas mock
- [x] RWA placeholder institucional
- [x] Dashboard com saldos BTC + BRL + USDT
- [x] Showcase GitHub Pages (`docs/index.html`)

### v2.0 (planejado)
- [ ] Integração real com Fedimint SDK
- [ ] Lightning Network real (LDK ou CLN)
- [ ] Price feed real (Coingecko, Yadio BRL)
- [ ] Auth backend (Supabase ou similar)
- [ ] KYC/AML básico
- [ ] RWA marketplace com operações reais (integração Securitize/Centrifuge)
- [ ] Botanix Labs bridge BTC-EVM
- [ ] Notificações push de yield e vencimentos

### v3.0+ (visão)
- [ ] P2P lending entre federações diferentes
- [ ] Tokenização de ativos via Securitize
- [ ] Fundo privado automatizado
- [ ] Conformidade regulatória CVM
- [ ] Multi-federação e interoperabilidade

---

## 10. Não-escopo v1.0

- Pagamentos do dia a dia (Pix, débito, crédito)
- Compra de BTC dentro do app
- KYC/AML real
- Saldo em conta bancária real
- Transações entre federações diferentes
- Integração real com qualquer plataforma externa
