# FediBank v1.0 — Spec Simplificado do MVP
> Versão focada no lançamento inicial. Prioridade máxima: módulo Bitcoin.
> White-label preparado desde o início. RWA fica pronto visualmente, mas com escopo funcional futuro.

---

## 1. Objetivo do produto

O **FediBank v1.0** é um app web responsivo de investimento com arquitetura preparada para white-label, inspirado em banco digital e plataforma de investimentos, mas **não voltado para pagamentos cotidianos**.

No v1.0, o foco é entregar uma experiência premium e totalmente navegável para o lado **Bitcoin**, com:

- entrada em uma **Federação** via convite, link ou QR Code;
- custódia e saldo em BTC dentro do contexto da federação;
- depósitos e saques via **Lightning Network**;
- opção de manter BTC no **Vault**;
- opção de alocar BTC em **Stake** para receber yield em **BRL**;
- empréstimos com BTC em colateral, com UX inspirada em Peoples Reserve, Ledn e Arch;
- interface pronta para white-label;
- área inicial de **RWA** apenas como vitrine e placeholder visual, usando referência visual do Bloxs e simulando um investimento imobiliário.

---

## 2. Regra central de colateral

**Esta regra deve aparecer em todas as telas de empréstimo, contratação, resumo de contrato e FAQ.**

- O LTV **não causa liquidação automática** por oscilação de preço do BTC.
- O colateral em BTC **só pode ser executado em caso de inadimplência**, conforme regras do contrato.
- A variação do preço do BTC pode alterar **taxa, parcelas, saldo projetado e condições de renovação**, conforme o tipo do contrato.
- Não existem margin calls forçadas no MVP.
- No plano bullet, a extensão de prazo só pode ser solicitada quando o **LTV estiver em 50% ou menos**.
- O **LTV máximo de contratação no MVP é 100%**.
- Prazo dos empréstimos no MVP: **mínimo 90 dias e máximo 360 dias**.

---

## 3. Escopo do MVP v1.0

## 3.1 Entra no v1.0

### Acesso e federação
- onboarding educativo;
- criar conta, login, reset de senha;
- entrar em federação por link, QR Code ou busca por nome;
- estado obrigatório de “usuário dentro de uma federação” para acessar o app;
- PIN de 6 dígitos exigido apenas em ações críticas.

### Bitcoin
- dashboard principal;
- saldo em BTC e BRL;
- receive via Lightning;
- send via Lightning;
- Vault;
- Stake com yield em BRL;
- Loans com foco em:
  - borrower escolhendo oferta existente como fluxo principal;
  - lender criando oferta;
  - marketplace de ofertas;
  - detalhe e gestão do contrato;
- activity/extrato;
- prova de reservas mock;
- configurações básicas.

### White-label
- tenant padrão chamado **FediBank**;
- arquitetura de tema configurável via arquivo de marca;
- componentes preparados para futura troca de nome, logo e paleta.

### RWA
- rota pronta;
- cards e landing visual prontos;
- uma simulação de oportunidade em **mercado imobiliário**;
- referência visual inspirada em Bloxs;
- sem motor transacional real no v1.0.

## 3.2 Fica para versões futuras
- compra de BTC dentro do app;
- integração fiat real com PIX;
- login real com biometria nativa;
- múltiplas federações ativas simultaneamente com operações cruzadas;
- borrower criando pedido para lenders responderem;
- tokenização RWA operacional;
- equity, CRI, CCB, SCP, nota promissória e outros veículos reais;
- conexões regulatórias e operacionais externas;
- governança completa;
- bonds;
- DCA;
- notificações reais;
- integração real com Fedimint, LN, price feed, custódia e KYC.

---

## 4. Posicionamento de UX

O app deve parecer uma mistura de:
- wallet premium de Bitcoin;
- painel de crédito com colateral BTC;
- plataforma de investimentos institucional.

### Direção visual do v1.0
- tema principal dark;
- laranja como cor de ação principal;
- cinzas escuros com áreas de alto contraste;
- cards com aparência premium;
- CTAs fortes;
- dashboard limpo e institucional;
- área RWA com linguagem mais “marketplace profissional”.

