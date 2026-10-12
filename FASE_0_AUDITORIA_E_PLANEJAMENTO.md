# FASE 0 — AUDITORIA E PLANEJAMENTO

## Plataforma Hospitalar Integrada - Projeto Sentinela

**Data:** 2026-10-04
**Status:** Em elaboração
**Responsável:** Equipe de desenvolvimento

---

## 1. ANÁLISE DAS REFERÊNCIAS

### 1.1 Referência Visual - Vitalis Hospital

**URL:** https://sentinela-rosy.vercel.app/login.html

**Características identificadas:**

- Interface institucional profissional
- Identidade visual consistente (nome "Vitalis Hospital")
- Login com credenciais corporativas
- Sistema de recuperação de senha controlado (administração presencial)
- Múltiplos perfis de usuário (admin, médico, enfermagem, recepção, financeiro)
- Ambiente de homologação com usuários demonstrativos
- Mensagens claras sobre segurança e auditoria
- Opção de acesso para pacientes separado

**Credenciais de homologação informadas:**

- admin / admin123
- carlos / med123
- maria / enf123
- paula / rec123
- renata / fin123

**Aprendizados:**

- Aparência institucional é essencial para credibilidade
- Separação clara entre perfis profissionais e pacientes
- Processo de recuperação de senha deve ser seguro e controlado
- Ambiente de homologação facilita testes

### 1.2 Repositório de Código - middlewares-hospital

**URL:** https://github.com/Ferre1ra10/middlewares-hospital

**Tecnologias identificadas:**

- Node.js
- Express.js
- HTML5, CSS3, JavaScript vanilla
- Sem TypeScript
- Sem banco de dados real
- Sem autenticação
- Sem RLS

**Funcionalidades implementadas:**

- Cadastro de pacientes
- Validação de campos
- Validação de CPF
- Sanitização de dados
- Middlewares básicos

**Estrutura:**

```
middlewares-hospital/
├── middlewares/
│   ├── validarCampos.js
│   ├── validarCpf.js
│   └── sanitizarDados.js
├── routes/
├── public/
├── server.js
├── package.json
└── README.md
```

**Avaliação:**

- Projeto básico, não é um sistema hospitalar completo
- Padrões de middleware podem ser inspiração para validações
- Estrutura muito simples, não reutilizável diretamente
- Falta persistência, autenticação, segurança
- Não segue os requisitos obrigatórios (TypeScript, Supabase, etc.)

**Conclusão:** O repositório serve apenas como inspiração para patterns de validação. O projeto deve ser construído do zero seguindo os requisitos obrigatórios.

### 1.3 Estado Atual do Diretório Local

**Diretório:** `C:\Users\nsxpr\OneDrive\Desktop\peojeto sntinela`

**Situação:** Diretório vazio - nenhum arquivo existente

**Implicação:** Toda a estrutura precisa ser criada do zero, seguindo os requisitos obrigatórios.

---

## 2. ARQUITETURA TÉCNICA PROPOSTA

### 2.1 Stack Tecnológico

**Frontend:**

- React 18+ com TypeScript strict mode
- Vite como bundler e dev server
- Tailwind CSS para estilização
- shadcn/ui como biblioteca de componentes acessíveis
- React Router v6+ para navegação
- React Hook Form + Zod para formulários e validação
- TanStack Query (React Query) para cache e sincronização de dados
- Zustand ou Context API para estado global

**Backend e Dados:**

- Supabase como plataforma central
- PostgreSQL 15+ (gerenciado pelo Supabase)
- Supabase Auth para autenticação
- Supabase Storage para arquivos
- Row Level Security (RLS) para segurança no banco
- Supabase Edge Functions (TypeScript) para lógica server-side quando necessário
- Supabase Realtime para atualizações em tempo real (filas, chamadas de TV)
- Migrations SQL versionadas via Supabase CLI

**Qualidade e Testes:**

- ESLint com configuração estrita
- Prettier para formatação
- TypeScript strict mode
- Vitest para testes unitários e de integração
- Playwright para testes E2E de fluxos críticos
- Supabase test db para testes de RLS e políticas

**Ferramentas de Desenvolvimento:**

- Supabase CLI para desenvolvimento local
- TypeScript para geração de tipos a partir do schema
- Git para controle de versão

### 2.2 Padrões de Arquitetura

**Frontend:**

- Component-based architecture
- Separation of concerns: UI components, business logic, data access
- Custom hooks para lógica reutilizável
- Server-first approach: validações críticas no servidor/banco
- Responsive design (mobile-first)

**Backend:**

- Serverless functions via Supabase Edge Functions
- Database-first approach com SQL migrations
- RLS como principal camada de segurança
- Stored procedures/Functions para operações complexas no banco

**Segurança:**

- Defense in depth: validação no frontend + backend + banco
- Princípio do menor privilégio para permissões
- RLS em todas as tabelas expostas
- Service role apenas server-side
- Auditoria de operações sensíveis

### 2.3 Estrutura de Diretórios Proposta

