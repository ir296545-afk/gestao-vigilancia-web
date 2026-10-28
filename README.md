# Sistema de Gestão da Vigilância Sanitária

## 1. Apresentação

O Sistema de Gestão da Vigilância Sanitária é um projeto acadêmico desenvolvido na disciplina de **Linguagens e Tecnologias para Desenvolvimento Web**, do curso de **Sistemas de Informação da UniCatólica**.

O projeto consiste em uma aplicação web destinada ao cadastro, consulta, atualização e gerenciamento de estabelecimentos sujeitos às ações da Vigilância Sanitária.

A aplicação permite organizar informações cadastrais dos estabelecimentos e seus respectivos endereços, além de disponibilizar autenticação de usuários para acesso às funcionalidades administrativas.

O sistema foi desenvolvido utilizando a stack MERN, composta por MongoDB, Express, React e Node.js.

## 2. Integrantes

- José Ivan Luz Ramos
- Pedro Rhuan de Oliveira Sales

## 3. Objetivo geral

Desenvolver uma aplicação web para gerenciamento de estabelecimentos sujeitos à Vigilância Sanitária, permitindo o armazenamento, a consulta, a atualização e a exclusão controlada de informações cadastrais.

### 3.1. Objetivos específicos

- Desenvolver uma API REST utilizando Node.js e Express.
- Implementar persistência de dados no MongoDB.
- Criar interfaces web utilizando React.
- Implementar autenticação de usuários com JWT.
- Proteger operações administrativas mediante autenticação.
- Permitir o cadastro e gerenciamento de estabelecimentos.
- Permitir o cadastro e gerenciamento de endereços.
- Relacionar os endereços aos estabelecimentos cadastrados.
- Implementar validações e regras de integridade dos dados.
- Integrar o frontend com o backend por meio de requisições HTTP.

## 4. Tecnologias utilizadas

### 4.1. Backend

- **Node.js:** ambiente de execução JavaScript no servidor.
- **Express:** framework utilizado para desenvolver a API REST.
- **Mongoose:** biblioteca responsável pela modelagem e comunicação com o MongoDB.
- **MongoDB Atlas:** serviço de banco de dados MongoDB em nuvem.
- **bcrypt:** criptografia por hash das senhas dos usuários.
- **jsonwebtoken:** geração e validação de tokens JWT.
- **dotenv:** carregamento de variáveis de ambiente.
- **cors:** configuração de acesso entre frontend e backend.

### 4.2. Frontend

- **React:** biblioteca para desenvolvimento da interface.
- **Vite:** ferramenta de desenvolvimento e compilação do frontend.
- **React Router DOM:** gerenciamento das rotas da aplicação.
- **Axios:** realização de requisições HTTP à API.
- **JavaScript:** linguagem utilizada no desenvolvimento.
- **CSS:** estilização dos componentes e páginas.
- **HTML:** estrutura da interface web.

### 4.3. Ferramentas de desenvolvimento

- Visual Studio Code.
- Git.
- GitHub.
- PowerShell.
- Navegador web.
- Node.js e npm.

## 5. Arquitetura do sistema

O sistema utiliza uma arquitetura cliente-servidor, com separação entre frontend, backend e banco de dados.

O frontend é responsável pela interface apresentada ao usuário.

O backend disponibiliza os endpoints da API, recebe as requisições, aplica validações, executa as regras de negócio e realiza operações no banco de dados.

O MongoDB armazena as informações de usuários, estabelecimentos e endereços.

O funcionamento geral segue o fluxo:

1. O usuário acessa a aplicação React.
2. O frontend apresenta a tela de login.
3. O usuário informa suas credenciais.
4. O backend valida o email e a senha.
5. Após a autenticação, o servidor retorna um token JWT.
6. O frontend armazena o token e libera o acesso à área administrativa.
7. O usuário realiza operações de cadastro, consulta, edição e exclusão.
8. O backend processa as solicitações e interage com o MongoDB.
9. O frontend apresenta os resultados das operações.

## 6. Estrutura de diretórios

A organização principal do projeto é:

