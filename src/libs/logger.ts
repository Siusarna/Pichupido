import LokiTransport from 'winston-loki';
import { createLogger } from 'winston';

const options = {
  transports: [
    new LokiTransport({
      host: 'http://127.0.0.1:10000',
    }),
  ],
};
export default createLogger(options);