```
sentinela-hospital/
├── .devin/
│   └── skills/                 # Skills específicas do projeto (se necessário)
├── supabase/
│   ├── migrations/             # Migrations SQL versionadas
│   ├── functions/              # Edge Functions TypeScript
│   ├── tests/                  # Testes de banco e políticas RLS
│   └── seed.sql                # Dados de seed fictícios
├── src/
│   ├── components/             # Componentes reutilizáveis
│   │   ├── ui/                 # Componentes base (shadcn/ui)
│   │   ├── auth/               # Componentes de autenticação
│   │   ├── patient/            # Componentes específicos de paciente
│   │   ├── medical/            # Componentes específicos médicos
│   │   ├── pharmacy/           # Componentes de farmácia
│   │   ├── financial/          # Componentes financeiros
│   │   └── common/             # Componentes compartilhados
│   ├── pages/                  # Páginas/route components
│   │   ├── login.tsx
│   │   ├── dashboard/
│   │   ├── reception/
│   │   ├── triage/
│   │   ├── medical/
│   │   ├── nursing/
│   │   ├── pharmacy/
│   │   ├── financial/
│   │   ├── admin/
│   │   └── tv-panel.tsx
│   ├── layouts/                # Layouts reutilizáveis
│   │   ├── MainLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   └── TVLayout.tsx
│   ├── lib/                    # Bibliotecas e configurações
│   │   ├── supabase.ts         # Cliente Supabase
│   │   ├── supabase/           # Types gerados do schema
│   │   ├── auth.ts             # Funções de autenticação
│   │   └── utils.ts            # Utilitários gerais
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── usePatient.ts
│   │   ├── useQueue.ts
│   │   └── useRealtime.ts
│   ├── services/               # Serviços de negócio
│   │   ├── patient.service.ts
│   │   ├── triage.service.ts
│   │   ├── medical.service.ts
│   │   ├── pharmacy.service.ts
│   │   └── financial.service.ts
│   ├── stores/                 # Estado global (Zustand)
│   │   ├── auth.store.ts
│   │   └── ui.store.ts
│   ├── types/                  # Tipos TypeScript customizados
│   │   ├── index.ts
│   │   └── business.ts
│   ├── constants/              # Constantes do sistema
│   │   ├── roles.ts
│   │   ├── priorities.ts
│   │   └── status.ts
│   ├── validators/             # Validadores (Zod schemas)
│   │   ├── patient.validator.ts
│   │   ├── medical.validator.ts
│   │   └── financial.validator.ts
│   └── main.tsx                # Entry point
├── public/                     # Arquivos estáticos
│   ├── fonts/
│   ├── icons/
│   └── images/
├── tests/                      # Testes (Vitest, Playwright)
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example                # Template de variáveis de ambiente
├── .env.local                  # Variáveis locais (gitignored)
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── tsconfig.json
├── vite.config.ts
├── package.json
├── README.md
├── ARCHITECTURE.md
├── SECURITY.md
├── DATA_MODEL.md
├── TESTING.md
├── DEPLOYMENT.md
└── CHANGELOG.md
```

---

## 3. MODELO INICIAL DO BANCO SUPABASE

### 3.1 Entidades Principais

**Organização e Multi-tenancy:**

- `organizations` - Hospitais/organizações (para suporte futuro a múltiplos hospitais)
- `units` - Unidades hospitalares (matriz, filiais)
- `departments` - Departamentos/setores (recepção, triagem, emergência, etc.)

**Usuários e Permissões:**

- `profiles` - Perfis de usuário extendidos do Supabase Auth
- `roles` - Perfis de acesso (admin, médico, enfermeiro, recepcionista, farmacêutico, financeiro)
- `permissions` - Permissões granulares
- `role_permissions` - Associação many-to-many entre roles e permissions
- `user_roles` - Associação entre usuários e roles (por unidade)

**Pacientes:**

- `patients` - Cadastro de pacientes
- `patient_identifiers` - Identificadores alternativos (CPF, RG, cartão SUS)
- `patient_contacts` - Contatos de emergência
- `patient_allergies` - Alergias registradas
- `patient_history` - Histórico clínico resumido

**Atendimento:**

- `attendances` - Atendimentos abertos
- `attendance_status` - Estados do atendimento (chegada, triagem, espera, atendimento, alta)
- `queues` - Filas por setor
- `queue_entries` - Entradas nas filas
- `priorities` - Níveis de prioridade (vermelho, laranja, verde, azul)

**Triagem:**

- `triages` - Registros de triagem
- `vital_signs` - Sinais vitais (pressão, temperatura, frequência, saturação)
- `triage_classifications` - Classificação de risco

**Salas e Chamadas:**

- `rooms` - Salas de atendimento
- `room_types` - Tipos de sala (consulta, exame, procedimento)
- `room_status` - Estados da sala (livre, ocupada, limpeza, indisponível)
- `calls` - Chamadas para TV
- `call_status` - Estados da chamada (pendente, chamando, chegou, cancelada)

**Prontuário:**

- `medical_records` - Registros médicos
- `anamnesis` - Anamneses
- `evolutions` - Evoluções clínicas
- `diagnoses` - Diagnósticos
- `prescriptions` - Prescrições médicas
- `prescription_items` - Itens de prescrição (medicamentos, procedimentos)
- `exams` - Exames solicitados
- `exam_results` - Resultados de exames
- `referrals` - Encaminhamentos

**Enfermagem:**

- `nursing_care_plans` - Planos de cuidados
- `nursing_tasks` - Tarefas de enfermagem
- `medication_administrations` - Administração de medicamentos
- `vital_signs_monitoring` - Monitoramento de sinais vitais

**Farmácia e Estoque:**

- `medications` - Catálogo de medicamentos
- `medication_presentations` - Apresentações (comprimido, injetável, etc.)
- `suppliers` - Fornecedores
- `inventories` - Estoques por localização
- `inventory_movements` - Movimentações de estoque
- `batches` - Lotes de medicamentos
- `reservations` - Reservas de estoque
- `dispensations` - Dispensações

