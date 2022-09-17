import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import http from 'http';
import https from 'https';
import 'module-alias/register';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from '../lib/routes';
import DocumentDb from './util/DocumentDb';

const NODE_SERVER_PORT = process.env.PORT || 3020;

async function main() {
  console.log('The server is beginning to start...');
  const app = express();
  setupSwagger(app);
  createServer(app, NODE_SERVER_PORT);
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    DocumentDb.closeDbConnection();
  });

function createServer(app: Express, port: number | string, isHttps = false) {
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
