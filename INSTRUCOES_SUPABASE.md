# Instruções para Configurar o Supabase

## ✅ Status Atual

**Projeto Supabase já criado automaticamente!**

- **Nome:** Sentinela Hospital
- **Project ID:** pugwafrgxthzintfzbvq
- **Região:** São Paulo (sa-east-1)
- **Status:** Ativo e Saudável
- **Custo:** $0/mês (plano gratuito)

**Credenciais já configuradas no .env.local** ✅

## Passo 1: Aplicar o Schema SQL

A única coisa que você precisa fazer manualmente é aplicar o SQL no dashboard:

1. Acesse o dashboard do projeto: https://supabase.com/dashboard/project/pugwafrgxthzintfzbvq
2. Vá em **SQL Editor** (ícone de terminal na barra lateral)
3. Clique em "New Query"
4. Copie todo o conteúdo do arquivo `supabase/migrations/20240101000000_initial_schema.sql`
5. Cole no SQL Editor
6. Clique em **Run** (ou pressione Ctrl+Enter)
7. Aguarde a execução (deve mostrar "Success")

## Passo 2: Criar o Primeiro Usuário (Opcional)

Após aplicar o SQL, você pode criar um usuário admin no SQL Editor:

```sql
-- NOTA: Para criar usuários reais com senhas, use o dashboard em Authentication > Users
-- Este é apenas um exemplo de como conectar a tabela profiles com auth.users
```

Para criar usuários reais:
1. No dashboard, vá em **Authentication** > **Users**
2. Clique em "Add user"
3. Preencha email e senha
4. O profile será criado automaticamente via trigger (que vamos implementar depois)

## Passo 3: Aplicar o Schema SQL

1. No dashboard do seu projeto, vá em **SQL Editor** (ícone de terminal)
2. Clique em "New Query"
3. Copie todo o conteúdo do arquivo `supabase/migrations/20240101000000_initial_schema.sql`
4. Cole no SQL Editor
5. Clique em **Run** (ou pressione Ctrl+Enter)
6. Aguarde a execução (deve mostrar "Success")

## Passo 4: Configurar o Projeto Local

1. Crie um arquivo `.env.local` na raiz do projeto:
   ```bash
   cp .env.example .env.local
   ```

2. Edite o `.env.local` com suas credenciais:
   ```env
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
   ```

3. Atualize o arquivo `supabase/config.toml` com o project ref:
   ```toml
   [project]
   ref = "seu-project-ref-aqui"
   ```
   (O project ref está na URL do dashboard: `https://supabase.com/dashboard/project/SEU-REF-AQUI`)

## Passo 5: Habilitar o Auth

1. No dashboard, vá em **Authentication** > **Providers**
2. Certifique-se que **Email** está habilitado
3. (Opcional) Configure SMTP para envio de e-mails reais

## Passo 6: Criar o Primeiro Usuário

No SQL Editor, execute:

```sql
-- Criar um usuário admin para testes
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
VALUES ('admin@sentinela.com', 'encrypted_password_placeholder', NOW());

-- Criar o profile do admin
INSERT INTO profiles (id, full_name, role, unit_id)
SELECT
  auth.users.id,
  'Administrador',
  'admin',
  (SELECT id FROM units WHERE name = 'Matriz')
FROM auth.users
WHERE auth.users.email = 'admin@sentinela.com';
```

**Nota:** Para criar usuários reais com senhas, use o Supabase Auth UI ou o dashboard.

## Passo 7: Testar

1. Execute o projeto:
   ```bash
   npm run dev
   ```

2. Acesse http://localhost:5173

3. Você deve ver a tela de login

## Troubleshooting

### Erro "relation does not exist"
- Verifique se a migration foi executada com sucesso
- Execute a query simples no SQL Editor para testar: `SELECT * FROM organizations;`

### Erro de permissão
- Verifique se as políticas RLS foram criadas
- Verifique se você está autenticado

### Auth não funciona
- Verifique se as credenciais no `.env.local` estão corretas
- Verifique se o Email provider está habilitado no dashboard

## Próximos Passos

Após configurar o Supabase, podemos:
- Implementar o login real
- Criar as telas de cadastro de pacientes
- Implementar a triagem
- Etc.
