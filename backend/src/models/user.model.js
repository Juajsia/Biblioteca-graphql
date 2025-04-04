import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'

export const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('Administrador', 'Empleado'),
    allowNull: false
  }
}, {
  timestamps: false
})