### Referências de produto
- Harbor: estrutura de wallet e relação com Fedimint;
- Peoples Reserve: lógica narrativa do colateral e empréstimo;
- Ledn e Arch: simuladores e gestão do crédito;
- Bloxs: visual profissional para pipeline e oportunidades;
- Maple, Ondo, Securitize, Centrifuge: influência para futuro institucional, sem necessidade de implementação real no v1.0.

---

## 5. Regras funcionais principais

## 5.1 Entrada na federação
O usuário não navega no app “solto”. Antes de acessar a área principal, ele:
- encontra a federação por busca;
- ou entra por link;
- ou entra por QR Code;
- e então passa a operar dentro de uma federação ativa.

## 5.2 PIN de segurança
PIN obrigatório apenas para:
- enviar BTC;
- contratar stake;
- contratar empréstimo;
- quitar empréstimo;
- encerrar stake;
- ações críticas equivalentes.

## 5.3 Saldo
O app mostra:
- saldo em BTC;
- saldo equivalente em BRL;
- saldo em BRL disponível para exibir créditos de yield do Stake.

## 5.4 Vault
Vault é a posição de BTC mantida na federação como reserva/custódia.
No v1.0, o Vault deve permitir:
- visualizar saldo;
- visualizar histórico;
- receber BTC;
- enviar BTC;
- mover BTC para Stake;
- selecionar BTC para uso como colateral.

## 5.5 Stake
O Stake representa uma alocação de BTC para geração de yield em BRL.

### Regras do Stake no v1.0
- yield pago apenas em **BRL**;
- contratação com taxa e prazo definidos no momento da contratação;
- o usuário vê:
  - valor em BTC alocado;
  - taxa contratada;
  - prazo;
  - rendimento BRL projetado;
  - rendimento BRL acumulado mock;
  - data de vencimento;
  - status.

## 5.6 Empréstimos
O fluxo principal é:
1. borrower acessa o marketplace;
2. borrower escolhe uma oferta existente;
3. borrower simula;
4. borrower seleciona colateral BTC;
5. borrower revisa contrato;
6. borrower confirma com PIN.

O lender pode:
- criar oferta;
- ver ofertas ativas;
- editar ou cancelar oferta;
- acompanhar contratos em andamento.

### Modalidades de empréstimo
O v1.0 deve contemplar 3 modalidades:

#### a) Amortização padrão
- parcelas com amortização desde o início.

#### b) Juros periódicos + principal no final
- paga juros durante o contrato;
- principal quitado ao vencimento.

#### c) Bullet
- não há pagamento obrigatório até o vencimento;
- pagamento integral ao final;
- pode solicitar extensão se o LTV estiver saudável;
- LTV saudável para extensão = **50% ou menos**.

### Regras adicionais
- LTV máximo simulado no v1.0: **100%**;
- prazo entre **90 e 360 dias**;
- não há liquidação por queda de preço;
- inadimplência é o único gatilho de execução do colateral;
- a valorização ou desvalorização do BTC altera apenas condições contratuais exibidas e cálculos simulados.

---

## 6. Arquitetura de informação

## 6.1 Rotas principais

### Público
- `/`
- `/onboarding`
- `/auth/login`
- `/auth/signup`
- `/auth/reset`
- `/join`
- `/join/search`
- `/join/invite`
- `/join/qr`

### App autenticado
- `/app`
- `/app/bitcoin`
- `/app/bitcoin/receive`
- `/app/bitcoin/send`
- `/app/bitcoin/vault`
- `/app/bitcoin/stake`
- `/app/bitcoin/stake/new`
- `/app/bitcoin/stake/[id]`
- `/app/bitcoin/loans`
- `/app/bitcoin/loans/borrow/[id]`
- `/app/bitcoin/loans/lend/new`
- `/app/bitcoin/loans/lend/[id]`
- `/app/federation`
- `/app/activity`
- `/app/security/proof-of-reserves`
- `/app/settings`
- `/app/rwa`

## 6.2 Navegação principal
### Desktop
Sidebar com:
- Dashboard
- Vault
- Stake
- Loans
- Activity
- Federation
- RWA
- Proof of Reserves
- Settings

### Mobile
Bottom navigation com:
- Home
- Vault
- Loans
- RWA
- Profile/Menu

---