```text
gestao-vigilancia-web/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── enderecoController.js
│   │   │   └── estabelecimentoController.js
│   │   │
│   │   ├── middlewares/
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── Endereco.js
│   │   │   ├── Estabelecimento.js
│   │   │   └── Usuario.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── enderecoRoutes.js
│   │   │   └── estabelecimentoRoutes.js
│   │   │
│   │   └── server.js
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   │
│   │   ├── components/
│   │   │   ├── Enderecos.jsx
│   │   │   └── Estabelecimentos.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── Login.jsx
│   │   │
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── docs/
│   └── evidencias/
│
└── README.md
```

A estrutura apresentada contém os principais arquivos de implementação e documentação, sem representar todas as dependências instaladas ou arquivos auxiliares.

## 7. Organização do backend

O backend utiliza uma estrutura organizada em modelos, controladores, rotas, middleware e configuração do banco de dados.

### 7.1. server.js

É o arquivo principal da aplicação backend.

Suas responsabilidades são:

- Carregar as variáveis de ambiente.
- Inicializar o Express.
- Configurar o CORS.
- Habilitar o processamento de requisições JSON.
- Registrar as rotas da aplicação.
- Estabelecer a conexão com o MongoDB.
- Iniciar o servidor HTTP.

A porta padrão utilizada é `3000`, podendo ser modificada pela variável de ambiente `PORT`.

### 7.2. config/database.js

Responsável pela conexão com o MongoDB utilizando Mongoose.

A conexão utiliza a variável de ambiente `MONGODB_URI` e o banco de dados denominado `gestao_vigilancia`.

O código configura o uso de IPv4 e servidores DNS específicos.

Caso a conexão com o banco de dados falhe, o sistema apresenta a mensagem de erro e encerra o processo do backend.

### 7.3. Pasta models

Contém os modelos Mongoose que definem os campos, os tipos de dados, os relacionamentos e as validações utilizadas na persistência das informações.

### 7.4. Pasta controllers

Contém as funções responsáveis por receber as requisições, executar as operações de banco de dados, aplicar as regras de negócio e retornar respostas HTTP.

### 7.5. Pasta routes

Define os endpoints da API e associa cada rota à função correspondente do controlador.

### 7.6. Pasta middlewares

Contém o middleware de autenticação utilizado para proteger determinadas operações da API.

## 8. Modelos de dados

O sistema possui três modelos principais: Usuario, Estabelecimento e Endereco.

Todos utilizam a opção `timestamps: true` do Mongoose, que registra automaticamente os campos de criação e atualização.

### 8.1. Modelo Usuario

Arquivo: `backend/src/models/Usuario.js`

Campos:

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| nome | String | Sim | Nome do usuário |
| email | String | Sim | Único, convertido para minúsculas |
| senha | String | Sim | Armazenada como hash |

O campo email possui configuração de unicidade no modelo.

As senhas são processadas com bcrypt antes de serem armazenadas pelo controlador de cadastro.

### 8.2. Modelo Estabelecimento

Arquivo: `backend/src/models/Estabelecimento.js`

Campos:

| Campo | Tipo | Obrigatório |
|---|---|---|
| data_atualizacao | Date | Não |
| categoria | String | Não |
| nome_fantasia | String | Sim |
| atividade_principal | String | Não |
| tipo_atividade | String | Não |
| tipo_documento | String | Não |
| documento | String | Não |
| razao_social | String | Não |
| cnae | String | Não |

O modelo permite registrar estabelecimentos de diferentes categorias e tipos de atividade.

O campo `tipo_documento` é apresentado na interface com as opções CPF e CNPJ.

O campo CNAE é opcional no modelo, permitindo o registro de estabelecimentos sem essa informação.

O nome fantasia é o único campo cadastral obrigatório definido nesse modelo.

### 8.3. Modelo Endereco

Arquivo: `backend/src/models/Endereco.js`

Campos:

| Campo | Tipo | Obrigatório |
|---|---|---|
| estabelecimento | ObjectId | Sim |
| logradouro | String | Sim |
| numero | String | Não |
| complemento | String | Não |
| bairro | String | Não |
| localidade | String | Não |
| cep | String | Não |

O campo `estabelecimento` utiliza uma referência ao modelo Estabelecimento.

Esse relacionamento permite que um estabelecimento possua vários endereços cadastrados.

O campo logradouro é obrigatório.

## 9. Funcionalidades implementadas

### 9.1. Cadastro de usuários

A API permite cadastrar usuários informando:

- Nome.
- Email.
- Senha.

O backend verifica o preenchimento dos campos obrigatórios e consulta se o email já está cadastrado.

