<h1 align="center">
  <a href="https://github.com/Excalibur757/docker-mf">
    Tech Challenge - Fase 02: Gerenciador Financeiro Incrementado
  </a>
</h1>

A proposta é desenvolver um pacote de melhorias do gerenciador financeiro do projeto passado. Incorporando melhorias de pesquisa, gráficos, paginação, validação e upload, utilizando **Next.js**, **Microfrontends** e **Docker**.

<br />

## 📖 Índice

* 🎯 Sobre o Projeto
* ✨ Requisitos
* 🛠️ Tecnologias Utilizadas
* 🚀 Executando o Projeto
* 🎥 Vídeo

<br />

## 🎯 Sobre o Projeto

Focado na construção de uma interface funcional para um app financeiro. Usamos de inspiração o [Figma](https://www.figma.com/design/ns5TC3X5Xr8V7I3LYKg9KA/Projeto-Financeiro?node-id=80-199&p=f&t=Y821nsQ9qA67Fg4v-0) para produzir este projeto. O back-end foi fornecido pela própria FIAP e alguns dados foram mockados diretamente no front-end.

<br />

## ✨ Features (Requisitos)

O projeto segue os seguintes requisitos:

- **Home Page:**
  * Gráficos.
  * Análises financeiras.
  * Seção adicionar uma nova transação.
 
 - **Listagem de Transações:**
   - Um container que exibe as últimas transações realizadas.

- **Gerenciamento de Transações:**
  * Permite **editar** e **deletar** cada transação.

- **Adicionar Nova Transação:**
    - Um container para adicionar novas transações.
  * Formulário com campos para tipo de transação, valor, descrição e upload de documento.
  * Possui também validação e sugestões automáticas.
    
- **Editar Transação:**
  * Um modal para editar os dados de uma transação existente.

<br />

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias obrigatórias e ferramentas:

* [**Next.js**](https://nextjs.org/)**:** Framework React usado para estruturar e organizar o projeto.
* [**React**](https://reactjs.org/)**:** Biblioteca principal para a construção da interface.
* **CSS Modules:** Usado para estilos específicos de páginas ou componentes.
* **Styled-Components:** Usado para criar componentes de UI reutilizáveis e "tokenizados", que formam o núcleo do nosso sistema.
* **Docker:** Utilizado para 
* **Cloud:** Utilizado para rodar sua aplicação na web.
* **Microfrontends:** Usado para separar as páginas de um site e torná-las independentes, permitindo atualização e desenvolvimento isolado.
* **Bootstrap:** Utilizado para agilizar o desenvolvimento do layout macro e para classes utilitárias.

<br />

## 🚀 Executando o Projeto

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 18.x ou superior)
* [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)
* [docker](https://www.docker.com/products/docker-desktop/)

### Instalação

1.  Clone o repositório:

    ```bash
    git clone https://github.com/Excalibur757/docker-mf.git
    ```
2.  Navegue até o diretório do projeto:

    ```bash
    cd docker-mf
    ```

### Executando a aplicação

1.  Inicie o docker pela primeira vez:

    ```bash
    docker-compose up --build
    ```
2. Abra [http://localhost:3001](http://localhost:3001) em seu navegador para ver a aplicação.
3. Caso você já tenha executado este projeto pela primeira vez, use:
    ```bash
    docker-compose up
    ```
<br />

### Credenciais de login

* Para ter o acesso, use as seguintes credenciais:

  1. Email:
    ```bash
    aluno@teste.com
    ```
  2. Senha:
    ```bash
    123456
    ```

## 🎥 Vídeo

Gravamos um vídeo para demonstrar todo o fluxo e as melhorias solicitadas.

➡️ [Assista ao vídeo](https://www.youtube.com/watch?v=7yawItuhJDM)

<br />

***

Feito por **Kevin Santos (RM369050) e Pedro Moura (RM367447).**