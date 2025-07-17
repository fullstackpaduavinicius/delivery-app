// server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração do CORS para permitir conexão com o frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
}));
app.use(bodyParser.json());

// Lista de produtos (simulando um banco de dados)
let products = [];

// Rota para buscar produtos
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Rota para atualizar produtos
app.post('/api/products', (req, res) => {
  products = req.body;
  
  // Envia atualização em tempo real via WebSocket
  broadcast({ type: 'PRODUCTS_UPDATED', data: products });
  
  res.json({ success: true, products });
});

// Configuração do WebSocket
const wss = new WebSocket.Server({ port: 3002 });

function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

wss.on('connection', (ws) => {
  console.log('Novo cliente conectado via WebSocket');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});