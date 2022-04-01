import { EggAppConfig, PowerPartial } from 'egg'


export default (): PowerPartial<EggAppConfig> => {
  const config: PowerPartial<EggAppConfig> = {}

  // sequelize
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: '123456',
    port: 3306,
    database: 'aelita',
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
    pass: 'PZOWNQMNHOQTHMCC'
  }

  return config
}
