/* eslint 'camelcase': 'off' */

import { QueryInterface, DataTypes } from 'sequelize'


module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const { INTEGER, STRING, DATE, BOOLEAN, ENUM, TINYINT } = DataTypes
    await queryInterface.createTable('privileges', {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      privilege_name: {
        type: STRING,
        allowNull: false,
        unique: true
      },
      privilege_description: {
        type: STRING,
        allowNull: false,
        unique: true
      },
      privilege_state: {
        type: BOOLEAN,
        allowNull: false,
        unique: false,
        defaultValue: true
      },
      request_method: {
        type: ENUM('get', 'post', 'put', 'delete'),
        allowNull: true,
        unique: false
      },
      privilege_url: {
        type: STRING,
        allowNull: true,
        unique: false
      },
      parent_id: {
        type: INTEGER.UNSIGNED,
        allowNull: false,
        unique: false
      },
      level: {
        type: TINYINT.UNSIGNED,
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
    await queryInterface.dropTable('privileges')
  }
}
