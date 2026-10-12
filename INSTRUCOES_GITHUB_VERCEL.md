# Instruções para Configurar GitHub e Vercel

## Passo 1: Instalar Git (se ainda não tiver)

1. Baixe o Git em: https://git-scm.com/download/win
2. Execute o instalador
3. Durante a instalação, escolha:
   - "Git from the command line and also from 3rd-party software"
   - "Use OpenSSH"
   - "Checkout Windows-style, commit Unix-style line endings"
4. Após instalar, reinicie o terminal

## Passo 2: Criar Repositório no GitHub

1. Acesse https://github.com
2. Faça login ou crie uma conta
3. Clique no **+** no canto superior direito
4. Selecione **New repository**
5. Preencha:
   - **Repository name:** sentinela-hospital
   - **Description:** Sistema Hospitalar Integrado
   - **Public/Private:** Private (recomendado para projetos hospitalares)
6. Clique em **Create repository**
7. **NÃO** inicialize com README, .gitignore ou license (já temos)

## Passo 3: Fazer Upload do Código

### Opção A - Via GitHub Desktop (mais fácil)

1. Baixe o GitHub Desktop: https://desktop.github.com/
2. Instale e faça login
3. Clique em **File** > **Add Local Repository**
4. Selecione a pasta: `C:\Users\nsxpr\OneDrive\Desktop\peojeto sntinela`
5. Clique em **Add repository**
6. No GitHub Desktop:
   - Vá em **Repository** > **Repository Settings**
   - Em "Publish repository", selecione o repositório que você criou
   - Clique em **Publish repository**

### Opção B - Via linha de comando

Abra o terminal na pasta do projeto e execute:

```bash
cd "C:\Users\nsxpr\OneDrive\Desktop\peojeto sntinela"

# Inicializar git
git init

# Adicionar todos os arquivos
git add .

# Commit inicial
git commit -m "Initial commit - Sentinela Hospital Foundation"

# Adicionar remote (substitua SEU_USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU_USUARIO/sentinela-hospital.git

# Enviar para o GitHub
git branch -M main
git push -u origin main
```

## Passo 4: Configurar Vercel

1. Acesse https://vercel.com
2. Faça login com sua conta do GitHub
3. Clique em **Add New** > **Project**
4. Importe o repositório `sentinela-hospital`
5. Configure as variáveis de ambiente:
   - **VITE_SUPABASE_URL:** Cole sua URL do Supabase
   - **VITE_SUPABASE_ANON_KEY:** Cole sua chave anon do Supabase
6. Clique em **Deploy**

## Passo 5: Atualizar o `.env.local` Local

Após configurar no Vercel, atualize seu arquivo `.env.local` local com as mesmas credenciais:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

## Passo 6: Aplicar o Schema no Supabase

Siga as instruções do arquivo `INSTRUCOES_SUPABASE.md` para aplicar o SQL no Supabase.

## Verificação

Após tudo configurado:

1. No Vercel, você verá o projeto em deploy
2. O Vercel fornecerá uma URL (ex: https://sentinela-hospital.vercel.app)
3. Acesse essa URL para ver o projeto em produção
4. O projeto deve mostrar a tela de login

## Fluxo de Trabalho Futuro

Para fazer atualizações:

```bash
# Ver mudanças
git status

# Adicionar mudanças
git add .

# Commit
git commit -m "Descrição da mudança"

# Push
git push
```

O Vercel fará deploy automático a cada push!

## Troubleshooting

### Git não reconhecido
- Instale o Git: https://git-scm.com/download/win
- Reinicie o terminal após instalar

### Erro de permissão no GitHub
- Verifique se o repositório está configurado como Private
- Verifique suas credenciais do GitHub

### Deploy falha no Vercel
- Verifique se as variáveis de ambiente estão configuradas
- Verifique os logs de build no Vercel
- Verifique se o build passa localmente: `npm run build`

### Variáveis de ambiente não funcionando
- Certifique-se que o nome começa com `VITE_`
- Verifique se está no `.env.local` (não commitar)
- No Vercel, configure em Environment Variables
