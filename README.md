# 🚀 Projeto Frontend de Gestão de Produtos

Este é um projeto de frontend desenvolvido em **React (Vite)**, focado na gestão de produtos através de operações **CRUD (Criar, Ler, Atualizar, Deletar)**. Ele se conecta a uma API pública para gerenciar os dados dos produtos, oferecendo uma interface de usuário moderna e intuitiva.

## ✨ Destaques e Funcionalidades

O sistema permite:

-   **Visualização de Produtos:** Uma lista clara e organizada de todos os produtos cadastrados.
-   **Cadastro Simplificado:** Adicione novos produtos com facilidade através de um formulário intuitivo.
-   **Edição Rápida:** Modifique informações de produtos existentes de forma eficiente.
-   **Exclusão Segura:** Remova produtos do sistema com confirmação para evitar perdas acidentais.

### 🎨 Melhorias Visuais e de Experiência do Usuário

Este projeto foi recentemente aprimorado com um novo design, focando em modernidade e usabilidade:

-   **Esquema de Cores Vibrante:**
    -   **Primária:** `#2563eb` (Azul moderno e profissional)
    -   **Secundária:** `#7c3aed` (Roxo vibrante para elementos de destaque)
    -   **Destaque:** `#06b6d4` (Ciano para acentuar informações)
    -   **Fundo:** Gradientes suaves e tons neutros (`#f8fafc`, `#ffffff`) para um visual limpo.

-   **Layout Reorganizado:**
    -   **Barra de Navegação (NavBar):** Design elegante com gradiente, efeitos de *glassmorphism* e animações sutis.
    -   **Listagem de Produtos:** Adaptação responsiva com *cards* otimizados para dispositivos móveis e uma tabela robusta para desktops.
    -   **Formulários:** Campos de entrada aprimorados com ícones, bordas arredondadas e efeitos visuais ao interagir.
    -   **Botões:** Estilizados com gradientes, sombras e animações de elevação para uma experiência de clique mais agradável.
    -   **Tipografia:** Utilização da fonte *Inter* para uma hierarquia visual clara e legibilidade aprimorada.

-   **Experiência do Usuário (UX) Aprimorada:**
    -   Transições e animações suaves em todo o site.
    -   Design totalmente responsivo, garantindo ótima visualização em qualquer dispositivo.
    -   Feedback visual claro para estados de carregamento, foco e interação.

## 🛠️ Tecnologias Utilizadas

-   **Frontend:**
    -   [React](https://react.dev/) (Biblioteca JavaScript para construção de interfaces de usuário)
    -   [Vite](https://vitejs.dev/) (Ferramenta de *build* rápida para projetos web)
    -   [Material-UI (MUI)](https://mui.com/) (Biblioteca de componentes React para um design elegante)
    -   [React Router DOM](https://reactrouter.com/) (Para gerenciamento de rotas na aplicação)
    -   [Axios](https://axios-http.com/) (Cliente HTTP para comunicação com a API)

-   **API de Backend:**
    -   A aplicação consome a API pública disponível em: `http://leoproti.com.br:8004/produtos`

### Estrutura de Dados do Produto

O formato esperado para os dados de produto é:

```json
{
  "id": 0,        // Identificador único do produto
  "nome": "string", // Nome do produto
  "preco": 0      // Preço do produto
}
```

## 🚀 Como Iniciar o Projeto

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente local:

1.  **Clone o Repositório** (se aplicável, ou descompacte o arquivo do projeto).

2.  **Instale as Dependências:**
    Navegue até a pasta raiz do projeto no terminal e execute:
    ```bash
    npm install
    ```
    *Se houver problemas com dependências, consulte a seção de solução de problemas abaixo.*

3.  **Inicie o Servidor de Desenvolvimento:**
    Após a instalação, execute o comando:
    ```bash
    npm run dev
    ```

4.  **Acesse a Aplicação:**
    Abra seu navegador e navegue para: `http://localhost:5173`

## 📂 Estrutura do Projeto

O projeto segue uma estrutura modular para facilitar a manutenção e escalabilidade:

-   `src/pages`: Contém os componentes principais que representam as diferentes páginas da aplicação (e.g., Lista de Produtos, Formulário de Cadastro/Edição).
-   `src/components`: Armazena componentes React reutilizáveis que são utilizados em diversas partes da aplicação (e.g., formulários genéricos, barra de navegação).
-   `src/services`: Responsável pela lógica de comunicação com a API de backend, utilizando Axios para as requisições HTTP.
-   `src/routes`: Define as rotas da aplicação, mapeando URLs para os componentes de página correspondentes.

## 🗺️ Rotas da Aplicação

-   `/`: Exibe a lista completa de produtos.
-   `/novo`: Apresenta o formulário para adicionar um novo produto.
-   `/editar/:id`: Carrega o formulário para editar um produto específico, identificado pelo seu `id`.

## 📡 Exemplos de Requisições à API

Para referência, aqui estão exemplos de como a aplicação interage com a API de produtos:

```javascript
// GET: Obter todos os produtos
axios.get("http://leoproti.com.br:8004/produtos")

// POST: Criar um novo produto
axios.post("http://leoproti.com.br:8004/produtos", { nome: "Novo Produto Exemplo", preco: 99.99 })

// PUT: Atualizar um produto existente (substitui o produto com o ID especificado)
axios.put("http://leoproti.com.br:8004/produtos/123", { nome: "Produto Atualizado", preco: 150.00 })

// DELETE: Remover um produto
axios.delete("http://leoproti.com.br:8004/produtos/456")
```

## 💡 Solução de Problemas Comuns

Se você encontrar erros relacionados a dependências ou importações, tente as seguintes soluções:

-   **Erro de dependência não encontrada (ex: `Failed to resolve import 'react-router-dom'`):**
    Isso geralmente significa que a biblioteca não foi instalada corretamente. Instale-a manualmente:
    ```bash
    npm install [nome-da-biblioteca]
    ```
    Exemplos:
    -   Para `react-router-dom`: `npm install react-router-dom`
    -   Para Material-UI: `npm install @mui/material @mui/icons-material @emotion/react @emotion/styled`
    -   Para Axios: `npm install axios`

-   **Após instalar novas dependências, reinicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

---

