# FediBank v1.0 — Backlog Técnico, Épicos, Telas e Checklist de PR

> Documento operacional para execução do MVP v1.0 no GitHub.
> Objetivo: transformar o spec e o prompt em um plano de implementação por fases, com critérios claros de entrega.

---

## 1. Objetivo da execução

Construir um app web responsivo, UI-first, com foco absoluto no módulo Bitcoin, capaz de ser demonstrado ponta a ponta com dados mockados e comportamento consistente.

### Prioridade da execução
1. Fundação técnica e design system
2. Entrada por federação
3. Dashboard Bitcoin
4. Vault / Receive / Send
5. Stake
6. Loans
7. Activity / Proof of Reserves / Settings
8. RWA placeholder premium
9. Testes, polish e preparo para GitHub/demo

---

## 2. Estrutura sugerida de issues / milestones

### Milestone 0 — Foundation
- setup do projeto
- design tokens
- brand.json
- layout base
- providers globais
- mocks base
- rotas shell
- CI básica

### Milestone 1 — Federation Access
- onboarding
- auth mock
- busca de federação
- join via convite
- join via QR
- preview da federação
- gate de acesso à área logada

### Milestone 2 — Bitcoin Core UX
- dashboard
- receive
- send
- vault
- activity inicial

### Milestone 3 — Stake
- listagem
- criação
- detalhe
- encerramento mock
- crédito BRL mock

### Milestone 4 — Loans
- market
- contratar empréstimo
- criar oferta
- detalhe do contrato
- ações contratuais
- regras das 3 modalidades

### Milestone 5 — Support Modules
- proof of reserves
- settings
- federation page
- FAQ/tooltips

### Milestone 6 — RWA Placeholder
- landing institucional
- cards de oportunidade
- detalhe mock do imobiliário
- CTA de interesse / coming soon

### Milestone 7 — Polish
- estados vazios
- loading
- erro
- sucesso
- responsividade
- smoke tests
- README
- docs/spec.md

---

## 3. Épicos

## Épico 1 — Fundação técnica e visual

### Objetivo
Criar a base reutilizável do projeto para que as próximas features entrem com consistência.

### Entregáveis
- Next.js + TypeScript + Tailwind
- design system base
- tema dark padrão
- brand.json
- layout desktop e mobile
- sidebar + bottom nav
- store global
- camada de mocks
- adapters mockados
- toasts, modais, drawers, dialogs, skeletons

### Issues sugeridas
1. Inicializar projeto e stack base
2. Configurar Tailwind, tipografia, spacing e tokens
3. Criar arquivo `brand.json` e loader de branding
4. Criar layout principal desktop/mobile
5. Criar biblioteca de componentes base
6. Criar store global e persistência local
7. Criar camada de serviços mock
8. Criar adapters futuros
9. Configurar testes e lint

### Critérios de aceite
- projeto sobe localmente sem erro
- layout base pronto
- componentes reutilizáveis existentes
- navegação principal funcionando
- tema FediBank aplicado corretamente

---

## Épico 2 — Acesso, onboarding e federação

### Objetivo
Garantir que o usuário entre em uma federação antes de acessar o app.

### Telas
- `/`
- `/onboarding`
- `/auth/login`
- `/auth/signup`
- `/auth/reset`
- `/join`
- `/join/search`
- `/join/invite`
- `/join/qr`

### Stories
- como visitante, quero entender o produto antes de entrar
- como usuário, quero criar conta mock
- como usuário, quero fazer login mock
- como usuário, quero encontrar uma federação por nome
- como usuário, quero entrar por convite/link
- como usuário, quero simular entrada por QR
- como usuário, quero ver um preview da federação antes de entrar
- como produto, quero bloquear acesso ao app sem federação ativa

### Componentes-chave
- hero público
- cards de onboarding
- form auth
- search federation
- invite card
- QR entry mock
- federation preview
- join success state

### Critérios de aceite
- usuário consegue navegar público → auth → join → app
- sem federação ativa, rota `/app` redireciona para join
- preview da federação mostra dados mock coerentes
- todos os botões têm ação observável

---

## Épico 3 — Dashboard Bitcoin

### Objetivo
Entregar a home principal do produto com sensação de produto final.

### Telas
- `/app`
- `/app/bitcoin`

### Stories
- como usuário, quero ver meu saldo BTC
- como usuário, quero ver o equivalente em BRL
- como usuário, quero ver meus módulos principais
- como usuário, quero acessar ações rápidas
- como usuário, quero ver movimentações recentes

### Componentes-chave
- header com nome da federação
- saldo principal
- cards de resumo
- gráfico mock
- quick actions
- recent activity list

