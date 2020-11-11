module.exports = {
  server: {
    baseUrl: 'http://localhost:3000',
    port: process.env.PORT || 3000,
  },
  crypto: {
    iterations: 1000,
    length: 20,
  },
  salt: {
    length: 8,
  },
  tokens: {
    jwtFromRequest: 'TEST',
    accessExpiresIn: 86400000 * 1,
    refreshExpiresIn: 86400000 * 2,
    accessSecret: 'test',
    refreshSecret: 'test!',
  },
  database: {
    host: process.env.PGHOST || 'pichupido.c1gcimuwjftf.eu-north-1.rds.amazonaws.com',
    user: process.env.PGUSER || 'postgres',
    database: process.env.PGDATABASE || 'pichupido',
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT || 5432,
  },
  aws: {
    bucketName: 'pichupido',
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET,
  }
};