A senha é transformada em hash utilizando bcrypt, com fator de custo 10.

A resposta de cadastro bem-sucedido não inclui a senha.

O cadastro de usuários está disponível por endpoint da API. Não foi identificada uma tela específica de cadastro de usuários no frontend analisado.

### 9.2. Login

O usuário informa email e senha na tela de autenticação.

O backend consulta o usuário cadastrado e compara a senha informada com o hash armazenado.

Quando as credenciais são válidas, é gerado um token JWT.

O token possui validade de **1 dia**.

### 9.3. Gerenciamento de sessão

O frontend utiliza `AuthContext.jsx` para controlar o estado de autenticação.

O token é armazenado no `localStorage` do navegador.

Ao carregar a aplicação, o sistema verifica a sessão por meio do endpoint `/auth/perfil`.

O serviço Axios adiciona o token às requisições realizadas por `api.js`.

Quando uma requisição feita por esse serviço retorna HTTP `401`, a aplicação limpa a sessão.

### 9.4. Proteção de rotas

O componente `ProtectedRoute.jsx` verifica se o usuário está autenticado.

Usuários sem autenticação são redirecionados para a página `/login`.

A página de estabelecimentos é protegida no frontend.

No backend, as operações de criação, atualização e exclusão de estabelecimentos e endereços exigem autenticação.

As rotas de consulta e listagem desses recursos não possuem middleware de autenticação na implementação atual.

### 9.5. Cadastro de estabelecimentos

A aplicação permite cadastrar estabelecimentos informando dados como:

- Nome fantasia.
- Razão social.
- Categoria.
- Atividade principal.
- Tipo de atividade.
- Tipo de documento.
- Número do documento.
- CNAE.

Após o cadastro bem-sucedido, o estabelecimento é incluído na listagem apresentada ao usuário.

### 9.6. Listagem de estabelecimentos

Os estabelecimentos cadastrados são apresentados em uma tabela.

A interface exibe as colunas:

- Nome fantasia.
- Razão social.
- Documento.
- Categoria.
- CNAE.
- Ações.

Cada registro possui opções para edição, gerenciamento de endereços e exclusão.

### 9.7. Edição de estabelecimentos

Ao selecionar a opção Editar, os dados do estabelecimento são carregados no formulário.

O usuário pode modificar as informações e salvar as alterações.

O backend utiliza a operação de atualização do Mongoose com validação dos campos.

### 9.8. Exclusão de estabelecimentos

A interface solicita confirmação antes da exclusão.

O backend verifica se o estabelecimento possui endereços vinculados.

Quando existem endereços associados, a exclusão é bloqueada e a API retorna HTTP `409`.

Nesse caso, o usuário precisa excluir os endereços vinculados antes de excluir o estabelecimento.

Essa regra evita a remoção de um estabelecimento que ainda possui registros de endereço associados.

### 9.9. Cadastro de endereços

A interface permite cadastrar endereços associados a um estabelecimento previamente selecionado.

Os dados disponíveis são:

- Logradouro.
- Número.
- Complemento.
- Bairro.
- Localidade.
- CEP.

O backend verifica se o identificador do estabelecimento é válido e se o estabelecimento existe.

### 9.10. Listagem de endereços

Na tabela de estabelecimentos, o usuário pode selecionar a opção Endereços.

A aplicação abre o componente `Enderecos.jsx`, apresentando os endereços associados ao estabelecimento selecionado.

A consulta utiliza um filtro pelo identificador do estabelecimento.

### 9.11. Edição de endereços

A aplicação permite selecionar um endereço cadastrado, carregar suas informações no formulário e salvar as alterações.

O backend valida o identificador do endereço e, quando informado, verifica o estabelecimento relacionado.

### 9.12. Exclusão de endereços

O usuário pode excluir um endereço após confirmar a operação.

A exclusão é realizada pelo identificador do registro.

Após a resposta bem-sucedida, o endereço é retirado da listagem exibida na interface.

### 9.13. Logout

O sistema apresenta a opção Sair na tela de estabelecimentos.

O logout remove o token armazenado e limpa o usuário autenticado no contexto React.

Com isso, o usuário deixa de ter acesso às rotas protegidas até realizar uma nova autenticação.

## 10. Endpoints da API

A API disponibiliza 13 endpoints de autenticação, estabelecimentos e endereços, além da rota inicial de verificação.

