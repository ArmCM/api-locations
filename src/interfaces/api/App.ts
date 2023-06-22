import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import compress from 'compression';
import swaggerUi from 'swagger-ui-express';

import Router_ from './Router_';
import swaggerSpecs from './plugins/swagger/index_';
import errorMiddleware from './middleware/Error';

class App {
  public port: number;
  public host: string;
  public app: express.Application;

  private static _instance: App;
  private readonly httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 5000;
    this.host = process.env.HOST || 'localhost';

    this.httpServer = new http.Server(this.app);

    this.initMiddlewares();
    this.initRouters();

    this.errorHandling();
  }

  public static get instance(): App {
    return this._instance || (this._instance = new this());
  }

  start(callback?: () => void): void {
    if (!callback) {
      console.info(`🌎 Web Server: http://${this.host}:${this.port}\n`);
    }

    this.httpServer.listen(this.port, callback);
  }

  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    this.app.use(helmet());
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.frameguard({ action: 'deny' }));
    this.app.use(morgan('dev'));
    this.app.use(compress());
    this.app.use(
      cors({
        origin: true,
        credentials: true
      })
    );
    this.app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, { explorer: true }));
  }

  private errorHandling() {
    this.app.use(errorMiddleware);
  }

  private initRouters(): void {
    Router_().forEach(({ router }) => this.app.use('/', router));
  }
}

export default App;