### Critérios de aceite
- dashboard carrega com loading e skeleton
- cards refletem estado mock
- quick actions navegam corretamente
- experiência funciona bem em mobile e desktop

---

## Épico 4 — Receive via Lightning

### Objetivo
Permitir simulação de recebimento via LN com atualização de saldo e activity.

### Tela
- `/app/bitcoin/receive`

### Stories
- como usuário, quero gerar uma invoice mock
- como usuário, quero copiar a invoice
- como usuário, quero ver QR Code
- como usuário, quero simular o recebimento
- como usuário, quero ver meu saldo atualizado após o recebimento

### Estados
- invoice inexistente
- invoice gerada
- invoice copiada
- invoice paga
- erro de geração

### Critérios de aceite
- botão gerar invoice cria estado observável
- botão copiar gera feedback
- simular recebimento atualiza saldo e activity
- formulário tem validação

---

## Épico 5 — Send via Lightning

### Objetivo
Permitir simulação de envio com PIN obrigatório.

### Tela
- `/app/bitcoin/send`

### Stories
- como usuário, quero colar uma invoice
- como usuário, quero ver parsing mock
- como usuário, quero revisar a saída
- como usuário, quero confirmar com PIN
- como usuário, quero receber sucesso ou erro mock

### Regras
- PIN obrigatório
- saldo insuficiente gera erro
- estado de loading antes do resultado

### Critérios de aceite
- invoice pode ser validada
- resumo é exibido antes da confirmação
- modal PIN funciona
- saldo e activity atualizam em caso de sucesso

---

## Épico 6 — Vault

### Objetivo
Entregar a visão de custódia do BTC dentro da federação.

### Tela
- `/app/bitcoin/vault`

### Stories
- como usuário, quero ver saldo disponível
- como usuário, quero ver saldo comprometido
- como usuário, quero mover para Stake
- como usuário, quero marcar saldo para colateral
- como usuário, quero ver histórico ligado ao Vault

### Critérios de aceite
- saldos são apresentados com clareza
- ações têm feedback
- histórico exibe dados coerentes
- UX explica relação entre Vault, Stake e colateral

---

## Épico 7 — Stake

### Objetivo
Permitir contratar alocação em Stake com yield em BRL.

### Telas
- `/app/bitcoin/stake`
- `/app/bitcoin/stake/new`
- `/app/bitcoin/stake/[id]`

### Stories
- como usuário, quero ver meus stakes
- como usuário, quero criar novo stake
- como usuário, quero ver taxa e prazo
- como usuário, quero ver yield projetado em BRL
- como usuário, quero confirmar com PIN
- como usuário, quero acompanhar rendimento mock
- como usuário, quero encerrar um stake elegível

### Regras
- yield apenas em BRL
- contratação com taxa e prazo fechados
- saldo BTC reduz quando stake é contratado
- saldo BRL pode acumular rendimento mock

### Critérios de aceite
- criação de stake funciona ponta a ponta
- detalhe mostra linha do tempo e status
- BRL acumulado aparece corretamente
- encerramento mock gera mudança de status

---

## Épico 8 — Loans Marketplace

### Objetivo
Entregar o fluxo principal do crédito: borrower escolhe oferta existente.

### Tela
- `/app/bitcoin/loans`

### Stories
- como borrower, quero filtrar ofertas
- como borrower, quero comparar taxa, prazo e modalidade
- como lender, quero ver minhas ofertas
- como lender, quero criar uma oferta
- como lender, quero editar ou cancelar oferta

### Componentes-chave
- tabs Borrow / Lend / Market
- tabela ou cards de ofertas
- filtros
- ordenação
- CTA de contratação
- CTA de criação

### Critérios de aceite
- market é navegável
- filtros alteram a lista
- tab lend mostra ofertas do usuário
- criar oferta injeta item no mock state

---

## Épico 9 — Contratação do empréstimo

### Tela
- `/app/bitcoin/loans/borrow/[id]`

### Objetivo
Permitir contratação ponta a ponta a partir de uma oferta existente.

### Stories
- como borrower, quero definir valor
- como borrower, quero escolher colateral BTC
- como borrower, quero ver LTV
- como borrower, quero escolher modalidade
- como borrower, quero ver projeções
- como borrower, quero revisar contrato
- como borrower, quero confirmar com PIN

### Modalidades
1. amortização padrão
2. juros periódicos + principal no final
3. bullet

### Regras obrigatórias
- prazo entre 90 e 360 dias
- LTV máximo 100%
- sem liquidação por preço
- execução do colateral apenas por inadimplência
- extensão do bullet apenas com LTV <= 50%

