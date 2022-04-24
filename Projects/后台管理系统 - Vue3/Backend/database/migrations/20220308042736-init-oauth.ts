/* eslint 'camelcase': 'off' */

import { QueryInterface, DataTypes } from 'sequelize'


module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const { INTEGER, STRING, DATE, BIGINT } = DataTypes
    await queryInterface.createTable('oauths', {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      access_token: {
        type: STRING,
        allowNull: false
      },
      provider: {
        type: STRING,
        allowNull: false
      },
      uid: {
        type: BIGINT.UNSIGNED,
        allowNull: false,
        unique: false
      },
      user_id: {
        type: INTEGER.UNSIGNED,
        allowNull: false,
        unique: false,
        references: {
          model: 'users',
          key: 'id'
        }
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
    await queryInterface.dropTable('oauths')
  }
}