**Financeiro:**

- `financial_accounts` - Contas financeiras
- `transactions` - Transações
- `invoices` - Faturas
- `insurance_providers` - Convênios
- `purchase_orders` - Pedidos de compra
- `cost_centers` - Centros de custo

**Auditoria:**

- `audit_logs` - Registro de operações sensíveis
- `access_logs` - Registro de acessos

### 3.2 Relacionamentos Principais

```
organizations (1) ---- (N) units
units (1) ---- (N) departments
units (1) ---- (N) rooms
units (1) ---- (N) users

users (1) ---- (N) user_roles
roles (1) ---- (N) user_roles
roles (1) ---- (N) role_permissions
permissions (1) ---- (N) role_permissions

patients (1) ---- (N) attendances
patients (1) ---- (N) patient_identifiers
patients (1) ---- (N) patient_allergies

attendances (1) ---- (1) triages
attendances (1) ---- (N) queue_entries
attendances (1) ---- (N) medical_records
attendances (1) ---- (N) prescriptions

triages (1) ---- (N) vital_signs

medical_records (1) ---- (N) evolutions
medical_records (1) ---- (N) diagnoses
medical_records (1) ---- (N) prescriptions

prescriptions (1) ---- (N) prescription_items
prescription_items (1) ---- (N) medication_administrations

medications (1) ---- (N) batches
medications (1) ---- (N) medication_presentations
batches (1) ---- (N) inventory_movements
inventories (1) ---- (N) inventory_movements
inventories (1) ---- (N) reservations

rooms (1) ---- (N) calls
calls (1) ---- (1) attendances
```

### 3.3 Estados e Transições

**Estado do Atendimento:**

```
chegada → triagem → espera → atendimento → finalizado
              ↓            ↓
           cancelado    cancelado
```

**Estado da Triagem:**

```
pendente → em_triagem → classificada → reavaliação
                 ↓
              cancelada
```

**Estado da Sala:**

```
livre → ocupada → limpeza → livre
      ↓
   indisponível
```

**Estado da Chamada TV:**

```
pendente → chamando → chegou → concluída
              ↓
          cancelada
```

**Estado da Prescrição:**

```
rascunho → prescrita → em_dispensação → dispensada → administrada
               ↓               ↓               ↓
            cancelada      cancelada       recusada/omitida
```

**Estado do Estoque (Lote):**

```
disponível → reservado → dispensado → baixado
            ↓            ↓
         bloqueado    quarentena
```

**Estado da Transação Financeira:**

```
pendente → aprovada → conciliada
            ↓
         cancelada/estornada
```

---

## 4. MATRIZ DE PERMISSÕES

### 4.1 Perfis de Usuário

| Perfil        | Descrição                | Acesso Principal                                 |
| ------------- | ------------------------ | ------------------------------------------------ |
| admin         | Administrador do sistema | Configurações, usuários, relatórios gerais       |
| medico        | Médico                   | Prontuário, prescrições, diagnósticos            |
| enfermeiro    | Enfermeiro               | Plano de cuidados, administração de medicamentos |
| recepcionista | Recepção                 | Cadastro, check-in, filas                        |
| farmaceutico  | Farmacêutico             | Estoque, dispensação, compras                    |
| financeiro    | Financeiro               | Faturamento, contas, relatórios financeiros      |
| triagem       | Profissional de triagem  | Triagem, classificação de risco                  |

### 4.2 Matriz de Acesso por Módulo

| Módulo                     | admin | medico  | enfermeiro | recepcionista | farmaceutico | financeiro | triagem |
| -------------------------- | ----- | ------- | ---------- | ------------- | ------------ | ---------- | ------- |
| Login/Logout               | ✓     | ✓       | ✓          | ✓             | ✓            | ✓          | ✓       |
| Dashboard                  | ✓     | ✓       | ✓          | ✓             | ✓            | ✓          | ✓       |
| Recepção/Cadastro          | ✓     | -       | -          | ✓             | -            | -          | -       |
| Triagem                    | ✓     | -       | -          | -             | -            | -          | ✓       |
| Prontuário (leitura)       | ✓     | ✓       | ✓          | -             | -            | -          | -       |
| Prontuário (escrita)       | ✓     | ✓       | ✓          | -             | -            | -          | -       |
| Prescrições                | ✓     | ✓       | -          | -             | -            | -          | -       |
| Administração medicamentos | ✓     | -       | ✓          | -             | -            | -          | -       |
| Farmácia/Estoque           | ✓     | -       | -          | -             | ✓            | -          | -       |
| Dispensação                | ✓     | -       | -          | -             | ✓            | -          | -       |
| Financeiro                 | ✓     | -       | -          | -             | -            | ✓          | -       |
| Compras                    | ✓     | -       | -          | -             | ✓            | ✓          | -       |
| Usuários/Perfis            | ✓     | -       | -          | -             | -            | -          | -       |
| Configurações              | ✓     | -       | -          | -             | -            | -          | -       |
| Relatórios (todos)         | ✓     | parcial | parcial    | -             | parcial      | ✓          | -       |
| Painel TV                  | ✓     | -       | -          | -             | -            | -          | -       |

### 4.3 Permissões Granulares (Exemplo)

