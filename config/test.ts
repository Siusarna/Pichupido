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
    host: 'database-2.c3cfzuvuit7d.eu-central-1.rds.amazonaws.com',
    user: 'postgres',
    database: 'postgres',
    password: '12345678',
    port: 5432,
  },
  aws: {
    bucketName: 'siusarna-test',
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET,
  }
};