### Critérios de aceite
- contratação cria contrato ativo no mock
- colateral é reservado no saldo
- resumo do contrato exibe a regra central
- PIN é obrigatório
- tratamento de erro funciona

---

## Épico 10 — Contrato ativo de empréstimo

### Telas
- detalhe acessível a partir do hub de loans
- pode reutilizar `/app/bitcoin/loans/borrow/[id]` em modo detalhe ou criar rota dedicada depois

### Stories
- como usuário, quero ver principal e saldo devedor
- como usuário, quero ver colateral e LTV
- como usuário, quero ver cronograma ou bullet summary
- como usuário, quero pagar parcela
- como usuário, quero pagar juros
- como usuário, quero quitar
- como usuário, quero adicionar colateral
- como usuário, quero solicitar extensão do bullet quando permitido

### Critérios de aceite
- ações mudam o estado do contrato
- histórico do contrato fica coerente
- botão de extensão aparece apenas quando elegível
- regras de cada modalidade ficam claras

---

## Épico 11 — Activity, Proof of Reserves, Settings e Federation

### Telas
- `/app/activity`
- `/app/security/proof-of-reserves`
- `/app/settings`
- `/app/federation`

### Stories
- como usuário, quero consultar meu extrato
- como usuário, quero filtrar transações
- como usuário, quero exportar CSV local
- como usuário, quero ver prova de reservas mock
- como usuário, quero copiar ID de verificação
- como usuário, quero ajustar tema, moeda e PIN
- como usuário, quero ver os dados da federação atual

### Critérios de aceite
- activity lista dados mock consistentes
- proof of reserves está visualmente robusta
- settings salvam preferências localmente
- federation page mostra identidade da federação

---

## Épico 12 — RWA placeholder premium

### Tela
- `/app/rwa`

### Objetivo
Deixar o terreno pronto para expansão futura, com linguagem visual institucional.

### Stories
- como usuário, quero ver uma área RWA com aparência profissional
- como usuário, quero visualizar uma oportunidade imobiliária mock
- como usuário, quero clicar em detalhes/interesse
- como usuário, quero entender que o módulo está em evolução

### Conteúdo mínimo
- hero institucional
- cards de oportunidades
- detalhe do projeto imobiliário
- target return
- prazo
- estrutura
- progresso de captação
- badge coming soon

### Critérios de aceite
- tela parece produto futuro real
- conteúdo é coerente com o posicionamento institucional
- CTA tem ação observável

---

## 4. Lista de telas com definição de pronto

## Público
### 1. Landing
Pronto quando:
- hero existe
- branding FediBank aplicado
- CTA leva para onboarding/login/join
- mobile e desktop corretos

### 2. Onboarding
Pronto quando:
- fluxo de cards/telas existe
- usuário consegue avançar e concluir
- CTA final leva para auth ou join

### 3. Login / Signup / Reset
Pronto quando:
- forms validam
- submit gera transição observável
- erros e sucesso existem

### 4. Join Search / Invite / QR / Preview
Pronto quando:
- os 3 meios de entrada existem
- preview mostra dados
- entrada na federação atualiza o app state

## App
### 5. Dashboard
Pronto quando:
- saldo, gráfico, activity e ações rápidas existem
- cards são navegáveis

### 6. Receive
Pronto quando:
- invoice é gerada
- QR aparece
- copiar funciona
- simular recebimento atualiza estado

### 7. Send
Pronto quando:
- invoice é validada
- resumo aparece
- PIN funciona
- estado muda após envio

### 8. Vault
Pronto quando:
- saldos e compromissos aparecem
- ações de mover saldo existem

### 9. Stake List / New / Detail
Pronto quando:
- fluxo completo de contratação funciona
- detalhamento do stake existe
- BRL yield mock aparece

### 10. Loans Hub / Borrow / Lend
Pronto quando:
- market funciona
- criação de oferta funciona
- contratação funciona
- detalhe do contrato existe

### 11. Activity
Pronto quando:
- tabela existe
- filtros funcionam
- export mock funciona

### 12. Proof of Reserves
Pronto quando:
- cards, métricas e copy existem
- cópia do ID funciona

### 13. Settings
Pronto quando:
- preferências persistem localmente
- alteração de PIN existe

### 14. Federation
Pronto quando:
- dados e status da federação aparecem

### 15. RWA
Pronto quando:
- hero, cards e detalhe mock existem
- coming soon fica claro

---

## 5. Ordem recomendada de implementação

## Fase 1 — Base
- projeto
- layout
- tema
- brand
- mocks
- components base
- rotas shell

## Fase 2 — Entrada
- onboarding
- auth
- join federation
- route guard

