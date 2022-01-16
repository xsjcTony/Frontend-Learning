'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {}

  Person.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Person'
  })
  return Person
}
