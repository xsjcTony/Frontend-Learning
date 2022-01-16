'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {}
  Book.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book'
  })
  return Book
}
