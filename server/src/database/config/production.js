module.exports = {
  PORT: process.env.PORT,
  DB: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_PROD,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
};
