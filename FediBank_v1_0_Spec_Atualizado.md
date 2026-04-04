# FediBank v1.0 — Spec Oficial (Atualizado)

> Documento base para implementação do MVP focado em **Bitcoin-first** com arquitetura **white-label**.
> Escopo de v1.0: experiência visual e interação completa, com mocks e sem integrações de produção.

---

## 1) Visão de produto

O **FediBank v1.0** é um app web de investimentos com linguagem de banco digital institucional.

### Princípios
- Não é app de pagamentos do dia a dia.
- Foco absoluto no módulo **Bitcoin**.
- Módulo **RWA** no v1.0 é principalmente visual e navegável (sem operação financeira real).
- Preparado para multi-tenant (white-label) desde a base.

### Objetivo do usuário
O investidor deve conseguir:
1. Entrar em uma federação (obrigatório).
2. Guardar BTC em Vault (custódia federada).
3. Alocar BTC em Stake para gerar yield em BRL/USDT.
4. Simular e contratar empréstimos com colateral em BTC.
5. Acompanhar saldo, extrato e posições em uma UI premium.

---

## 2) Regras mandatórias de negócio (Bitcoin Loans)

Estas regras devem aparecer em:
- simulador,
- resumo de contrato,
- tooltips,
- modal de confirmação,
- detalhes do contrato ativo.

### Regras
1. **Não existe liquidação automática por variação do preço do BTC.**
2. **Colateral só é executado em caso de inadimplência.**
3. Preço do BTC afeta apenas:
   - taxa,
   - parcelas,
   - projeções de saldo devedor.
4. **LTV máximo de contratação: 100%.**
5. Prazo permitido: **90 a 360 dias**.
6. Modalidade **Bullet**:
   - sem pagamentos até o vencimento,
   - extensão somente quando **LTV <= 50%**.

---

## 3) Arquitetura funcional do v1.0

## 3.1 Seção Bitcoin (prioridade máxima)

### A) Federação (gate de acesso)
- Join por busca, invite link e QR (mock).
- Sem federação ativa, não acessa `/app`.

### B) Wallet BTC (Fedimint-inspired)
- Saldo BTC e equivalente em BRL.
- Receive LN mock: gerar invoice, QR, copiar e simular recebimento.
- Send LN mock: colar invoice, parsear dados, confirmar com PIN, simular sucesso/erro.

### C) Vault
- Saldo total, disponível e comprometido.
- Movimentar BTC entre Vault e Stake.
- Selecionar BTC para colateral em empréstimo.

### D) Stake
- Criar stake com taxa e prazo.
- Yield projetado e acumulado em BRL/USDT (mock).
- Fechamento de posição.
- Estado explícito: ativa, vencida, encerrada.

### E) Loans P2P intra-federação (MVP fechado)
- Marketplace de ofertas.
- Usuário pode atuar como lender ou borrower.
- Fluxo principal do borrower: selecionar oferta existente e contratar.
- Fluxo lender: publicar oferta com termos customizados.

#### Tipos de empréstimo
1. Amortizante.
2. Juros periódicos + principal no final.
3. Bullet.

#### Campos mínimos por oferta
- tipo,
- prazo,
- taxa base,
- moeda de liquidação (BRL/USDT),
- LTV alvo,
- janela de aceitação,
- observações contratuais.

### F) Atividade e controle
- Extrato filtrável.
- Export CSV mock.
- Tela de Proof of Reserves mock.

---

## 3.2 Seção RWA (v1.0 = experiência visual navegável)

### Inclui no MVP
- Landing institucional.
- Marketplace de oportunidades (mock).
- Página de oportunidade (mock):
  - tipo (equity, dívida, recebíveis etc),
  - retorno alvo,
  - prazo,
  - risco,
  - estrutura jurídica simulada.
- Originação/captação em fluxo visual (sem liquidação real).

### Fica para v2+
- tokenização operacional,
- lifecycle jurídico-regulatório completo,
- distribuição real,
- integrações de custódia, compliance e onchain settlement.

---

## 4) Referências e características que devem influenciar o produto

- **Harbor Wallet**: organização da wallet BTC + abordagem Fedimint.
- **Peoples Reserve / Ledn / Arch**: UX de empréstimo colateralizado em BTC e narrativa contratual.
- **Ondo / Maple**: layout institucional para produtos com rendimento.
- **Securitize / Centrifuge**: visão operacional de tokenização e estruturação para ativos reais.
- **Bloxs**: linguagem comercial de originação + distribuição para middle market.
- **Botanix (inspiração técnica futura)**: possíveis caminhos para interoperabilidade BTC x camada de ativos.

---

## 5) White-label obrigatório

- Tema, nome, logo e textos por `brand config`.
- Cada tenant pode ajustar:
  - paleta,
  - tipografia,
  - copy,
  - moedas exibidas,
  - módulos habilitados.

---

## 6) Non-goals do v1.0

- Compra/venda spot de BTC no app.
- Integração bancária/PIX em produção.
- KYC/AML real.
- Liquidação real de RWA.
- Multi-federação com crédito cruzado.

---

## 7) Rotas-alvo do MVP

### Público
`/`, `/onboarding`, `/auth/login`, `/auth/signup`, `/auth/reset`, `/join`, `/join/search`, `/join/invite`, `/join/qr`

### App
`/app`, `/app/bitcoin`, `/app/bitcoin/receive`, `/app/bitcoin/send`, `/app/bitcoin/vault`, `/app/bitcoin/stake`, `/app/bitcoin/stake/new`, `/app/bitcoin/stake/[id]`, `/app/bitcoin/loans`, `/app/bitcoin/loans/borrow/[id]`, `/app/bitcoin/loans/lend/new`, `/app/bitcoin/loans/lend/[id]`, `/app/federation`, `/app/activity`, `/app/security/proof-of-reserves`, `/app/settings`, `/app/rwa`

---

## 8) Critérios de aceite

- UI parece produto final (não wireframe).
- Não há botão morto: toda ação gera navegação, feedback, modal, estado, toast ou erro/sucesso.
- Formulários com validação + loading + erro + sucesso.
- Fluxos críticos testáveis visualmente:
  1. Join federation
  2. Receive BTC
  3. Send BTC
  4. Criar stake
  5. Contratar loan
  6. Criar oferta lend
  7. Ver contrato
  8. Ver proof-of-reserves
  9. Navegar RWA

---

## 9) Evolução natural (integrações futuras)

Quando evoluir além de mock:
1. Fedimint real (mint/fed API).
2. LN gateway real (invoice/payments).
3. Price feed institucional (com SLA).
4. Motor de rendimento e escrituração de passivos.
5. Módulo regulatório RWA (veículo, documentos, distribuição, auditoria).

