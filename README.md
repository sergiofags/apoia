# 💸 Apoia

Uma plataforma construída com **Next.js**, **React.js**, **TypeScript**, **AuthJS**, **Prisma ORM**, **PostgreSQL**, **React Query** e **Stripe** para facilitar doações para criadores de conteúdo.

## 📌 Visão Geral

Este sistema permite que criadores de conteúdo criem perfis personalizados para receber doações de apoiadores. Doadores podem contribuir com valores fixos e deixar mensagens de apoio. A plataforma oferece autenticação social, integração com Stripe e um painel para visualizar o apoio recebido.

## 🚀 Funcionalidades

### 👥 Autenticação
- Cadastro e login via sistema interno
- Login via **Google** ou **GitHub** com **AuthJS**

### 🧑‍💼 Dashboard do Usuário
- Visualização do número total de apoiadores
- Total de valor recebido em doações
- Lista de mensagens recebidas

### 📝 Perfil Público
- Nome do criador
- Biografia personalizada
- Link único para doações (ex: `/creator/nome_do_criador`)

### 💰 Doações
- Doações nos valores de: R$5, R$10, R$20, R$50, R$100 e R$200
- Doadores podem deixar:
  - Nome
  - Mensagem personalizada
  - Valor escolhido
- Redirecionamento para o **Stripe Checkout**
- Mensagem e valor aparecem automaticamente na dashboard do criador após confirmação de pagamento

## 🛠️ Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)** – Framework React fullstack
- **[React.js](https://reactjs.org/)** – Interface do usuário
- **[TypeScript](https://www.typescriptlang.org/)** – Tipagem estática
- **[AuthJS](https://authjs.dev/)** – Autenticação com provedores OAuth
- **[Prisma ORM](https://www.prisma.io/)** – ORM para banco de dados PostgreSQL
- **[PostgreSQL](https://www.postgresql.org/)** – Banco de dados relacional
- **[React Query](https://tanstack.com/query/latest)** – Gerenciamento de dados assíncronos
- **[Stripe](https://stripe.com/)** – Processamento de pagamentos

## 📸 Screenshots
<img src="https://media.licdn.com/dms/image/v2/D4D2DAQF7BWvY-hVMGA/profile-treasury-image-shrink_800_800/B4DZdIEsP.HkAc-/0/1749260879540?e=1750078800&v=beta&t=wbg8L7E8RT_nPcEle9BRaxqxog_tSz6gmYEre3lth1k" width="500px" />