Endereço base em ambiente local:

`http://localhost:3000`

### 10.1. Autenticação

| Método | Endpoint | Descrição | JWT obrigatório |
|---|---|---|---|
| POST | `/auth/cadastro` | Cadastrar usuário | Não |
| POST | `/auth/login` | Autenticar usuário | Não |
| GET | `/auth/perfil` | Consultar dados da sessão autenticada | Sim |

Exemplo de cadastro:

```json
{
  "nome": "Usuario Exemplo",
  "email": "usuario@exemplo.com",
  "senha": "senha_de_exemplo"
}
```

Exemplo de login:

```json
{
  "email": "usuario@exemplo.com",
  "senha": "senha_de_exemplo"
}
```

O login bem-sucedido retorna uma mensagem, um token JWT e dados básicos do usuário.

A consulta de perfil exige um token válido.

### 10.2. Estabelecimentos

| Método | Endpoint | Descrição | JWT obrigatório |
|---|---|---|---|
| POST | `/api/estabelecimentos` | Cadastrar estabelecimento | Sim |
| GET | `/api/estabelecimentos` | Listar estabelecimentos | Não |
| GET | `/api/estabelecimentos/:id` | Buscar estabelecimento por ID | Não |
| PUT | `/api/estabelecimentos/:id` | Atualizar estabelecimento | Sim |
| DELETE | `/api/estabelecimentos/:id` | Excluir estabelecimento | Sim |

Exemplo de cadastro:

```json
{
  "nome_fantasia": "Mercantil Exemplo",
  "razao_social": "Mercantil Exemplo LTDA",
  "categoria": "Comercio de alimentos",
  "atividade_principal": "Comercio varejista",
  "tipo_atividade": "Mercantil",
  "tipo_documento": "CNPJ",
  "documento": "00000000000000",
  "cnae": "4712-1/00"
}
```

O exemplo apresenta a estrutura dos campos e não representa um estabelecimento real.

Para consultar, atualizar ou excluir um estabelecimento específico, o parâmetro `:id` deve ser substituído pelo identificador do registro no MongoDB.

### 10.3. Endereços

| Método | Endpoint | Descrição | JWT obrigatório |
|---|---|---|---|
| POST | `/api/enderecos` | Cadastrar endereço | Sim |
| GET | `/api/enderecos` | Listar endereços | Não |
| GET | `/api/enderecos/:id` | Buscar endereço por ID | Não |
| PUT | `/api/enderecos/:id` | Atualizar endereço | Sim |
| DELETE | `/api/enderecos/:id` | Excluir endereço | Sim |

Exemplo de cadastro:

```json
{
  "estabelecimento": "ID_VALIDO_DO_ESTABELECIMENTO",
  "logradouro": "Rua Exemplo",
  "numero": "100",
  "complemento": "",
  "bairro": "Centro",
  "localidade": "Sede",
  "cep": "00000000"
}
```

O campo `estabelecimento` deve receber um ObjectId válido correspondente a um estabelecimento existente.

### 10.4. Consulta de endereços por estabelecimento

A API permite filtrar os endereços por estabelecimento:

```http
GET /api/enderecos?estabelecimento=ID_DO_ESTABELECIMENTO
```

A consulta utiliza o método `populate()` do Mongoose para incluir os campos `nome_fantasia` e `razao_social` do estabelecimento relacionado.

### 10.5. Rota inicial

```http
GET /
```

Resposta:

```text
API da Vigilância Sanitária funcionando
```

Essa rota permite verificar se a API está acessível.

## 11. Principais códigos de resposta HTTP

A aplicação utiliza os seguintes códigos de resposta:

| Código | Significado | Exemplo de utilização |
|---|---|---|
| 200 | Operação bem-sucedida | Consultas, atualizações e exclusões |
| 201 | Recurso criado | Cadastro de usuário, estabelecimento ou endereço |
| 400 | Requisição inválida | Campos obrigatórios ausentes ou identificadores inválidos |
| 401 | Não autorizado | Credenciais inválidas ou falha de autenticação |
| 404 | Não encontrado | Estabelecimento ou endereço inexistente |
| 409 | Conflito | Tentativa de excluir estabelecimento com endereços vinculados |
| 500 | Erro interno | Falhas internas no processamento da requisição |

Os códigos efetivamente retornados dependem da rota e da condição encontrada.

