# Sentinela Hospital - Sistema Hospitalar Integrado

Plataforma web hospitalar integrada, profissional e segura desenvolvida com React, TypeScript e Supabase.

## 🏥 Visão Geral

O Sentinela Hospital é um sistema completo para gestão hospitalar que integra:

- **Recepção e Cadastro de Pacientes**
- **Triagem e Classificação de Risco**
- **Prontuário Eletrônico**
- **Gestão de Salas e Filas**
- **Chamadas por TV em Tempo Real**
- **Prescrições e Administração de Medicamentos**
- **Farmácia e Controle de Estoque**
- **Faturamento e Gestão Financeira**
- **Compras e Suprimentos**
- **Enfermagem e Plano de Cuidados**
- **Assistência por IA (planejado)**
- **Gestão de Usuários e Permissões**

## 🛠️ Stack Tecnológico

### Frontend

- **React 18+** com TypeScript strict mode
- **Vite** como bundler e dev server
- **Tailwind CSS** para estilização
- **shadcn/ui** como biblioteca de componentes acessíveis
- **React Router v6+** para navegação
- **React Hook Form + Zod** para formulários e validação

### Backend e Dados

- **Supabase** como plataforma central
  - PostgreSQL 15+
  - Supabase Auth
  - Supabase Storage
  - Row Level Security (RLS)
  - Edge Functions (TypeScript)
  - Realtime para atualizações em tempo real

### Qualidade e Testes

- **ESLint** com configuração estrita
- **Prettier** para formatação
- **TypeScript strict mode**
- **Vitest** para testes unitários e de integração
- **Playwright** para testes E2E (planejado)

## 📋 Pré-requisitos

- Node.js 18+ ou 20+
- npm ou yarn
- Conta no Supabase (ou projeto local com Supabase CLI)

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone <repository-url>
cd sentinela-hospital
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o Supabase

#### Opção A: Usar projeto existente

1. Crie um arquivo `.env.local` na raiz do projeto:

```bash
cp .env.example .env.local
```

2. Edite `.env.local` com suas credenciais do Supabase:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Obtenha essas credenciais em: https://supabase.com/dashboard/project/_/settings/api

#### Opção B: Desenvolvimento local com Supabase CLI

1. Instale o Supabase CLI (se ainda não tiver):

```bash
npm install -g supabase
```

2. Inicialize o projeto local:

```bash
supabase init
```

3. Inicie o Supabase local:

```bash
supabase start
```

4. Use as credenciais locais no seu `.env.local`

### 4. Gere os tipos TypeScript do banco

Quando o schema estiver definido:

```bash
# Para projeto local
npx supabase gen types typescript --local > src/lib/supabase/database.types.ts

# Para projeto remoto
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/supabase/database.types.ts
```

### 5. Execute o projeto

```bash
npm run dev
```

Acesse http://localhost:5173

## 📁 Estrutura do Projeto

```
sentinela-hospital/
├── .devin/                  # Skills específicas do projeto
├── supabase/
│   ├── migrations/          # Migrations SQL versionadas
│   ├── functions/           # Edge Functions TypeScript
│   ├── tests/               # Testes de banco e políticas RLS
│   └── config.toml          # Configuração do Supabase CLI
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── ui/              # Componentes base (shadcn/ui)
│   │   ├── auth/            # Componentes de autenticação
│   │   ├── patient/         # Componentes específicos de paciente
│   │   ├── medical/         # Componentes específicos médicos
│   │   ├── pharmacy/        # Componentes de farmácia
│   │   ├── financial/       # Componentes financeiros
│   │   └── common/          # Componentes compartilhados
│   ├── pages/               # Páginas/route components
│   ├── layouts/             # Layouts reutilizáveis
│   ├── lib/                 # Bibliotecas e configurações
│   │   ├── supabase.ts      # Cliente Supabase
│   │   └── utils.ts         # Utilitários gerais
│   ├── hooks/               # Custom React hooks
│   ├── services/            # Serviços de negócio
│   ├── stores/              # Estado global
│   ├── types/               # Tipos TypeScript customizados
│   ├── constants/           # Constantes do sistema
│   └── validators/          # Validadores (Zod schemas)
├── tests/                   # Testes
│   ├── unit/                # Testes unitários
│   ├── integration/         # Testes de integração
│   └── e2e/                 # Testes E2E
├── .env.example             # Template de variáveis de ambiente
├── .eslintrc.json           # Configuração ESLint
├── .prettierrc              # Configuração Prettier
├── tsconfig.json            # Configuração TypeScript
├── vite.config.ts           # Configuração Vite
├── vitest.config.ts         # Configuração Vitest
└── package.json
```

## 🧪 Testes

### Executar testes unitários

```bash
npm test
```

### Executar testes com watch mode

```bash
npm test -- --watch
```

### Executar testes com UI

```bash
npm run test:ui
```

## 🔨 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa ESLint
- `npm test` - Executa testes
- `npm run test:ui` - Executa testes com UI

## 🔒 Segurança

### Row Level Security (RLS)

Todas as tabelas expostas devem ter RLS habilitado com políticas explícitas. Veja [SECURITY.md](./SECURITY.md) para detalhes.

### Proteção de Dados

- Dados sensíveis nunca são expostos no frontend
- Chaves service_role nunca são usadas no cliente
- Logs não contêm dados clínicos identificáveis
- Auditoria de operações sensíveis

## 📄 Documentação Adicional

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitetura técnica detalhada
- [SECURITY.md](./SECURITY.md) - Guia de segurança
- [DATA_MODEL.md](./DATA_MODEL.md) - Modelo de dados
- [TESTING.md](./TESTING.md) - Guia de testes
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guia de deploy
- [CHANGELOG.md](./CHANGELOG.md) - Histórico de mudanças

## 🤝 Contribuindo

Este é um projeto hospitalar crítico. Contribuições devem seguir:

1. Código遵循 os padrões estabelecidos
2. Testes para novas funcionalidades
3. Documentação atualizada
4. Revisão de segurança para mudanças sensíveis

## 📄 Licença

[Adicionar licença apropriada]

## 🆘 Suporte

Para questões relacionadas ao desenvolvimento, consulte a documentação do [Supabase](https://supabase.com/docs) e [React](https://react.dev).

## ⚠️ Aviso Importante

Este sistema está em desenvolvimento. Não deve ser usado em ambiente de produção sem:

- Revisão completa de segurança
- Validação clínica dos fluxos
- Testes exaustivos
- Conformidade com regulamentações locais (LGPD, ANVISA, etc.)
- Backup e recuperação testados
