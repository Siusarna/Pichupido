module.exports = {
  server: {
    baseUrl: 'https://pichupido.herokuapp.com',
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
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  },
  aws: {
    bucketName: 'pichupido',
  }, 
  stripe: {
    secretKey: process.env.STRIPE_SECRET,
  }
};
