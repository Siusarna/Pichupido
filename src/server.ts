import * as config from 'config';

import { app, start } from './app';
const port = config.get('server.port');
start(app, (server) => {
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
