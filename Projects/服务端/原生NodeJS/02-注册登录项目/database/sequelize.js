import { Sequelize } from 'sequelize'
import { MYSQL_SEQUELIZE_CONFIG } from '../config/database.js'


export const sequelize = new Sequelize(
  MYSQL_SEQUELIZE_CONFIG.database,
  MYSQL_SEQUELIZE_CONFIG.username,
  MYSQL_SEQUELIZE_CONFIG.password,
  MYSQL_SEQUELIZE_CONFIG.options
)
