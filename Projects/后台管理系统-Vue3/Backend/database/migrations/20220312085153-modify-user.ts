/* eslint 'camelcase': 'off' */

import { QueryInterface, DataTypes } from 'sequelize'


module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.addColumn('users', 'user_state', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      unique: false,
      defaultValue: true
    })

    await queryInterface.addColumn('users', 'avatar_url', {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
      defaultValue: '/public/assets/images/avatars/avatar.jpg'
    })

    await queryInterface.changeColumn('users', 'github', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      unique: false,
      defaultValue: false
    })
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.removeColumn('users', 'user_state')
    await queryInterface.removeColumn('users', 'avatar_url')
    await queryInterface.changeColumn('users', 'github', {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      unique: false,
      defaultValue: 0 // 1 for true, 0 for false
    })
  }
}