| Permissão             | Descrição                      | Perfis               |
| --------------------- | ------------------------------ | -------------------- |
| patient.create        | Criar cadastro de paciente     | recepcionista, admin |
| patient.read          | Ler dados de paciente          | todos profissionais  |
| patient.update        | Atualizar dados de paciente    | recepcionista, admin |
| patient.delete        | Remover paciente (soft delete) | admin                |
| attendance.create     | Abrir atendimento              | recepcionista, admin |
| triage.classify       | Classificar risco              | triagem, admin       |
| medical_record.create | Criar registro médico          | medico, admin        |
| prescription.create   | Prescrever medicamentos        | medico, admin        |
| medication.administer | Administrar medicamento        | enfermeiro, admin    |
| inventory.manage      | Gerenciar estoque              | farmaceutico, admin  |
| financial.approve     | Aprovar transações             | financeiro, admin    |
| user.manage           | Gerenciar usuários             | admin                |

---

## 5. FLUXOS DE NEGÓCIO

### 5.1 Fluxo de Atendimento Completo

```
1. Chegada do Paciente
   - Recepção busca ou cadastra paciente
   - Gera senha
   - Abre atendimento
   - Encaminha para fila de triagem

2. Triagem
   - Profissional de triagem recebe paciente
   - Registra sinais vitais
   - Avalia risco conforme protocolo
   - Define prioridade
   - Encaminha para fila de atendimento específica

3. Atendimento Médico
   - Médico recebe paciente (sala alocada)
   - Acessa prontuário
   - Realiza anamnese
   - Registra evolução
   - Solicita exames (se necessário)
   - Prescreve medicamentos (se necessário)
   - Define conduta (alta, retorno, internação)

4. Enfermagem
   - Recebe prescrições
   - Apraza tarefas
   - Administra medicamentos
   - Registra ocorrências
   - Monitora sinais vitais

5. Farmácia
   - Recebe prescrições
   - Verifica disponibilidade
   - Reserva estoque
   - Dispensa medicamentos
   - Registra movimentação

6. Alta
   - Médico finaliza atendimento
   - Gera orientações
   - Atualiza status
   - Encaminha para faturamento (se aplicável)

7. Faturamento
   - Registra procedimentos
   - Calcula valores
   - Gera fatura
   - Processa pagamento/convênio
```

### 5.2 Fluxo de Chamadas por TV

```
1. Sala fica disponível
2. Sistema automaticamente seleciona próximo paciente da fila
   - Considera prioridade
   - Considera compatibilidade de sala
   - Considera tempo de espera
3. Gera chamada
4. Painel TV exibe:
   - Senha/identificador
   - Sala de destino
   - Repete por voz (em português)
5. Paciente se dirige à sala
6. Profissional confirma chegada
7. Chamada é concluída
8. Se paciente não chegar:
   - Repetir chamada (após timeout)
   - Cancelar chamada (após múltiplas tentativas)
   - Retornar à fila
```

### 5.3 Fluxo de Prescrição e Dispensação

```
1. Médico prescreve
   - Seleciona medicamento
   - Define dose, via, frequência, duração
   - Sistema verifica:
     * Alergias do paciente
     * Interações medicamentosas
     * Contraindicações
     * Disponibilidade em estoque
   - Se alerta crítico: bloqueia ou exige justificativa
   - Salva prescrição

2. Enfermagem recebe
   - Visualiza prescrições
   - Apraza administrações
   - Verifica horários

3. Farmácia recebe
   - Visualiza prescrições
   - Verifica disponibilidade
   - Reserva lote específico
   - Dispensa

4. Enfermagem administra
   - Verifica paciente (5 certos)
   - Verifica medicamento, dose, via, horário
   - Verifica lote e validade
   - Registra administração
   - Registra recusa/omissão (se aplicável)
```

### 5.4 Fluxo de Gestão de Estoque

```
1. Compra
   - Solicitação de compra
   - Cotação com fornecedores
   - Pedido de compra aprovado
   - Recebimento
   - Conferência (quantidade, lote, validade)
   - Entrada no estoque

2. Movimentação
   - Reserva (vinculada à prescrição)
   - Dispensação
   - Devolução
   - Ajuste (com justificativa e auditoria)
   - Recolhimento de lote vencido/recall

3. Alertas
   - Estoque mínimo
   - Lotes próximos ao vencimento
   - Produtos bloqueados/quarentena
```

---

## 6. RISCOS IDENTIFICADOS

### 6.1 Riscos Clínicos

| Risco                               | Impacto | Mitigação                                                                                  |
| ----------------------------------- | ------- | ------------------------------------------------------------------------------------------ |
| Prescrição incorreta                | Alto    | Validação de regras clínicas, alertas interativos, revisão obrigatória para casos críticos |
| Dispensação de lote vencido         | Alto    | Controle de validade no banco, bloqueio automático, verificação na dispensação             |
| Administração errada de medicamento | Alto    | 5 certos, verificação de lote, registro de responsável                                     |
| Falha na classificação de risco     | Alto    | Triagem apenas por profissional autorizado, protocolos validados, auditoria                |
| Perda de dados clínicos             | Alto    | Backups regulares, impossibilidade de delete físico, histórico de alterações               |
| Acesso não autorizado a prontuário  | Alto    | RLS, perfis granulares, auditoria de acessos                                               |

### 6.2 Riscos Técnicos

