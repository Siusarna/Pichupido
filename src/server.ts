import { app, start } from './app';
const port = process.env.PORT || 3000;
start(app, (server) => {
  server.listen(port, () => {
    console.log('Server running on port port');
  });
});
