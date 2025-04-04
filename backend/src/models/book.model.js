import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Author } from './author.model.js'

export const Book = sequelize.define('Book', {
  ISBN: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  editorial: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
})

Author.hasMany(Book, { foreignKey: 'authorCedula' })
Book.belongsTo(Author, { foreignKey: 'authorCedula' })