## 12. Segurança e autenticação

A implementação inclui mecanismos de autenticação e controle de acesso.

Entre eles:

- Armazenamento de senhas como hashes bcrypt.
- Geração de tokens JWT.
- Validação de autenticação nas rotas protegidas.
- Envio do token no cabeçalho Authorization.
- Verificação de sessão ao carregar o frontend.
- Limpeza da sessão quando o serviço centralizado recebe HTTP `401`.
- Redirecionamento de usuários não autenticados para a tela de login.

O cabeçalho utilizado nas requisições autenticadas possui o formato:

```http
Authorization: Bearer SEU_TOKEN_JWT
```

O token possui validade de 1 dia.

A aplicação utiliza `JWT_SECRET` como variável de ambiente para assinatura do token.

O projeto representa uma implementação acadêmica. Para utilização em produção, seriam necessárias avaliações adicionais de segurança, controle de acesso, configuração de CORS, proteção de credenciais e implantação.

## 13. Regras de negócio e validações

As principais regras identificadas no código são:

1. O cadastro de usuário exige nome, email e senha.
2. O backend verifica se o email já está cadastrado.
3. A senha do usuário é armazenada como hash.
4. O login exige email e senha válidos.
5. O nome fantasia é obrigatório para estabelecimentos.
6. O logradouro é obrigatório para endereços.
7. Todo endereço deve estar associado a um estabelecimento.
8. O identificador do estabelecimento deve ser válido.
9. O estabelecimento relacionado ao endereço deve existir.
10. A atualização utiliza validações definidas nos modelos Mongoose.
11. A exclusão de estabelecimento é bloqueada quando existem endereços vinculados.
12. As operações de criação, edição e exclusão exigem autenticação nas rotas correspondentes.
13. A interface solicita confirmação antes de realizar exclusões.

## 14. Organização do frontend

### 14.1. App.jsx

Define as rotas principais da aplicação.

Rotas disponíveis:

- `/login`: tela de autenticação.
- `/estabelecimentos`: tela administrativa protegida.

Rotas não reconhecidas são redirecionadas para `/estabelecimentos`, onde a proteção de autenticação é aplicada.

### 14.2. main.jsx

Inicializa o React e configura:

- StrictMode.
- BrowserRouter.
- AuthProvider.
- Componente principal App.

### 14.3. Login.jsx

Implementa a tela de autenticação.

Possui campos de email e senha, botão Entrar, mensagens de erro e indicador de processamento.

Após autenticação bem-sucedida, o usuário é direcionado para a página de estabelecimentos.

### 14.4. AuthContext.jsx

Gerencia o estado de autenticação.

Suas responsabilidades incluem:

- Realizar login.
- Armazenar token.
- Consultar o perfil autenticado.
- Controlar o estado do usuário.
- Realizar logout.
- Limpar a sessão quando necessário.

### 14.5. ProtectedRoute.jsx

Protege as rotas administrativas.

Usuários não autenticados são redirecionados para a página de login.

### 14.6. services/api.js

Configura uma instância do Axios com endereço base:

`http://localhost:3000`

Também possui interceptadores responsáveis por adicionar o token JWT às requisições e tratar respostas HTTP `401`.

### 14.7. Estabelecimentos.jsx

Implementa a interface de gerenciamento de estabelecimentos.

Permite:

- Cadastrar estabelecimentos.
- Consultar registros.
- Editar dados.
- Excluir estabelecimentos.
- Visualizar mensagens de sucesso e erro.
- Acessar o gerenciamento de endereços.
- Visualizar o usuário autenticado.
- Realizar logout.

### 14.8. Enderecos.jsx

Implementa o gerenciamento de endereços vinculados aos estabelecimentos.

Permite:

- Cadastrar endereços.
- Listar endereços por estabelecimento.
- Editar informações.
- Excluir registros.
- Confirmar exclusões.
- Apresentar mensagens de sucesso e erro.

O componente é exibido dentro da tela de estabelecimentos, não sendo necessária uma rota independente na implementação atual.

As requisições desse componente utilizam Axios diretamente, com envio manual do token nas operações protegidas.

## 15. Requisitos para execução

Para executar o sistema localmente, é necessário possuir:

- Node.js instalado.
- npm disponível.
- Git, caso o projeto seja obtido pelo repositório.
- Acesso à internet para conexão com o MongoDB Atlas.
- Credenciais de conexão válidas.
- Um navegador web atualizado.

