import * as Koa from 'koa'
import { Context } from 'koa';
import { createServer } from 'http';

const app = new Koa();

app.use((ctx: Context) => {
  ctx.body = 'Hello world';
});

const server = createServer(app.callback());

server.listen(3000, () => {
  console.log(`Server running on port 3000`);
});