## 7. Telas e comportamentos

## 7.1 Onboarding
Objetivo:
- explicar federação;
- explicar Vault;
- explicar Stake;
- explicar empréstimos com colateral BTC;
- explicar que não há compra de BTC dentro do app;
- explicar entrada por federação.

Passos sugeridos:
1. O que é FediBank;
2. O que é uma federação;
3. O que é Vault e Stake;
4. Como funcionam empréstimos com BTC;
5. Como entrar em uma federação;
6. CTA de criar conta ou entrar.

## 7.2 Join Federation
Fluxos:
- buscar nome da federação;
- entrar via link;
- entrar via QR Code;
- tela de preview da federação;
- botão “Entrar nesta federação”.

Informações visíveis:
- nome;
- descrição curta;
- status;
- número de membros mock;
- prova de reservas/link mock;
- botão de ingresso.

## 7.3 Dashboard Bitcoin
Elementos:
- saudação e nome da federação atual;
- saldo total em BTC;
- equivalente em BRL;
- cards rápidos:
  - Vault;
  - Stake;
  - Loans ativos;
  - Yield BRL acumulado;
- gráfico de patrimônio;
- últimas movimentações;
- ações rápidas:
  - Receber;
  - Enviar;
  - Novo Stake;
  - Buscar Empréstimo.

## 7.4 Receive
Componentes:
- input de valor;
- seletor de unidade;
- botão gerar invoice;
- QR Code;
- botão copiar invoice;
- botão compartilhar;
- botão “Simular recebimento”;
- status da invoice.

Comportamento:
- ao simular recebimento, saldo deve atualizar e atividade deve registrar a entrada.

## 7.5 Send
Componentes:
- input para invoice LN;
- parsing mock do invoice;
- valor;
- taxa estimada;
- resumo;
- modal de confirmação;
- input PIN;
- botão confirmar;
- toast de sucesso ou erro.

## 7.6 Vault
Componentes:
- saldo total;
- saldo disponível;
- saldo comprometido em colateral;
- saldo em stake;
- histórico;
- ações:
  - Receber;
  - Enviar;
  - Mover para Stake;
  - Usar como colateral.

## 7.7 Stake list
Componentes:
- cards ou tabela de stakes;
- status;
- taxa;
- prazo;
- rendimento BRL acumulado;
- botão “Novo Stake”;
- empty state.

## 7.8 Novo Stake
Fluxo:
1. escolher valor em BTC;
2. escolher prazo;
3. visualizar taxa;
4. visualizar yield BRL projetado;
5. revisar termos;
6. confirmar com PIN.

## 7.9 Detalhe do Stake
Componentes:
- valor alocado;
- taxa;
- prazo;
- rendimento acumulado BRL;
- linha do tempo;
- status;
- ação de encerrar, quando aplicável;
- histórico do stake.

## 7.10 Loans Hub
Tela com tabs:
- Borrow
- Lend
- Market

### Borrow
- contratos ativos;
- CTA “Buscar oferta”.

### Lend
- ofertas criadas;
- CTA “Criar oferta”.

### Market
- lista de ofertas;
- filtros:
  - moeda;
  - prazo;
  - taxa;
  - modalidade;
- ordenar por taxa, prazo e valor.

## 7.11 Contratar empréstimo
Fluxo:
1. escolher oferta existente;
2. ver detalhes da oferta;
3. preencher valor desejado;
4. definir colateral BTC;
5. ver LTV;
6. escolher modalidade;
7. ver projeções;
8. revisar contrato;
9. confirmar com PIN.

Resumo obrigatório:
- modalidade;
- prazo;
- taxa;
- colateral;
- regra de inadimplência;
- aviso de ausência de liquidação por preço.

## 7.12 Criar oferta como lender
Campos:
- valor disponível;
- moeda;
- prazo;
- taxa;
- modalidade;
- LTV de referência;
- descrição opcional.

Ações:
- publicar;
- editar;
- cancelar.

## 7.13 Detalhe do contrato de empréstimo
Exibir:
- status;
- modalidade;
- principal;
- saldo devedor;
- colateral BTC;
- LTV atual;
- parcelas ou cronograma;
- prazo;
- taxa atual mock;
- histórico.

