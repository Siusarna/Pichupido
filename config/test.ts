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
    host: process.env.PGHOST || 'database-2.c3cfzuvuit7d.eu-central-1.rds.amazonaws.com',
    user: process.env.PGUSER || 'postgres',
    database: process.env.PGDATABASE || 'postgres',
    password: process.env.PGPASSWORD || '12345678',
    port: process.env.PGPORT || 5432,
  },
  aws: {
    bucketName: 'siusarna-test',
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET,
  }
};
