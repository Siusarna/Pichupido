import * as Koa from 'koa';
import { createServer } from 'http';

export const app = new Koa();

export async function start(app, cb) {
  app.use((ctx: Koa.Context) => {
    ctx.body = 'Change test1 hello world';
  });

  const server = createServer(app.callback());
  cb(server);
  return app;
}
