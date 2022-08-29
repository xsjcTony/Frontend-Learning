/* eslint 'camelcase': 'off' */

import { QueryInterface, DataTypes } from 'sequelize'


module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.addColumn('users', 'github', {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      unique: false,
      defaultValue: 0 // 1 for true, 0 for false
    })
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.removeColumn('users', 'github')
  }
}
