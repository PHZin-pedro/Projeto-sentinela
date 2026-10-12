# Guia de Segurança - Sentinela Hospital

## Princípios Fundamentais

1. **Defense in Depth**: Múltiplas camadas de segurança
2. **Least Privilege**: Mínimo acesso necessário
3. **Security by Design**: Segurança desde o início
4. **Zero Trust**: Nunca confiar, sempre verificar

## Autenticação

### Supabase Auth

- Gerenciado via Supabase Auth
- JWT tokens com expiração
- Refresh tokens automáticos
- MFA planejado para operações sensíveis

### Boas Práticas

- Nunca armazenar senhas em plain text
- Usar HTTPS em produção
- Implementar rate limiting
- Detectar e bloquear tentativas de brute force

## Autorização

### Perfis de Usuário

Definidos em `src/constants/roles.ts`:

- `admin`: Acesso completo
- `medico`: Prontuário, prescrições
- `enfermeiro`: Cuidados, administração
- `recepcionista`: Cadastro, filas
- `farmaceutico`: Estoque, dispensação
- `financeiro`: Faturamento, contas
- `triagem`: Triagem, classificação

### Permissões Granulares

Cada operação deve ter permissão explícita:

- `patient.create`
- `patient.read`
- `triage.classify`
- `prescription.create`
- etc.

## Row Level Security (RLS)

### Princípios

1. **Habilitar RLS em toda tabela exposta**
2. **Revogar grants padrão** (anon, authenticated)
3. **Conceder apenas grants necessários**
4. **Criar políticas explícitas** por operação
5. **Testar políticas** com Supabase test db

### Exemplo de Política Segura

```sql
-- Habilitar RLS
alter table public.patients enable row level security;

-- Revogar grants padrão
revoke all on table public.patients from anon, authenticated;

-- Conceder apenas SELECT para authenticated
grant select on table public.patients to authenticated;

-- Política: Usuários só veem pacientes de sua organização
create policy "Users can view patients from their organization"
on public.patients for select
to authenticated
using (
  organization_id = (
    select organization_id
    from public.user_organizations
    where user_id = auth.uid()
  )
);
```

### Testing RLS

Criar testes em `supabase/tests/*.test.sql`:

```sql
begin;
select plan(4);

-- Teste: anon não pode ler
set local role anon;
select throws_ok(
  $$select * from patients$$,
  '42501',
  null,
  'anon cannot read patients'
);

-- Teste: authenticated pode ler próprios pacientes
set local role authenticated;
select results_eq(
  $$select * from patients where organization_id = 'org-123'$$,
  ...
  'authenticated reads own patients'
);

select * from finish();
rollback;
```

Executar:

```bash
supabase test db
```

## Proteção de Dados

### Dados Sensíveis

- Nunca expor dados clínicos em logs
- Logs de auditoria sem dados identificáveis
- Minimizar dados enviados a serviços externos (IA)

### Criptografia

- Dados em trânsito: HTTPS (TLS 1.2+)
- Dados em repouso: Criptografia Supabase
- Senhas: Bcrypt/Argon2 (gerenciado pelo Supabase)

### LGPD

- Inventário de dados tratados
- Finalidades documentadas
- Minimização de coleta
- Direitos dos titulares
- Política de retenção
- Procedimento de incidentes

## Segurança no Frontend

### Validação

- Validação no frontend para UX
- Validação no backend para segurança
- Validação no banco para integridade

### XSS Prevention

- React sanitiza por padrão
- Nunca usar `dangerouslySetInnerHTML` sem sanitização
- Validar e sanitizar inputs de usuário

### CSRF Protection

- Supabase Auth gerencia automaticamente
- SameSite cookies
- CSRF tokens para state-changing operations

## Segurança no Backend

### Edge Functions

- Nunca expor service_role no frontend
- Validar todos os inputs
- Rate limiting
- Timeout adequado

### SQL Injection

- Usar parameterized queries
- Supabase client abstrai isso
- Nunca concatenar strings em SQL

## Segurança no Banco

### Privilégios

- Revogar grants padrão
- Conceder mínimo necessário
- Service role apenas server-side

### Constraints

- Chaves estrangeiras
- Unique constraints
- Check constraints
- Not null constraints

### Views

- Views com `security definer` bypassam RLS
- Criar views com segurança
- Testar acesso a views

## Auditoria

### O que Logar

- Login/logout
- Operações sensíveis (prescrições, dispensações)
- Alterações em dados clínicos
- Acesso a dados financeiros
- Mudanças de permissões

### O que NÃO Logar

- Senhas
- Tokens
- Dados clínicos completos
- Informações de saúde sensíveis

### Implementação

```sql
create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  action text not null,
  table_name text not null,
  record_id uuid,
  old_data jsonb,
  new_data jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone default now()
);
```

## Vulnerabilidades Comuns

### OWASP Top 10

1. **Broken Access Control**: RLS resolve
2. **Cryptographic Failures**: HTTPS + Supabase
3. **Injection**: Parameterized queries
4. **Insecure Design**: Security by design
5. **Security Misconfiguration**: Hardening guide
6. **Vulnerable Components**: Dependências atualizadas
7. **Authentication Failures**: Supabase Auth
8. **Software/Data Integrity**: Version control
9. **Security Logging**: Audit logs
10. **SSRF**: Edge functions restritas

## Checklist de Segurança

### Antes do Deploy

- [ ] RLS habilitado em todas as tabelas
- [ ] Políticas testadas com `supabase test db`
- [ ] Grants mínimos configurados
- [ ] Service role não exposto no frontend
- [ ] HTTPS habilitado
- [ ] Variáveis de ambiente configuradas
- [ ] Dependências sem vulnerabilidades críticas
- [ ] Logs não contêm dados sensíveis
- [ ] Backup configurado
- [ ] Migrations versionadas

### Regularmente

- [ ] Atualizar dependências
- [ ] Revisar logs de auditoria
- [ ] Testar restore de backup
- [ ] Revisar políticas RLS
- [ ] Penetration test
- [ ] Revisar permissões de usuários

## Incident Response

### Plano de Resposta

1. **Detecção**: Monitoramento e alertas
2. **Contenção**: Isolar sistemas afetados
3. **Eradicação**: Remover causa raiz
4. **Recuperação**: Restaurar de backup
5. **Lições Aprendidas**: Documentar e melhorar

### Contatos

- [ ] Equipe de segurança
- [ ] Equipe legal
- [ ] Equipe de comunicação
- [ ] Autoridades (se necessário)

## Referências

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Supabase Security Guide](https://supabase.com/docs/guides/security)
- [LGPD](https://www.gov.br/anpd/pt-br)
- [CIS Benchmarks](https://www.cisecurity.org/cis-benchmarks)
