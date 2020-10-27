import { Pool, PoolConfig, QueryConfig, QueryResult } from 'pg';
import config from 'config';
import { escapeArray } from './escaping';
const databaseConf: PoolConfig = config.get('database');

const pool = new Pool(databaseConf);
const query = (text: string | QueryConfig, params?: Array<unknown>): Promise<QueryResult> => (
  pool.query(text, params && escapeArray(params))
);

export { query };
