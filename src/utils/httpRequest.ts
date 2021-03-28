import http from 'http';
import https from 'https';
import { URL } from 'url';

export const request: (
  url: string,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
  postData?: unknown,
) => Promise<http.IncomingMessage & { data: unknown}> = async (
  url,
  method = 'GET',
  postData,
) => {
  const lib = url.startsWith('https://') ? https : http;

  const [h, path] = url.split('://')[1].split('/');
  const [host, port] = h.split(':');

  const params = {
    method,
    host,
    port: port || url.startsWith('https://') ? 443 : 80,
    path: path || '/',
  };

  return new Promise((resolve, reject) => {
    const req = lib.request(params, (res: http.IncomingMessage) => {
      const data: Uint8Array[] = [];

      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', () => {
        resolve(Object.assign(res, { data: Buffer.concat(data).toString() }));
      });
    });

    req.on('error', reject);

    if (postData) {
      req.write(postData);
    }

    // IMPORTANT
    req.end();
  });
};

export const validationUrl: (url: string) => boolean = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};