O computador deve conseguir acessar o cluster MongoDB configurado para o projeto.

O endereço IP utilizado também deve estar autorizado nas configurações de acesso à rede do MongoDB Atlas.

## 16. Instalação e inicialização do sistema

### 16.1. Obter o projeto

O repositório está disponível em:

https://github.com/ir296545-afk/gestao-vigilancia-web

Para clonar:

```bash
git clone https://github.com/ir296545-afk/gestao-vigilancia-web.git
```

Acesse a pasta:

```bash
cd gestao-vigilancia-web
```

### 16.2. Instalar dependências do backend

No terminal:

```bash
cd backend
npm install
```

### 16.3. Configurar variáveis de ambiente

O backend utiliza um arquivo `.env`, que deve ser configurado localmente.

Exemplo de variáveis necessárias:

```env
PORT=3000
MONGODB_URI=STRING_DE_CONEXAO_DO_MONGODB
JWT_SECRET=SEGREDO_SEGURO_PARA_ASSINATURA_JWT
```

Os valores apresentados são apenas exemplos e devem ser substituídos por configurações válidas.

**Não publique senhas, tokens, strings de conexão com credenciais ou o arquivo `.env` no GitHub.**

### 16.4. Iniciar o backend

Dentro da pasta `backend`, execute:

```bash
npm start
```

O comando executa:

```bash
node src/server.js
```

Quando a conexão estiver funcionando, o terminal deverá apresentar mensagens semelhantes a:

```text
MongoDB conectado com sucesso
Servidor rodando na porta 3000
```

A API estará disponível em:

http://localhost:3000

### 16.5. Instalar dependências do frontend

Abra um segundo terminal.

Na pasta `frontend`, execute:

```bash
npm install
```

### 16.6. Iniciar o frontend

Execute:

```bash
npm run dev
```

O Vite disponibilizará um endereço local, normalmente:

http://localhost:5173

O frontend deve ser executado enquanto o backend estiver ativo.

### 16.7. Acessar o sistema

Abra o navegador e acesse:

http://localhost:5173

O usuário será direcionado à tela de login.

Informe as credenciais de um usuário cadastrado.

Após autenticação, a aplicação apresenta a área de gerenciamento de estabelecimentos.

### 16.8. Inicialização no computador utilizado no desenvolvimento

No PowerShell, para iniciar o backend:

```powershell
cd C:\Projetos\gestao-vigilancia-web\backend
npm start
```

Em outro terminal, para iniciar o frontend:

```powershell
cd C:\Projetos\gestao-vigilancia-web\frontend
npm run dev
```

Mantenha os dois terminais abertos durante a utilização do sistema.

### 16.9. Encerrar a execução

Para encerrar os servidores locais, utilize `Ctrl+C` nos terminais em que estão sendo executados.

## 17. Comandos disponíveis

### Backend

| Comando | Finalidade |
|---|---|
| `npm install` | Instalar dependências |
| `npm start` | Iniciar a API |

O script `npm test` ainda não possui uma suíte de testes automatizados configurada.

### Frontend

| Comando | Finalidade |
|---|---|
| `npm install` | Instalar dependências |
| `npm run dev` | Iniciar o servidor de desenvolvimento |
| `npm run build` | Gerar a versão compilada |
| `npm run lint` | Executar a análise estática configurada |
| `npm run preview` | Visualizar localmente a compilação |

## 18. Testes e verificações realizados

Durante o desenvolvimento, foram realizados testes manuais de integração e funcionamento.

As verificações relatadas e realizadas no projeto incluem:

- Inicialização do backend Node.js.
- Conexão com o MongoDB Atlas.
- Acesso à rota inicial da API.
- Inicialização do frontend com Vite.
- Carregamento da tela de login.
- Autenticação com usuário cadastrado.
- Acesso à área administrativa.
- Cadastro e listagem de estabelecimentos.
- Edição de informações cadastrais.
- Exclusão de estabelecimentos.
- Cadastro e gerenciamento de endereços vinculados.
- Verificação da proteção de acesso sem autenticação.
- Verificação da integração entre frontend e backend.

Também foi verificada no código a regra de bloqueio da exclusão de estabelecimentos com endereços vinculados.

### 18.1. Verificação da API