| Risco                                     | Impacto | Mitigação                                                            |
| ----------------------------------------- | ------- | -------------------------------------------------------------------- |
| Falha em operações críticas (concurrenca) | Alto    | Transações, controle de concorrência, idempotência                   |
| Inconsistência de estoque                 | Alto    | Transações, bloqueio de lote durante reserva, testes de concorrência |
| Falha de comunicação real-time (TV)       | Médio   | Mecanismo de reconexão, polling de fallback, estado oficial no banco |
| Timeout em operações longas               | Médio   | Timeouts adequados, operações assíncronas, feedback ao usuário       |
| Dependência de serviço externo (Supabase) | Médio   | Arquitetura preparada para migração, testes de resiliência           |
| Vulnerabilidades de segurança             | Alto    | RLS, validação server-side, auditoria, atualizações regulares        |

### 6.3 Riscos Financeiros

| Risco                                     | Impacto | Mitigação                                                          |
| ----------------------------------------- | ------- | ------------------------------------------------------------------ |
| Erro em faturamento                       | Alto    | Validação de valores, conciliação, auditoria, estornos rastreáveis |
| Perda de registros financeiros            | Alto    | Backups, impossibilidade de delete físico, trilha de auditoria     |
| Acesso não autorizado a dados financeiros | Alto    | RLS, perfis restritos, auditoria                                   |
| Fraude em aprovações                      | Médio   | Separação de alçadas, aprovação em múltiplos níveis, auditoria     |

### 6.4 Riscos de Privacidade (LGPD)

| Risco                                  | Impacto | Mitigação                                                        |
| -------------------------------------- | ------- | ---------------------------------------------------------------- |
| Exposição de dados sensíveis           | Crítico | Criptografia, RLS, logs sem dados clínicos, mínimo privilégio    |
| Acesso indevido por perfil             | Alto    | RLS por organização/unidade, perfis granulares, auditoria        |
| Retenção além do prazo legal           | Médio   | Política de retenção, descarte automatizado, backup segregado    |
| Compartilhamento não autorizado        | Alto    | Controle de integrações, revisão de fornecedores, logs de acesso |
| Falha em responder direitos do titular | Médio   | Processos documentados, automação onde possível                  |

---

## 7. DEPENDÊNCIAS E DECISÕES PENDENTES

### 7.1 Credenciais e Configuração

**Necessário do usuário:**

- [ ] URL do projeto Supabase
- [ ] Chave pública (anon/public) do Supabase
- [ ] Chave service_role (apenas para configuração local/server)
- [ ] Configuração de SMTP para e-mails (se necessário)
- [ ] Configuração de provedor de TTS para chamadas por voz (se nativo não for suficiente)
- [ ] Domínio customizado do Supabase (para produção)

**Decisões de negócio:**

- [ ] Protocolo de triagem a ser utilizado (Manchester, outro, customizado?)
- [ ] Regras clínicas de interação medicamentosa (qual fonte/base?)
- [ ] Limites terapêuticos a serem implementados (qual protocolo?)
- [ ] Política de retenção de dados (prazos legais e institucionais)
- [ ] Estrutura organizacional (único hospital ou multi-tenancy?)
- [ ] Perfis adicionais além dos básicos?
- [ ] Integrações externas necessárias (sistemas legados, convênios, laboratórios?)

### 7.2 Decisões Técnicas

**Frontend:**

- [ ] Biblioteca de componentes: shadcn/ui ou outra?
- [ ] Biblioteca de formulários: React Hook Form ou outra?
- [ ] Biblioteca de gráficos: Recharts, Chart.js, outra?
- [ ] Biblioteca de ícones: Lucide, Heroicons, outra?
- [ ] Biblioteca de TTS para chamadas de TV: Web Speech API ou serviço externo?

**Backend:**

- [ ] Uso de Edge Functions: Quais operações precisam ser server-side?
- [ ] Estratégia de types: Supabase CLI generate ou manual?
- [ ] Estratégia de testes: Vitest + Playwright ou outros?

**Segurança:**

- [ ] Política de senhas (complexidade, expiração, histórico)
- [ ] MFA: Obrigatório para quais perfis?
- [ ] Sessão: Timeout de inatividade?
- [ ] Auditoria: Quais operações devem ser logadas?

### 7.3 Decisões de Escopo Inicial

**Fase 1 (MVP):**

- [ ] Confirmar módulos a incluir na primeira versão
- [ ] Confirmar se todos os 12 módulos serão implementados ou divididos em fases
- [ ] Confirmar se IA clínica será incluída na primeira versão ou posterior

---

## 8. PLANO DE IMPLEMENTAÇÃO POR ETAPAS

### FASE 1 — FUNDAÇÃO (Estimada: 2-3 semanas)

**Objetivo:** Configurar base técnica e ambiente de desenvolvimento

**Tarefas:**

1. Inicializar projeto React + Vite + TypeScript
2. Configurar Tailwind CSS
3. Instalar e configurar shadcn/ui
4. Configurar ESLint, Prettier, TypeScript strict
5. Instalar Supabase CLI e inicializar projeto
6. Criar estrutura de diretórios
7. Configurar cliente Supabase
8. Criar sistema de design tokens (cores, tipografia, espaçamento)
9. Configurar React Router
10. Configurar ambiente de testes (Vitest)
11. Criar .env.example
12. Documentar configuração em README.md

**Entregáveis:**

- Projeto configurado e rodando
- Design system base
- Estrutura de pastas
- Integração Supabase preparada
- Documentação inicial

**Critérios de Aceitação:**

- `npm run dev` funciona sem erros
- Build de produção funciona
- Linting sem erros
- TypeScript sem erros
- Testes básicos passam

