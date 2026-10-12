# Arquitetura Técnica - Sentinela Hospital

## Visão Geral

O Sentinela Hospital segue uma arquitetura de servidor-frontend moderna com Supabase como backend BaaS (Backend as a Service).

## Frontend

### Padrões de Arquitetura

- **Component-based architecture**: Interface construída com componentes reutilizáveis
- **Separation of concerns**: Separação clara entre UI, lógica de negócio e acesso a dados
- **Custom hooks**: Lógica reutilizável encapsulada em hooks
- **Server-first approach**: Validações críticas no servidor/banco, frontend apenas como UX

### Estrutura de Camadas

```
┌─────────────────────────────────────┐
│         UI Components                │
│  (shadcn/ui + custom components)    │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│         Custom Hooks                 │
│  (useAuth, usePatient, useQueue...) │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│         Services                    │
│  (business logic abstraction)       │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│         Supabase Client              │
│  (data access layer)                │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│         Supabase Backend             │
│  (PostgreSQL + Auth + RLS)          │
└─────────────────────────────────────┘
```

## Backend

### Supabase como Backend

O Supabase fornece:

1. **PostgreSQL**: Banco de dados relacional
2. **Auth**: Autenticação de usuários
3. **RLS**: Row Level Security para segurança no nível de linha
4. **Storage**: Armazenamento de arquivos
5. **Realtime**: Atualizações em tempo real via WebSockets
6. **Edge Functions**: Funções server-side em TypeScript

### Migrations

Todas as alterações de schema são versionadas via SQL migrations em `supabase/migrations/`.

Exemplo de naming convention:

- `20240101000000_initial_schema.sql`
- `20240102120000_add_patients_table.sql`

### RLS (Row Level Security)

RLS é a principal camada de segurança. Cada tabela exposta deve:

1. Ter RLS habilitado
2. Ter grants mínimos necessários
3. Ter políticas explícitas para SELECT, INSERT, UPDATE, DELETE
4. Ter testes de RLS em `supabase/tests/`

## Segurança

### Defense in Depth

1. **Frontend**: Validação de UX, feedback ao usuário
2. **Backend (Edge Functions)**: Validação de regras de negócio
3. **Banco (RLS)**: Autorização no nível de dados
4. **Criptografia**: Dados em trânsito (HTTPS) e em repouso

### Autenticação

- Supabase Auth gerencia sessões
- JWT tokens com expiração configurável
- Refresh tokens automáticos
- MFA planejado para operações sensíveis

### Autorização

- Perfis de usuário definidos no banco
- Permissões granulares por módulo
- RLS garante isolamento de dados
- Auditoria de operações sensíveis

## Performance

### Frontend

- Code splitting via React.lazy
- Lazy loading de rotas
- Cache de dados com TanStack Query (planejado)
- Otimização de imagens

### Backend

- Índices apropriados no banco
- Queries otimizadas
- Edge Functions em regiões próximas aos usuários
- Realtime apenas para dados que realmente precisam

## Escalabilidade

### Horizontal Scaling

- Frontend: Static deploy via CDN (Vercel, Netlify, etc.)
- Backend: Supabase escala automaticamente
- Banco: PostgreSQL com conexões pooladas

### Vertical Scaling

- Supabase oferece planos com mais recursos
- Migrations facilitam upgrade de schema

## Integrações

### Atuais

- Supabase (dados, auth, storage)

### Planejadas

- TTS para chamadas de TV (Web Speech API ou serviço externo)
- Provedor de IA para assistente clínico
- Integrações com sistemas legados (conforme necessidade)

## Monitoramento

### Logs

- Auditoria de operações sensíveis no banco
- Logs de erro no frontend
- Logs de acesso (sem dados clínicos)

### Métricas

- Performance de queries
- Tempo de resposta
- Erros por tipo

## Backup e Recuperação

### Supabase

- Backups diários automáticos
- Point-in-time recovery (7 dias em planos paid)
- Migrations versionadas facilitam restore

### Processo

1. Backups automáticos pelo Supabase
2. Migrations versionadas no repositório
3. Testes de restore em ambiente de staging

## Desenvolvimento Local

### Supabase Local

```bash
supabase start
```

Inicia:

- PostgreSQL local
- Auth local
- Storage local
- Studio local em http://localhost:54323

### Migrations Locais

```bash
supabase db diff
supabase db reset
```

## Deploy

### Frontend

Opções:

- Vercel (recomendado)
- Netlify
- Cloudflare Pages

### Backend

Supabase gerencia automaticamente. Basta:

1. Aplicar migrations no projeto remoto
2. Configurar variáveis de ambiente
3. Deploy das Edge Functions (se houver)

## Testes

### Unitários

- Vitest para testes de lógica pura
- @testing-library/react para componentes

### Integração

- Testes de RLS com Supabase test db
- Testes de serviços

### E2E

- Playwright para fluxos críticos de usuário

## Decisões Arquiteturais

### Por que Supabase?

- **Rapidez de desenvolvimento**: BaaS com infraestrutura pronta
- **Segurança built-in**: RLS, Auth, Storage seguros por padrão
- **Escalabilidade**: Cresce automaticamente
- **Open Source**: Base em PostgreSQL, possível migração
- **Realtime**: Atualizações em tempo real sem boilerplate

### Por que TypeScript?

- Type safety em todo o stack
- Autocomplete e refactoring melhores
- Menos bugs em runtime
- Tipos gerados do schema do banco

### Por que shadcn/ui?

- Componentes acessíveis (Radix UI)
- Customizáveis com Tailwind
- Sem dependência pesada (copia código)
- Design system consistente

## Referências

- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
