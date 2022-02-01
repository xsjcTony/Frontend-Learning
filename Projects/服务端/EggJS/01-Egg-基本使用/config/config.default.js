module.exports = {
  keys: 'Aelita', // cookie secret key,

  view: {
    mapping: {
      '.html': 'ejs'
    }
  },

  logger: {
    level: 'DEBUG'
  },

  /*
  middleware: ['clientCheck'],

  clientCheck: {
    userAgent: /Chrome/
  }
  */

  i18n: {
    defaultLocale: 'en-US'
  },

  sequelize: {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'demo'
  }
}
