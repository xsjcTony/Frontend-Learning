export let MYSQL_SEQUELIZE_CONFIG
export let REDIS_CONFIG

if (process.env.NODE_ENV === 'development') {
  MYSQL_SEQUELIZE_CONFIG = {
    database: 'demo',
    username: 'root',
    password: '123456',
    options: {
      host: '127.0.0.1',
      dialect: 'mysql',
      port: 3306,
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000
      }
    }
  }

  REDIS_CONFIG = {
    url: 'redis://127.0.0.7:6379'
  }
} else if (process.env.NODE_ENV === 'production') {
  MYSQL_SEQUELIZE_CONFIG = {
    database: 'demo',
    username: 'root',
    password: '123456',
    options: {
      host: '127.0.0.1',
      dialect: 'mysql',
      port: 3306,
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000
      }
    }
  }

  REDIS_CONFIG = {
    url: 'redis://127.0.0.7:6379'
  }
}