## Fase 3 — Bitcoin base
- dashboard
- receive
- send
- vault
- activity básica

## Fase 4 — Stake
- lista
- wizard
- detalhe
- encerramento mock

## Fase 5 — Loans
- market
- criar oferta
- contratar
- detalhe do contrato
- regras das modalidades

## Fase 6 — Suporte
- proof of reserves
- settings
- federation
- FAQ/tooltips

## Fase 7 — RWA
- landing institucional
- oportunidade imobiliária mock

## Fase 8 — Polish final
- responsividade
- acessibilidade básica
- estados
- smoke tests
- README
- docs

---

## 6. Checklist de PR por feature

Cada Pull Request deve responder “sim” para estes itens:

### Produto
- [ ] A feature resolve uma história clara do usuário
- [ ] O comportamento está alinhado ao spec v1.0
- [ ] A regra central do colateral foi respeitada, quando aplicável

### Interface
- [ ] A tela funciona em desktop
- [ ] A tela funciona em mobile
- [ ] Não existem botões mortos
- [ ] Existem estados de loading
- [ ] Existem estados vazios
- [ ] Existem estados de erro
- [ ] Existem estados de sucesso
- [ ] Inputs possuem validação
- [ ] Toasts/modais/dialogs estão consistentes com o design system

### Estado e dados
- [ ] O mock state foi atualizado corretamente
- [ ] Persistência local funciona quando necessária
- [ ] Activity/reflexos da ação foram atualizados quando aplicável
- [ ] Não houve quebra de fluxos existentes

### Código
- [ ] Componentes foram reutilizados quando possível
- [ ] Não há lógica duplicada sem necessidade
- [ ] Tipagem está consistente
- [ ] Código está organizado por feature
- [ ] Adapters e services seguem a arquitetura definida

### Qualidade
- [ ] Build local funciona
- [ ] Testes relevantes foram adicionados ou atualizados
- [ ] Smoke test do fluxo principal foi verificado
- [ ] README/docs foram atualizados, se necessário

---

## 7. Checklist de PR específico para Loans

- [ ] O fluxo principal é borrower escolhendo oferta existente
- [ ] Existem 3 modalidades disponíveis
- [ ] Prazo respeita 90–360 dias
- [ ] LTV máximo está limitado a 100%
- [ ] Não há qualquer texto sugerindo liquidação automática por preço
- [ ] O colateral só é executado por inadimplência
- [ ] Extensão do bullet só aparece com LTV <= 50%
- [ ] PIN é exigido na contratação
- [ ] Contrato criado aparece na listagem/detalhe
- [ ] Activity e saldos refletem a contratação

---

## 8. Checklist de PR específico para Stake

- [ ] Yield é apenas em BRL
- [ ] Contratação exige PIN
- [ ] Valor em BTC é bloqueado corretamente no mock
- [ ] Projeção BRL aparece antes da contratação
- [ ] Detalhe do stake mostra taxa, prazo e acumulado
- [ ] Encerramento mock altera status corretamente

---

## 9. Checklist de PR específico para Federation Access

- [ ] Usuário não entra na área logada sem federação
- [ ] Busca por nome funciona com dados mock
- [ ] Join por link funciona
- [ ] Join por QR funciona
- [ ] Preview da federação está completo
- [ ] App state reconhece federação ativa

---

## 10. Definition of Done do repositório v1.0

O repositório está pronto para demo quando:

- todas as rotas obrigatórias existem;
- o módulo Bitcoin está navegável ponta a ponta;
- receive, send, stake e loans funcionam com dados mock;
- o visual está consistente e premium;
- a regra central do colateral está clara;
- a federação é pré-requisito funcional;
- a área RWA existe como placeholder de alto nível;
- os principais fluxos têm smoke tests;
- o README explica instalação e navegação;
- `docs/spec.md` reflete o estado atual do projeto.

---

## 11. Sugestão de estrutura de labels no GitHub

- `epic`
- `feature`
- `ui`
- `state`
- `mock-data`
- `bug`
- `tech-debt`
- `test`
- `docs`
- `mobile`
- `desktop`
- `priority:p0`
- `priority:p1`
- `priority:p2`

---

## 12. Sugestão de épicos convertidos em branches

- `feat/foundation-ui`
- `feat/federation-access`
- `feat/bitcoin-dashboard`
- `feat/bitcoin-transfer`
- `feat/bitcoin-vault`
- `feat/bitcoin-stake`
- `feat/bitcoin-loans-market`
- `feat/bitcoin-loans-contract`
- `feat/activity-proof-settings`
- `feat/rwa-placeholder`
- `chore/polish-tests-docs`