Ações possíveis:
- pagar parcela;
- pagar juros;
- quitar;
- solicitar extensão do bullet;
- adicionar colateral.

## 7.14 Activity
Tabela com:
- data;
- tipo;
- origem;
- destino;
- valor BTC;
- valor BRL;
- status.

Filtros:
- tipo;
- período;
- status.

Ação:
- exportar CSV local.

## 7.15 Proof of Reserves
Tela mock com:
- total em custódia;
- total emitido em e-cash;
- BTC comprometido em colateral;
- ID de verificação;
- data da última atualização;
- botão copiar;
- texto explicativo.

## 7.16 Settings
Itens:
- moeda padrão;
- tema;
- notificações mock;
- PIN;
- tenant info;
- logout.

## 7.17 RWA
Tela visual, sem operação real.
Deve conter:
- hero section institucional;
- lista de oportunidades;
- card principal de investimento imobiliário simulado;
- dados mock:
  - nome do projeto;
  - target return;
  - prazo;
  - estrutura;
  - captação;
- badge “Coming soon”.

---

## 8. Estrutura técnica recomendada

- Next.js com App Router
- TypeScript
- Tailwind
- shadcn/ui ou equivalente
- React Hook Form + Zod
- Zustand ou Redux Toolkit
- Mock backend com Route Handlers ou MSW
- persistência local para manter estado mock entre refresh
- Playwright para smoke tests
- Vitest para serviços e regras de negócio simples

---

## 9. Arquitetura de integração futura

O código deve ser preparado com adapters, sem depender da integração real no v1.0.

### Interfaces esperadas
- `FedimintAdapter`
- `LightningAdapter`
- `PriceFeedAdapter`
- `YieldEngineAdapter`
- `FederationAdapter`

### Evoluções naturais
- integração com cliente Fedimint real;
- integração com provedor Lightning real;
- feed de preço real BTC/BRL;
- trilha regulatória e KYC;
- motor RWA operacional;
- trilha institucional de tokenização e distribuição.

---

## 10. White-label

Criar configuração de marca em arquivo, por exemplo `brand.json`, com:
- tenantName;
- logo;
- primaryColor;
- accentColor;
- surfaceColor;
- textColor;
- radius;
- defaultTheme.

Tenant padrão do MVP:
- **FediBank**

Objetivo:
- permitir mudança futura de nome e identidade sem reescrever componentes.

---

## 11. Critérios de aceite do MVP

O MVP está aceito quando:

1. todas as rotas principais existem;
2. toda tela está visualmente pronta;
3. todos os botões executam alguma ação observável;
4. todos os formulários validam corretamente;
5. os fluxos principais do lado Bitcoin podem ser testados ponta a ponta com dados mock;
6. os estados de loading, sucesso, erro e vazio existem;
7. o fluxo de federação existe antes da área logada;
8. Stake paga yield em BRL no mock;
9. Loans respeitam as 3 modalidades;
10. a regra central do colateral aparece com clareza;
11. o app funciona bem em desktop e mobile responsivo;
12. a área RWA existe como placeholder premium visual;
13. o código fica pronto para publicação em GitHub.

---

## 12. Fora do escopo operacional do v1.0

Mesmo que a UI exista, o v1.0 não precisa entregar:
- autenticação real;
- saldo real;
- invoices LN reais;
- custódia real;
- negociação real entre usuários;
- integração regulatória;
- compra e venda real de BTC;
- tokenização real de ativos;
- dados reais de mercado.

---

## 13. Roadmap resumido

### v1.1
- integração inicial real com Fedimint;
- integração Lightning;
- múltiplos estados de federação;
- melhoria do módulo de activity.

### v1.2
- borrower cria pedido;
- ofertas mais sofisticadas;
- price feed real;
- score e analytics.

### v2.0
- RWA funcional;
- captação e distribuição;
- trilha institucional;
- integrações externas;
- compliance e operações reais.

---

## 14. Nota final de produto

O v1.0 do FediBank deve ser entregue como um produto **UI-first**, altamente convincente, clicável e demonstrável, com foco absoluto em:
- experiência de Bitcoin;
- lógica de federação;
- Vault;
- Stake em BRL;
- empréstimos com colateral BTC sem liquidação por preço.

