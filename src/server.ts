import config from 'config';

import { app, start } from './app';
import logger from './libs/logger';
const port = config.get('server.port');
start(app, (server) => {
  server.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });
});
