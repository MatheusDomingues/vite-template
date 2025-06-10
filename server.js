import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import compression from 'compression';
import { config } from 'dotenv';
import { fileURLToPath } from "url";

// Definir __dirname manualmente para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();

// Inicializa o servidor Express
const app = express();

// Pega a porta do ambiente ou usa 8080 como padrão
const PORT = process.env.PORT || 8080;

// Pega a URL da API da variável de ambiente
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

// Usa compressão gzip para melhorar performance
app.use(compression());

// Configura o proxy para redirecionar chamadas /api para o backend
app.use('/api', createProxyMiddleware({
  target: `${API_URL}/api`,
  changeOrigin: true,
  headers: {
    client_id: API_KEY,
  },
  onError: (err, _, res) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy Error');
  },
  logLevel: 'warn'
}));

// Serve arquivos estáticos da pasta dist (onde o Vite faz o build)
app.use(express.static(path.join(__dirname, 'dist')));

// Para todas as outras rotas, serve o index.html (para SPA funcionar com roteamento do lado do cliente)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API proxy configured to: ${API_URL}`);
});