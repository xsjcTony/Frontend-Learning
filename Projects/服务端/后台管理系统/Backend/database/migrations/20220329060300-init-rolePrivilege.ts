/* eslint 'camelcase': 'off' */

import { QueryInterface, DataTypes } from 'sequelize'


module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const { INTEGER, DATE } = DataTypes

    await queryInterface.createTable('role_privileges', {
      role_id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
          model: 'roles',
          key: 'id'
        }
      },
      privilege_id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
          model: 'privileges',
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
    await queryInterface.dropTable('role_privileges')
  }
}
