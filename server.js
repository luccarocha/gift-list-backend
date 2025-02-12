const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Simplificando o caminho
const middlewares = jsonServer.defaults();

// Configuração CORS mais específica
server.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

server.use(middlewares);

// Adicione logs para debug
server.use((req, res, next) => {
  console.log('Request:', req.method, req.path);
  next();
});

// Rotas específicas
server.use('/api', router); // Adiciona prefixo /api

const port = process.env.PORT || 10000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
  console.log('Available routes:', Object.keys(router.db.__wrapped__));
});