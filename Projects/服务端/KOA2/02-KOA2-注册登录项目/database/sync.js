import { sequelize } from './sequelize.js'
import './sequelizeModel/User.js'

try {
  await sequelize.authenticate()
  await sequelize.sync()
} catch (err) {
  console.error(err)
}
