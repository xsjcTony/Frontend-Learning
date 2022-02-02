'use strict'

module.exports = (app) => {
  const { INTEGER, STRING, ENUM } = app.Sequelize

  const User = app.model.define('User', {
    id: {
      type: INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },

    username: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },

    password: {
      type: STRING,
      allowNull: false
    },

    gender: {
      type: ENUM('男', '女', '妖'),
      allowNull: true
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })

  return User
}