### FASE 2 — BANCO E SEGURANÇA (Estimada: 3-4 semanas)

**Objetivo:** Implementar modelos iniciais, auth, perfis, permissões e RLS

**Tarefas:**

1. Criar migration inicial de organizações e unidades
2. Criar migration de perfis, roles e permissions
3. Configurar Supabase Auth
4. Implementar tabelas de usuários extendidos
5. Criar RLS policies para todas as tabelas iniciais
6. Criar testes de RLS (supabase test db)
7. Implementar sistema de login/logout
8. Implementar recuperação de senha
9. Implementar verificação de permissões
10. Criar tela de login
11. Criar dashboard inicial por perfil
12. Implementar auditoria básica

**Entregáveis:**

- Schema do banco inicial funcional
- Auth operacional
- RLS configurado e testado
- Tela de login funcional
- Dashboard básico por perfil

**Critérios de Aceitação:**

- Login/logout funciona
- Usuários sem permissão não acessam áreas protegidas
- RLS bloqueia acessos indevidos (testes passam)
- Migrations são reversíveis
- Auditoria registra operações sensíveis

### FASE 3 — RECEPÇÃO E ATENDIMENTO (Estimada: 3-4 semanas)

**Objetivo:** Implementar cadastro, check-in, atendimento e filas

**Tarefas:**

1. Criar migrations de pacientes e identificadores
2. Criar migrations de atendimentos e filas
3. Implementar cadastro de pacientes
4. Implementar busca de pacientes
5. Implementar validação de CPF
6. Implementar detecção de duplicidades
7. Implementar geração de senhas
8. Implementar abertura de atendimento
9. Implementar filas por setor
10. Criar tela de recepção
11. Criar tela de dashboard de filas
12. Implementar histórico de atendimentos

**Entregáveis:**

- Cadastro de pacientes funcional
- Sistema de senhas funcional
- Filas operacionais
- Tela de recepção completa

**Critérios de Aceitação:**

- Pacientes podem ser cadastrados
- Busca funciona corretamente
- Senhas são geradas sem duplicidade
- Filas atualizam em tempo real
- Histórico é acessível

### FASE 4 — TRIAGEM, SALAS E TV (Estimada: 4-5 semanas)

**Objetivo:** Implementar avaliação profissional, regras de encaminhamento, painel público e chamadas em tempo real

**Tarefas:**

1. Criar migrations de triagem e sinais vitais
2. Criar migrations de salas e chamadas
3. Implementar registro de triagem
4. Implementar classificação de risco
5. Implementar regras de encaminhamento
6. Configurar Supabase Realtime
7. Implementar geração de chamadas
8. Implementar painel de TV
9. Implementar síntese de voz em português
10. Implementar gestão de salas
11. Criar tela de triagem
12. Criar painel de TV em tela cheia
13. Criar tela de gestão de salas

**Entregáveis:**

- Sistema de triagem funcional
- Classificação de risco operacional
- Painel de TV funcional
- Chamadas em tempo real
- Gestão de salas funcional

**Critérios de Aceitação:**

- Triagem registra dados corretamente
- Classificação segue protocolo
- Chamadas aparecem no painel TV
- Voz funciona em português
- Salas atualizam estado corretamente
- Sem race conditions em chamadas simultâneas

### FASE 5 — PRONTUÁRIO E FARMÁCIA (Estimada: 5-6 semanas)

**Objetivo:** Implementar registros clínicos, prescrições, estoque, dispensação e regras de segurança

**Tarefas:**

1. Criar migrations de prontuário, prescrições, exames
2. Criar migrations de farmácia e estoque
3. Implementar prontuário eletrônico
4. Implementar anamnese
5. Implementar evoluções
6. Implementar diagnósticos
7. Implementar prescrições
8. Implementar catálogo de medicamentos
9. Implementar controle de lotes e validade
10. Implementar reservas de estoque
11. Implementar dispensação
12. Implementar regras de segurança de medicamentos
13. Criar tela de prontuário
14. Criar tela de prescrições
15. Criar tela de farmácia
16. Criar tela de estoque

**Entregáveis:**

- Prontuário eletrônico funcional
- Sistema de prescrições
- Farmácia operacional
- Controle de estoque funcional
- Regras de segurança implementadas

**Critérios de Aceitação:**

- Prontuário registra e recupera dados
- Prescrições seguem fluxo completo
- Alertas de interação funcionam
- Estoque não fica negativo
- Lotes vencidos são bloqueados
- Dispensação é rastreável

### FASE 6 — FINANCEIRO E SUPRIMENTOS (Estimada: 4-5 semanas)

**Objetivo:** Implementar lançamentos, compras, fornecedores, faturamento e conciliação

**Tarefas:**

1. Criar migrations de financeiro e compras
2. Implementar lançamentos financeiros
3. Implementar contas a pagar/receber
4. Implementar faturamento
5. Implementar convênios
6. Implementar cadastro de fornecedores
7. Implementar solicitações de compra
8. Implementar pedidos de compra
9. Implementar recebimento
10. Implementar conciliação
11. Criar telas financeiras
12. Criar telas de compras

**Entregáveis:**

- Módulo financeiro funcional
- Sistema de compras operacional
- Faturamento funcional
- Conciliação implementada

**Critérios de Aceitação:**

- Lançamentos são registrados corretamente
- Fluxo de caixa é consistente
- Faturas são geradas
- Pedidos seguem alçadas
- Recebimento integra com estoque

### FASE 7 — ENFERMAGEM (Estimada: 3-4 semanas)