Com o backend em execução, foi utilizado o PowerShell para consultar a rota inicial:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/" -Method Get
```

Resposta obtida:

```text
API da Vigilância Sanitária funcionando
```

### 18.2. Verificação do MongoDB

Durante a inicialização do backend, foi obtida a mensagem:

```text
MongoDB conectado com sucesso
```

### 18.3. Verificação do frontend

O Vite iniciou corretamente e disponibilizou a aplicação em:

`http://localhost:5173/`

A tela de login foi visualizada no navegador.

### 18.4. Limitações dos testes

O backend ainda não possui uma suíte automatizada de testes configurada no `package.json`.

As verificações descritas correspondem principalmente a testes manuais e inspeção dos códigos implementados.

## 19. Divisão de atividades da equipe

O projeto foi desenvolvido em dupla, com divisão de responsabilidades e integração dos trabalhos.

### José Ivan Luz Ramos

Atividades desenvolvidas:

- Organização inicial da estrutura do projeto.
- Desenvolvimento da base do backend.
- Implementação do modelo Estabelecimento.
- Implementação do modelo Endereco.
- Desenvolvimento dos controladores e rotas relacionados.
- Implementação das operações CRUD de estabelecimentos.
- Implementação das operações CRUD de endereços.
- Desenvolvimento das interfaces de gerenciamento.
- Integração entre estabelecimentos e endereços.
- Realização de testes funcionais.
- Revisão e organização da documentação.

### Pedro Rhuan de Oliveira Sales

Atividades desenvolvidas:

- Implementação da autenticação de usuários.
- Desenvolvimento do modelo Usuario.
- Implementação do cadastro e login no backend.
- Utilização de bcrypt para proteção das senhas.
- Implementação da geração de tokens JWT.
- Desenvolvimento do middleware de autenticação.
- Implementação da tela de login.
- Implementação do contexto de autenticação.
- Implementação da proteção de rotas no frontend.
- Integração da autenticação com a aplicação.

As funcionalidades desenvolvidas pelos integrantes foram integradas no repositório do projeto.

## 20. Versionamento e colaboração

O desenvolvimento utiliza Git para controle de versões e GitHub para armazenamento e colaboração.

Repositório:

https://github.com/ir296545-afk/gestao-vigilancia-web

O trabalho envolveu desenvolvimento de funcionalidades, integração de alterações e atualização da branch principal.

Comandos úteis:

```bash
git status
git add .
git commit -m "Descricao da alteracao"
git push origin main
```

O comando `git status` permite verificar as alterações locais e a situação da branch.

O comando `git push origin main` envia os commits locais da branch principal ao repositório remoto, quando o usuário possui permissão.

## 21. Limitações e possibilidades de evolução

O projeto contempla o gerenciamento cadastral de estabelecimentos e endereços, além da autenticação de usuários.

Entre as possibilidades de evolução estão:

- Implementar solicitação eletrônica de inspeção sanitária.
- Desenvolver gerenciamento de vistorias.
- Registrar relatórios de inspeção.
- Implementar acompanhamento de solicitações.
- Criar controle de emissão de alvarás sanitários.
- Implementar diferentes níveis de permissão de usuários.
- Adicionar pesquisa e filtros avançados.
- Implementar paginação de registros.
- Criar testes automatizados.
- Melhorar a configuração de implantação e segurança.
- Padronizar a comunicação HTTP de todos os componentes pelo serviço centralizado da API.

Essas funcionalidades são possibilidades futuras e não fazem parte das entregas confirmadas na implementação atual.

## 22. Considerações finais

O desenvolvimento do Sistema de Gestão da Vigilância Sanitária possibilitou aplicar conhecimentos de programação web, modelagem de dados, desenvolvimento de APIs REST, autenticação e integração entre frontend e backend.

A utilização da stack MERN permitiu construir uma aplicação com separação de responsabilidades, persistência em banco de dados e interface para gerenciamento de informações.

O projeto implementa operações cadastrais de estabelecimentos e endereços, com autenticação de usuários e regras de integridade para os relacionamentos.

Além da aplicação prática dos conteúdos da disciplina, o sistema apresenta possibilidades de evolução para atender a outras necessidades administrativas relacionadas à Vigilância Sanitária.

O projeto possui finalidade acadêmica e representa uma base funcional para desenvolvimento e aperfeiçoamento futuro.