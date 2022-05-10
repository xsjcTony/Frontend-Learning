import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'


export default (appInfo: EggAppInfo): PowerPartial<EggAppConfig> => {
  const config: PowerPartial<EggAppConfig> = {}

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = `${ appInfo.name }_Aelita`

  config.serverTimeout = 10000

  // add your egg config in here
  config.middleware = []

  // CORS
  config.cors = {
    origin: 'http://127.0.0.1:3000',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true
  }

  // file
  config.multipart = {
    mode: 'file',
    fileExtensions: ['.xlsx']
  }

  // add your special config in here
  const bizConfig = {}

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  }
}
