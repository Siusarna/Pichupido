module.exports = {
  server: {
    baseUrl: 'http://localhost:3000',
    port: process.env.PORT || 3000,
  },
  tokens: {
    jwtFromRequest: 'TEST',
    accessExpiresIn: 86400000 * 1,
    refreshExpiresIn: 86400000 * 2,
    accessSecret: 'test',
    refreshSecret: 'test!',
  },
};
