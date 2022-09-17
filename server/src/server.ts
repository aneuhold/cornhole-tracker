import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import http, { Server as HttpServer } from 'http';
import https, { Server as HttpsServer } from 'https';
import 'module-alias/register';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from '../lib/routes';
import DocumentDb from './util/DocumentDb';

const NODE_SERVER_PORT = process.env.PORT || 3020;

/**
 * The entry point for the server
 */
async function main() {
  console.log('The server is beginning to start...');
  const app = express();
  setupSwagger(app);
  createServer(app, NODE_SERVER_PORT);
}

main();

async function shutdownServerGracefully() {
  console.log('Shutting down server gracefully...');
  DocumentDb.closeDbConnection();
}

/**
 * Creates the node server and starts listening for requests
 */
function createServer(app: Express, port: number | string, isHttps = false) {
  let server: HttpServer | HttpsServer;
  if (isHttps) {
    server = https.createServer(app);
  } else {
    server = http.createServer(app);
  }
  server.on('close', shutdownServerGracefully);
  server.listen(port, () => {
    console.log(
      `${isHttps ? 'HTTPS' : 'HTTP'} server listening on port ${port}`
    );
  });
}

/**
 * Sets up all the functionality needed for the `/docs` endpoint.
 */
function setupSwagger(app: Express) {
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());
  app.use(morgan('tiny'));
  RegisterRoutes(app);
  app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
    return res.send(
      swaggerUi.generateHTML(await import('../lib/swagger.json'))
    );
  });
}
