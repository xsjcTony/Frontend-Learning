import { sequelize } from '../sequelize.js'
import { DataTypes } from 'sequelize'


const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('男', '女', '妖'),
    allowNull: true
  }
}, {
  freezeTableName: true,
  timestamps: false
})


export default User
