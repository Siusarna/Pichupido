import * as Koa from 'koa';
import * as Router from 'koa-joi-router';
import * as config from 'config';
import * as bodyParser from 'koa-body';
import * as httpLogger from 'koa-logger';
import * as cors from '@koa/cors';
import * as helmet from 'koa-helmet';
import { SwaggerAPI } from 'koa-joi-router-docs';
import { koaSwagger } from 'koa2-swagger-ui';
import { createServer } from 'http';

import accountsRouter from './accounts/accounts.routers';

// const databaseConf: any = config.get('database');

import koaPassport from './libs/passport/koaPassport';
import errorCatcherMiddleware from './middlewares/errorCatcher';

/*
 * Using copy of database configuration from config
 * because pg driver will trying to change the read-only 'type' property
 */
export const app = new Koa();
export async function start(app, cb) {
  try {
   // await createConnection({ ...databaseConf });
  } catch (error) {
    console.log(`Database connection error: ${error}`);
  }
  const server = createServer(app.callback());

  const router = Router();
  const generator = new SwaggerAPI();

  generator.addJoiRouter(accountsRouter);

  const spec = generator.generateSpec({
    info: {
      title: 'Pichupido API',
      description: 'API for creating and editing examples.',
      version: '0.0.1',
    },
    basePath: '/',
    tags: [
      {
        name: 'accounts',
        description: 'Group of API methods for managing user accounts',
      },
    ],
  }, {
    defaultResponses: {},
  });

  router.get('/api.json', async (ctx) => {
    ctx.body = JSON.stringify(spec, null, '  ');
  });
  app.use(httpLogger());
  app.use(koaPassport.initialize());
  app.use(errorCatcherMiddleware);
  app.use(cors({
    credentials: true,
  }));
  app.use(bodyParser({
    multipart: true,
    includeUnparsed: true,
  }));
  app.use(helmet());

  app.use(
    koaSwagger({
      routePrefix: '/docs',
      hideTopbar: true,
      swaggerOptions: {
        url: `${config.get('server.baseUrl')}/api.json`,
      },
    }),
  );

  router.get('/', async (ctx) => {
    ctx.body = 'It works!';
  });
  router.use(accountsRouter.middleware());

  app.use(router.middleware());

  cb(server);
  return app;
}
