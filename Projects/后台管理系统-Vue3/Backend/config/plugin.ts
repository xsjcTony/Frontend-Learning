import { EggPlugin } from 'egg'


const plugin: EggPlugin = {

  // enable sequelize
  sequelize: {
    enable: true,
    'package': 'egg-sequelize-ts'
  },

  // enable validator
  validate: {
    enable: true,
    'package': 'egg-validate'
  },

  // enable redis
  sessionRedis: {
    enable: true,
    'package': 'egg-session-redis'
  },
  redis: {
    enable: true,
    'package': 'egg-redis'
  },

  // enable CORS
  cors: {
    enable: true,
    'package': 'egg-cors'
  }
}

export default plugin
