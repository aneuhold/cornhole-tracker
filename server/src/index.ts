import express, { Express } from 'express';
import http from 'http';
import https from 'https';
import 'module-alias/register';
import DocumentDb from './util/DocumentDb';

const NODE_SERVER_PORT = 3020;

async function main() {
  console.log('The server is beginning to start...');
  const app = express();
  setupExpressRoutes(app);
  createServer(app, NODE_SERVER_PORT);
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    DocumentDb.closeDbConnection();
  });

function setupExpressRoutes(app: Express) {
  app.get('/ping', async (_req, res) => {
    res.send({
      message: 'pong'
    });
  });
}

function createServer(app: Express, port: number, isHttps = false) {
  if (isHttps) {
    https.createServer(app).listen(port, () => {
      console.log(`HTTP server listening on port ${port}`);
    });
  } else {
    http.createServer(app).listen(port, () => {
      console.log(`HTTPS server listening on port ${port}`);
    });
  }
}
