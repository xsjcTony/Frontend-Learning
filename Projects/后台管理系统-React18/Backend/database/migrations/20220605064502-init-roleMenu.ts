/* eslint-disable camelcase */

import { DataTypes } from 'sequelize'
import type { QueryInterface } from 'sequelize'


export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const { INTEGER, DATE } = DataTypes

    await queryInterface.createTable('role_menus', {
      role_id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
          model: 'roles',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      menu_id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
          model: 'menus',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
    await queryInterface.dropTable('role_menus')
  }
}
