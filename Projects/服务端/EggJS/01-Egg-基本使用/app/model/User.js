module.exports = (app) => {
  const { STRING, INTEGER, TINYINT } = app.Sequelize

  const User = app.model.define('user', {
    id: {
      type: INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: STRING,
      unique: true,
      allowNull: false
    },

    age: {
      type: TINYINT.UNSIGNED,
      defaultValue: 24
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })

  return User
}
