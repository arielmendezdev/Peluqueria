module.exports = {
    PORT: process.env.PORT,
    DB: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE_DEV,
        host: process.env.HOST,
        dialect: process.env.DIALECT
    }
}