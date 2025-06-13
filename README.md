# Bíblia Viva

## Descrição
Bíblia Viva é uma aplicação web projetada para oferecer aos usuários uma plataforma envolvente e de apoio para sua jornada espiritual. Ela apresenta um conselheiro cristão com inteligência artificial para orientação e uma seção dedicada a devocionais. O projeto utiliza uma stack de tecnologia moderna, incluindo Next.js, Prisma, Tailwind CSS, Google Generative AI e WebSockets para criar uma experiência interativa, em tempo real e amigável.

## Funcionalidades
- **Chat com Conselheiro Cristão IA:** Uma interface de chat inteligente que permite aos usuários conversar com uma IA treinada para fornecer aconselhamento e insights baseados nos ensinamentos cristãos.
- **Seção de Devocionais:** Uma coleção curada de devocionais para leitura diária, reflexão e crescimento espiritual.
- **Chat em Tempo Real:** Integração com WebSocket para entrega instantânea de mensagens no chat com IA.

## Tecnologias Utilizadas
- **Frontend:** React (com Next.js), TypeScript, Tailwind CSS
- **Backend:** Next.js (API Routes), Node.js
- **Banco de Dados:** PostgreSQL (ou qualquer outro banco de dados compatível com Prisma)
- **ORM:** Prisma
- **IA:** Google Generative AI (Gemini)
- **Comunicação em Tempo Real:** WebSocket (servidor customizado com a biblioteca `ws`, integrado com o servidor de desenvolvimento Next.js via `concurrently`)
- **Controle de Versão:** Git, GitHub

## Começando

### Pré-requisitos
- Node.js (v20.x ou superior recomendado)
- npm, yarn, pnpm, ou bun

### Clonando o Repositório
Substitua `<repository-url>` pela URL real do repositório.
```bash
git clone <repository-url>
cd biblia-viva
```

### Instalando Dependências
Navegue até o diretório do projeto e execute:
```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

### Configurando Variáveis de Ambiente
1. Crie um arquivo `.env` na raiz do projeto copiando o arquivo de exemplo:
   ```bash
   cp .env.example .env
   ```
2. Preencha as variáveis de ambiente essenciais no arquivo `.env`:
   - `GEMINI_API_KEY`: Sua chave de API para o Google Generative AI.
   - `DATABASE_URL`: A string de conexão para o seu banco de dados (ex.: `postgresql://user:password@host:port/database`).
   - `NEXTAUTH_URL` (Opcional, se estiver usando NextAuth para funcionalidades ainda não implementadas): A URL base da sua aplicação (ex.: `http://localhost:3000`).
   - `NEXTAUTH_SECRET` (Opcional, se estiver usando NextAuth): Uma chave secreta para o NextAuth.

### Executando Migrações do Banco de Dados
Certifique-se de que seu servidor de banco de dados está em execução e que a `DATABASE_URL` no seu arquivo `.env` está configurada corretamente. Então, aplique as migrações do banco de dados:
```bash
npx prisma migrate dev
```
Este comando configura o schema do seu banco de dados. Se o banco de dados não existir, o Prisma poderá criá-lo (dependendo do seu provedor de banco de dados e configuração).

### Iniciando os Servidores de Desenvolvimento
O comando `npm run dev` inicia tanto o servidor de desenvolvimento Next.js (tipicamente em `http://localhost:3000`) quanto o servidor WebSocket (tipicamente em `ws://localhost:3001`) concorrentemente.
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```
A aplicação principal deverá estar disponível em `http://localhost:3000`. O servidor WebSocket estará rodando na porta configurada (veja `server.js` e `package.json`).

## Estrutura do Projeto
Uma breve visão geral dos diretórios principais:
```
biblia-viva/
├── src/
│   ├── app/              # Next.js App Router: Contém páginas e rotas de API
│   │   ├── api/          # Manipuladores de rotas de API do backend
│   │   │   └── devocional/ # Rotas de API para devocionais
│   │   │       ├── hoje/
│   │   │       └── mes/
│   │   ├── (pages)/      # Diretório para componentes de página (ex: chat, devocional)
│   │   └── layout.tsx    # Layout principal da aplicação
│   ├── components/       # Componentes de UI reutilizáveis (componentes React)
│   └── lib/              # Funções auxiliares, utilitários, integrações de serviços de IA, cliente Prisma
├── prisma/               # Schema Prisma, migrações
│   └── schema.prisma     # Definição do schema do banco de dados
├── public/               # Assets estáticos (imagens, fontes)
├── server.js             # Implementação do servidor WebSocket
├── .env.example          # Arquivo de exemplo para variáveis de ambiente
├── next.config.mjs       # Configuração do Next.js
├── package.json          # Dependências e scripts do projeto (incluindo `concurrently` para o servidor de dev)
└── README.md             # Este arquivo (em Português)
```

## Endpoints de API

### Servidor WebSocket
- **URL:** `ws://localhost:3001` (ou a porta configurada em `server.js` e `package.json`)
- **Propósito:** Facilita a comunicação bidirecional em tempo real para a funcionalidade de Chat com IA. As mensagens do usuário são enviadas para o backend através desta conexão, processadas pelo Google Generative AI, e as respostas são transmitidas de volta para o cliente pela mesma conexão.
- **Configuração:** O servidor WebSocket é definido em `server.js`. Ao usar `npm run dev`, ele é iniciado automaticamente junto com o servidor Next.js graças ao `concurrently`.

### Endpoints de API HTTP (localizados em `src/app/api/`)
Estas são funções serverless usadas pela aplicação, principalmente para buscar conteúdo devocional:
- **`GET /api/devocional/hoje`**: Busca o devocional para o dia atual.
  - **Propósito:** Fornece ao cliente o "devocional do dia".
  - **Resposta:** Objeto JSON contendo o conteúdo devocional (ex.: `{ "title": "...", "text": "...", "date": "..." }`).
- **`GET /api/devocional/mes`**: Busca todos os devocionais para o mês atual.
  - **Propósito:** Permite aos clientes recuperar uma lista de devocionais para um determinado mês, talvez para uma visualização de calendário ou arquivo.
  - **Resposta:** Array JSON de objetos devocionais para o mês.

*(Consulte o diretório `src/app/api/devocional/` para as implementações específicas das rotas.)*

## Contribuindo
Contribuições são bem-vindas! Se você tem sugestões ou quer melhorar o Bíblia Viva, sinta-se à vontade para:
1. Fazer um fork do repositório.
2. Criar uma feature branch (`git checkout -b feature/sua-feature-incrivel`).
3. Fazer commit de suas mudanças (`git commit -m 'Adiciona alguma feature incrível'`).
4. Fazer push para a branch (`git push origin feature/sua-feature-incrivel`).
5. Abrir um Pull Request.

## Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` (se existir no repositório) para mais detalhes.

---
*O servidor de desenvolvimento Next.js roda em `http://localhost:3000` e o servidor WebSocket em `ws://localhost:3001` por padrão. Estes podem ser configurados em `package.json` e `server.js` respectivamente.*
```
