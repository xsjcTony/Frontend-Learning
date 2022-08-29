/* eslint 'camelcase': 'off' */

import { QueryInterface, DataTypes } from 'sequelize'


module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const { INTEGER, STRING, DATE, BOOLEAN } = DataTypes
    await queryInterface.createTable('roles', {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      role_name: {
        type: STRING,
        allowNull: false,
        unique: true
      },
      role_description: {
        type: STRING,
        allowNull: false,
        unique: true
      },
      role_state: {
        type: BOOLEAN,
        allowNull: false,
        unique: false,
        defaultValue: true
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
    await queryInterface.dropTable('roles')
  }
}
