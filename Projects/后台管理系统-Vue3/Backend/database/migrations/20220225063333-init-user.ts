/* eslint 'camelcase': 'off' */

import { QueryInterface, DataTypes } from 'sequelize'


module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const { INTEGER, STRING, DATE } = DataTypes
    await queryInterface.createTable('users', {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: STRING,
        allowNull: true,
        unique: true
      },
      email: {
        type: STRING,
        allowNull: true,
        unique: true
      },
      password: {
        type: STRING,
        allowNull: false,
        unique: false
      },
      created_at: {
        type: DATE
      },
      updated_at: {
        type: DATE
      }
    })
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('users')
  }
}
