# 📚 Sistema de Gerenciamento de Livraria

Repositório dedicado à criação de um sistema de gerenciamento para uma Livraria, utilizando **Node.JS** para o Back-end e **React.JS** para o Front-end. Este projeto foi desenvolvido como parte da disciplina de Desenvolvimento Web 1.

O sistema permite o cadastro, visualização, edição e exclusão de livros, além de funcionalidades extras para melhorar a experiência do usuário.

## ✨ Features Principais

O sistema conta com diversas funcionalidades pensadas para uma gestão eficiente e uma experiência de usuário agradável.

### 📖 Sistema Principal - Gerenciamento de Livros

O coração do sistema é o gerenciamento do acervo da livraria. A interface principal permite:

- **Visualizar** todos os livros cadastrados em formato de cartões.
- **Adicionar** novos livros ao acervo através de um formulário.
- **Editar** informações de livros já existentes.
- **Excluir** livros do sistema.

### ⭐ Feature de Favoritos

Para facilitar o acesso rápido aos livros de maior interesse, foi implementado um sistema de favoritos.

- Cada livro possui um ícone de coração que permite ao usuário marcá-lo ou desmarcá-lo como favorito.
- A preferência do usuário é salva, mantendo o estado de "favoritado" mesmo após recarregar a página.

### 🖼️ Feature de Upload de Imagens

Uma boa apresentação visual é crucial. Por isso, o sistema permite o upload de imagens para as capas dos livros.

- Ao cadastrar ou editar um livro, o usuário pode selecionar um arquivo de imagem do seu computador.
- O **Back-end** processa e armazena essa imagem, associando-a ao livro correspondente.

### 🎨 Feature de Tema Claro/Escuro (Light/Dark Mode)

Pensando no conforto visual do usuário, a aplicação conta com um seletor de tema.

- Um botão na interface permite alternar instantaneamente entre o tema claro e o tema escuro.
- A escolha do tema é salva localmente no navegador, garantindo que a preferência do usuário seja mantida em visitas futuras.

## 🛠️ Ferramentas e Tecnologias (Backend)

O Back-end foi construído em **Node.js** e é responsável por toda a lógica de negócio, comunicação com o banco de dados e por servir a API para o Front-end. As principais ferramentas utilizadas foram:

- **Express.js**: Framework para a criação do servidor e das rotas da API REST.
- **CORS**: Middleware para permitir que o Front-end (em um domínio diferente) acesse os recursos do Back-end.
- **Multer**: Middleware para lidar com o upload de arquivos (`multipart/form-data`), utilizado na funcionalidade de upload de capas dos livros.
- **Nodemon**: Ferramenta de desenvolvimento que reinicia o servidor automaticamente a cada alteração no código, agilizando o processo de desenvolvimento.

---

*Este projeto demonstra a integração entre um cliente rico (React) e um servidor robusto (Node.js) para criar uma aplicação web completa e funcional.*
