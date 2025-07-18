# 🤖 Creative Food Bot

> Um chatbot interativo e inteligente que ajuda você a descobrir novas receitas com base nos ingredientes que você tem em mãos.

O Creative Food Bot oferece uma interface de chat fluida onde os usuários podem listar ingredientes e receber sugestões de receitas. É possível visualizar detalhes completos, salvar receitas favoritas e gerenciar tudo em uma interface moderna, responsiva e animada.

## ✨ Features

- **Busca de Receitas por Ingredientes**: O usuário seleciona ou digita os ingredientes disponíveis e o bot busca receitas correspondentes.
- **Interface de Chat Interativa**: As interações acontecem em uma janela de chat, com mensagens do usuário e respostas do bot.
- **Visualização Detalhada de Receitas**: Um modal exibe a receita completa, com imagem, lista de ingredientes com medidas e instruções passo a passo.
- **Sistema de Favoritos**: Usuários podem marcar receitas como favoritas e acessá-las facilmente em um painel lateral.
- **Design Responsivo (Mobile-First)**: A interface é totalmente adaptada para uma experiência de uso perfeita tanto em desktops quanto em dispositivos móveis.
- **Animações Fluidas**: A experiência do usuário é enriquecida com animações e transições suaves, construídas com Framer Motion.
- **Feedback de Carregamento**: Skeletons de carregamento são exibidos enquanto o bot processa as informações, melhorando a percepção de performance.

## 🛠️ Tech Stack

- **Framework**: React
- **Build Tool**: Vite
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Animações**: Framer Motion
- **Ícones**: Lucide React

## 📄 Fonte dos Dados

Este projeto utiliza a API gratuita do **[TheMealDB](https://www.themealdb.com/api.php)**, uma base de dados aberta e colaborativa de receitas de todo o mundo.

A URL da API (`https://www.themealdb.com/`) está configurada diretamente nos arquivos de serviço (dentro de `/src/services/api.ts`), conforme a necessidade do projeto.

## 🚀 Como Começar

Siga estas instruções para configurar e rodar o projeto em seu ambiente local.

### 📋 Pré-requisitos

- **Node.js**: Versão 18.x ou superior.
- **Package Manager**: npm, yarn, ou pnpm.

### 📦 Instalação

1.  **Clone o repositório:**
    ```sh
    git clone https://github.com/Paulo-VieiraDev/creative-food.git
    ```

2.  **Navegue até o diretório do projeto:**
    ```sh
    cd creative-food 
    ```

3.  **Instale as dependências:**
    ```sh
    npm install
    ```
    *(ou `yarn install`, `pnpm install`)*

## ▶️ Rodando a Aplicação

### Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento com hot-reloading:
```sh
npm run dev
