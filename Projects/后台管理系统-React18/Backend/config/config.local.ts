import type { EggAppConfig, PowerPartial } from 'egg'


export default (): PowerPartial<EggAppConfig> => {
  const config: PowerPartial<EggAppConfig> = {}

  // sequelize
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: '123456',
    port: 3306,
    database: 'backstage-management-system-react18',
    timezone: '+11:00'
  }

  // temporarily disable CSRF
  config.security = {
    csrf: {
      enable: false
    }
  }

  // redis
  config.redis = {
    client: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: 0
    }
  }

  // nodemailer smtp.126.com
  config.smtp = {
    host: 'smtp.126.com',
    port: 465,
    user: 'xsjcTony@126.com',
    pass: 'WAYJJHTOHRIXSZXG'
  }

  // CORS
  config.cors = {
    origin: 'http://127.0.0.1:3000',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true
  }

  config.serverUrl = 'http://127.0.0.1:7001'

  return config
}
