import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'

export const Author = sequelize.define('Author', {
  cedula: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
})
