# Zro Finanças — preparação para SaaS

Aplicação de finanças pessoais construída com React, TanStack Start, Vite e Supabase.

## Desenvolvimento local

Requisitos: Node.js 22+ e npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Sem credenciais válidas do Supabase, o app usa um adaptador de demonstração baseado no navegador **somente durante desenvolvimento**. Não use dados reais nessa modalidade. O build de produção falha intencionalmente se as variáveis de nuvem não estiverem configuradas.

## Configurar o Supabase

1. Crie um projeto em https://supabase.com.
2. Abra **SQL Editor** e execute, nesta ordem, `supabase/migrations/202610220001_initial_schema.sql` e `supabase/migrations/202610230001_security_and_account.sql`.
3. Em **Project Settings → API**, copie a Project URL e a publishable key (ou anon key legada) para `.env.local`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
4. Em **Authentication → URL Configuration**, defina a URL local `http://localhost:3000` (ajuste à porta mostrada pelo Vite) e a URL de produção quando publicar.
5. Para Google, habilite o provedor em **Authentication → Sign In / Providers** e configure as credenciais OAuth e URLs de retorno. O botão só funcionará depois disso.
6. Teste criação de conta, confirmação de e-mail (se habilitada), login, saída e operações CRUD em cada tela.

O esquema ativa Row Level Security (RLS) nas tabelas de dados e limita cada operação ao usuário autenticado. Não desative essas políticas e nunca coloque `service_role` ou secret keys em variáveis `VITE_*`.

## Publicar no Vercel

1. Envie o projeto para um repositório Git privado, sem `.env`/`.env.local`.
2. Importe o repositório no Vercel.
3. Configure `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` nas Environment Variables para Preview e Production.
4. Faça o deploy e configure a URL final em Supabase Authentication → URL Configuration.
5. Confirme o login e teste a separação entre duas contas distintas.

## Estado atual / limitações

- Login por e-mail/senha conectado ao Supabase quando as variáveis estão configuradas.
- Login Google depende de configuração OAuth no painel do Supabase.
- Banco com RLS para transações, cartões, metas e orçamentos.
- A cobrança de assinatura ainda não está implementada. Antes de cobrar, será necessário integrar um provedor (ex.: Mercado Pago ou Stripe) por meio de endpoints seguros/webhooks, armazenar o estado da assinatura no servidor e restringir recursos com validação confiável no backend.
- Não há ainda painel administrativo, fluxo de exclusão/exportação de conta nem testes completos de segurança. Trate esta versão como preparação técnica, não como pronta para vender.
- Os dados existentes no `localStorage` não são migrados automaticamente para o Supabase. Planeje uma ferramenta de importação antes de mudar usuários que já tenham lançamentos locais.

## Comandos

```bash
npm run dev
npm run test
npm run lint
npm run build
```


## Perfil do usuário

A rota `/perfil` (atalho no rodapé do menu lateral e no avatar do cabeçalho mobile) reúne:

- **Usuário**: nome de usuário editável, gravado em `user_metadata.username` (o login segue sendo pelo e-mail).
- **Senha**: troca com confirmação da senha atual (contas que entram só pelo Google podem criar uma senha).
- **Backup e transferência**: exportar e importar o JSON de backup (lógica em `src/lib/backup.ts`).
- **Sessão e conta**: sair e excluir a conta (confirmação digitando EXCLUIR; usa a função `delete_my_account`).

## Animações

Transição suave entre telas, blocos que aparecem em sequência (e ao rolar, onde o navegador permite), gráficos e barras que se desenham ao carregar, cartões 3D que inclinam com o mouse (`src/lib/tilt.ts`) e luz dourada flutuando ao fundo. Tudo é desligado para quem usa "reduzir movimento" no sistema operacional.

## Tema visual

O tema segue a identidade da página principal: preto, dourado (#e0b95e), títulos em Cormorant Garamond e textos em Manrope, definidos nas variáveis CSS globais de `src/styles.css`. A mudança é visual e preserva os componentes, rotas, autenticação e integração Supabase existentes.
