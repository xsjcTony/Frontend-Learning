/* eslint-disable camelcase */

import { DataTypes } from 'sequelize'
import type { QueryInterface } from 'sequelize'


export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const { INTEGER, STRING, DATE, TINYINT, BOOLEAN } = DataTypes

    await queryInterface.createTable('menus', {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      menu_name: {
        type: STRING,
        allowNull: false,
        unique: true
      },
      menu_description: {
        type: STRING,
        allowNull: false,
        unique: true
      },
      menu_state: {
        type: BOOLEAN,
        allowNull: false,
        unique: false,
        defaultValue: true
      },
      menu_key: {
        type: STRING,
        allowNull: false,
        unique: true
      },
      menu_icon: {
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
    await queryInterface.dropTable('menus')
  }
}
