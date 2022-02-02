'use strict'

/** @type Egg.EggPlugin */
module.exports = {
  ajv: {
    enable: true,
    'package': 'egg-ajv'
  },

  sequelize: {
    enable: true,
    'package': 'egg-sequelize'
  },

  sessionRedis: {
    enable: true,
    'package': 'egg-session-redis'
  },

  redis: {
    enable: true,
    'package': 'egg-redis'
  }
}