**Objetivo:** Implementar plano de cuidados, aprazamento e administração de medicamentos

**Tarefas:**

1. Criar migrations de enfermagem
2. Implementar plano de cuidados
3. Implementar aprazamento de tarefas
4. Implementar verificação antes da administração
5. Implementar registro de administração
6. Implementar registro de recusa/omissão
7. Criar tela de enfermagem
8. Criar tela de tarefas pendentes

**Entregáveis:**

- Módulo de enfermagem funcional
- Administração de medicamentos rastreável
- Tarefas organizadas por horário

**Critérios de Aceitação:**

- Tarefas são aprazadas corretamente
- 5 certos são verificados
- Administração é registrada
- Recusas são justificadas

### FASE 8 — ASSISTENTES DE IA (Estimada: 4-5 semanas)

**Objetivo:** Implementar recursos de apoio com privacidade, limites e revisão humana

**Tarefas:**

1. Definir arquitetura de IA
2. Selecionar provedor de IA (OpenAI, outro)
3. Implementar resumo de histórico
4. Implementar sugestões de hipóteses
5. Implementar identificação de dados ausentes
6. Implementar apoio à documentação
7. Implementar proteção de dados enviados
8. Implementar logs de auditoria
9. Criar interface de assistente
10. Documentar limitações e grau de incerteza

**Entregáveis:**

- Assistente de IA funcional
- Proteção de dados implementada
- Auditoria de operações de IA
- Documentação de limitações

**Critérios de Aceitação:**

- IA não toma decisões clínicas autônomas
- Dados são minimizados antes do envio
- Sugestões indicam origem e limitações
- Auditoria registra uso
- Configuração aprovada pode ser desativada

### FASE 9 — SETORES ADICIONAIS (Estimada: 6-8 semanas)

**Objetivo:** Implementar internação, leitos, laboratório e outros módulos conforme prioridades

**Tarefas:**

1. Criar migrations de internação e leitos
2. Implementar gestão de leitos
3. Implementar internações
4. Implementar transferências
5. Implementar alta hospitalar
6. Implementar módulo de laboratório (se necessário)
7. Implementar centro cirúrgico (se necessário)
8. Criar telas correspondentes

**Entregáveis:**

- Módulos adicionais conforme prioridade
- Integração com módulos existentes

**Critérios de Aceitação:**

- Leitos atualizam ocupação
- Internações seguem fluxo
- Integração com prontuário funciona

### FASE 10 — HOMOLOGAÇÃO (Estimada: 4-6 semanas)

**Objetivo:** Executar testes integrados, testes de segurança, revisão visual e validação dos fluxos

**Tarefas:**

1. Executar testes E2E de todos os fluxos
2. Executar testes de segurança (penetration test básico)
3. Executar testes de carga
4. Testar recuperação de backup
5. Revisar interface visual em diferentes telas
6. Validar todos os fluxos de negócio
7. Corrigir bugs encontrados
8. Otimizar performance
9. Documentar problemas conhecidos
10. Preparar ambiente de produção

**Entregáveis:**

- Relatório de testes
- Lista de bugs corrigidos
- Lista de problemas conhecidos
- Documentação de produção
- Sistema pronto para deploy

**Critérios de Aceitação:**

- Todos os testes críticos passam
- Sem vulnerabilidades críticas conhecidas
- Performance aceitável
- Interface consistente
- Documentação completa

### FASE 11 — PREPARAÇÃO PARA PRODUÇÃO

**Objetivo:** Documentar pendências, revisar riscos e aguardar aprovação

**Tarefas:**

1. Revisar checklist de segurança
2. Revisar checklist de LGPD
3. Documentar configurações de produção
4. Documentar procedimentos de backup
5. Documentar procedimentos de emergência
6. Preparar plano de rollback
7. Documentar dependências externas
8. Agendar treinamento de usuários
9. Definir plano de suporte
10. Solicitar aprovação formal

**Entregáveis:**

- Checklist de produção
- Documentação de procedimentos
- Plano de suporte
- Solicitação de aprovação

**Critérios de Aceitação:**

- Todos os checklists completos
- Procedimentos documentados
- Riscos identificados e mitigados
- Aprovação obtida

---

## 9. CRITÉRIOS DE ACEITAÇÃO E TESTES POR ETAPA

### 9.1 Critérios Gerais (Aplicam a todas as fases)

- [ ] Código compila sem erros (TypeScript)
- [ ] Linting passa sem erros (ESLint)
- [ ] Formatação consistente (Prettier)
- [ ] Testes unitários passam
- [ ] Sem warnings de segurança
- [ ] Documentação atualizada
- [ ] Commits descritivos
- [ ] Segredos não expostos

### 9.2 Testes Específicos por Módulo

**Autenticação:**

- [ ] Usuário válido consegue fazer login
- [ ] Usuário inválido não consegue fazer login
- [ ] Senha incorreta é rejeitada
- [ ] Sessão expira após inatividade
- [ ] Logout funciona
- [ ] Recuperação de senha segue fluxo seguro
- [ ] MFA funciona (quando configurado)

**RLS e Permissões:**

- [ ] Usuário sem sessão não acessa áreas protegidas
- [ ] Usuário sem permissão não executa operações privilegiadas
- [ ] Um hospital não acessa dados de outro (multi-tenancy)
- [ ] RLS bloqueia leituras indevidas
- [ ] RLS bloqueia escritas indevidas
- [ ] Views são protegidas adequadamente
- [ ] Testes de RLS passam (supabase test db)

