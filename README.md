# 📦 Backend - Avontsoft

## 🚀 Tecnologias

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/)
- [Docker](https://www.docker.com/)

---

## 📁 Instalação

```bash
# Clone o repositório
git clone https://github.com/AdrielRod/avantsoft-backend.git

# Acesse a pasta
cd backend

# Instale as dependências
npm install
```

---

## 📁 Configuração do Docker
Certifique-se de ter o Docker instalado e ele esteja aberto

```bash
# Faça o upload do container

docker compose up -d
```

Caso queira usar o Pgadmin, use as credenciais que estão em docker-compose.yml

## 🛠️ Configuração do ambiente

Todas as váriaveis estão mockadas, nenhuma delas são verdadeiras e portanto, para fins do desafio técnico, elas subiram para o git. Então não há necessidade de alterar elas aqui.

---

## 🔧 Executando a aplicação

```bash
npm run start:dev
```

---

## 🧪 Testes

```bash

# Testes end-to-end - Testando todos os 3 módulos e seus endpoints
npm run test:e2e
```

---

## 🗂️ Estrutura principal

```
src/
├── modules/
│   ├── auth/
│   ├── client/
│   └── sale/
├── entities/
├── decorators/
├── guards/
└── app.module.ts
```

---

## 📮 Endpoints principais

### Auth

- `POST /auth/sign-up`
- `POST /auth/sign-in`

### Cliente

- `POST /client` - Criar cliente
- `GET /client` - Buscar clientes com filtros
- `PATCH /client/:id` - Editar nome do cliente
- `DELETE /client/:id` - Remover cliente

### Vendas

- `POST /sales` - Criar venda
- `GET /sales/per-day` - Vendas de hoje
- `GET /sales/top` - Relatório de desempenho de clientes