**Recepção:**

- [ ] Paciente pode ser cadastrado
- [ ] CPF é validado corretamente
- [ ] Duplicidades são detectadas
- [ ] Senha é gerada sem conflito
- [ ] Atendimento é aberto
- [ ] Fila é atualizada
- [ ] Histórico é acessível

**Triagem:**

- [ ] Apenas perfil autorizado faz triagem
- [ ] Sinais vitais são registrados
- [ ] Classificação segue protocolo
- [ ] Prioridade é definida
- [ ] Encaminhamento é automático
- [ ] Reavaliação é possível

**Filas e TV:**

- [ ] Chamadas são geradas sem duplicidade
- [ ] Painel TV atualiza em tempo real
- [ ] Voz funciona em português
- [ ] Sala é associada corretamente
- [ ] Chegada é confirmada
- [ ] Repetição funciona
- [ ] Cancelamento funciona
- [ ] Sem race conditions em chamadas simultâneas

**Prontuário:**

- [ ] Histórico é acessível
- [ ] Anamnese é registrada
- [ ] Evoluções são rastreáveis
- [ ] Diagnósticos são registrados
- [ ] Exames são solicitados
- [ ] Apenas perfis autorizados acessam dados clínicos
- [ ] Alterações têm autor e horário

**Prescrições:**

- [ ] Medicamento é selecionado
- [ ] Dose, via, frequência são definidos
- [ ] Alergias são verificadas
- [ ] Interações são alertadas
- [ ] Contraindicações são verificadas
- [ ] Disponibilidade é verificada
- [ ] Alertas críticos bloqueiam ou exigem justificativa
- [ ] Prescrição é rastreável

**Farmácia e Estoque:**

- [ ] Catálogo é gerenciado
- [ ] Lotes são controlados
- [ ] Validade é verificada
- [ ] Estoque não fica negativo
- [ ] Reservas não são consumidas indevidamente
- [ ] Dispensação é rastreável
- [ ] Lote vencido é bloqueado
- [ ] Movimentações simultâneas não causam inconsistência
- [ ] Inventário é possível

**Enfermagem:**

- [ ] Plano de cuidados é criado
- [ ] Tarefas são aprazadas
- [ ] 5 certos são verificados
- [ ] Administração é registrada
- [ ] Recusa é justificada
- [ ] Omissão é justificada
- [ ] Horário é rastreável

**Financeiro:**

- [ ] Lançamentos são registrados
- [ ] Fluxo de caixa é consistente
- [ ] Faturas são geradas
- [ ] Convênios são processados
- [ ] Operações repetidas não duplicam
- [ ] Estornos são rastreáveis
- [ ] Aprovações seguem alçadas

**Segurança:**

- [ ] Usuários são gerenciados
- [ ] Perfis são atribuídos
- [ ] Permissões são granulares
- [ ] Auditoria registra operações sensíveis
- [ ] Logs não contêm dados clínicos desnecessários
- [ ] Segredos não estão expostos

**IA:**

- [ ] IA não toma decisões clínicas autônomas
- [ ] Sugestões indicam origem e limitações
- [ ] Dados são minimizados
- [ ] Auditoria registra uso
- [ ] Configuração pode ser desativada
- [ ] Logs não armazenam prontuário completo

---

## 10. PRÓXIMA ETAPA RECOMENDADA

Após revisão e aprovação deste planejamento, recomendo iniciar a **FASE 1 — FUNDAÇÃO**, que inclui:

1. Inicialização do projeto React + Vite + TypeScript
2. Configuração de Tailwind CSS e shadcn/ui
3. Configuração de Supabase CLI
4. Criação da estrutura de diretórios
5. Configuração do design system
6. Configuração de ambiente de testes

**Pré-requisitos para iniciar FASE 1:**

- [ ] Aprovação do planejamento
- [ ] Credenciais do Supabase (URL e chave pública)
- [ ] Decisão sobre biblioteca de componentes (shadcn/ui confirmado?)
- [ ] Decisão sobre biblioteca de formulários (React Hook Form confirmado?)
- [ ] Decisão sobre escopo inicial (todos os módulos ou faseados?)

---

## 11. ANEXOS

### 11.1 Referências Consultadas

- [Vitalis Hospital - Interface de Referência](https://sentinela-rosy.vercel.app/login.html)
- [Repositório middlewares-hospital](https://github.com/Ferre1ra10/middlewares-hospital)
- [Documentação Supabase](https://supabase.com/docs)
- [Supabase RLS Guide](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase React Quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)
- [Documentação Devin Desktop](https://docs.windsurf.com/)

### 11.2 Padrões de Código

**TypeScript:**

- Strict mode habilitado
- Tipagem explícita em interfaces públicas
- No `any` (exceto em casos justificados com comentário)
- Preferir composição sobre herança

**React:**

- Functional components
- Hooks para estado e efeitos
- Custom hooks para lógica reutilizável
- Props com TypeScript interfaces

**SQL:**

- Migrations versionadas
- Nomes de tabelas em snake_case
- Chaves estrangeiras explícitas
- Constraints no banco

**Nomenclatura:**

- Componentes: PascalCase
- Funções/hooks: camelCase
- Constantes: UPPER_SNAKE_CASE
- Arquivos: kebab-case (exceto componentes)

---

**Documento versão 1.0**
**Status:** Aguardando aprovação
**Próxima revisão:** Após feedback do usuário
