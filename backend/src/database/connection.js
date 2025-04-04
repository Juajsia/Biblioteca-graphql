import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('biblioteca', 'biblioteca', '1234', {
  host: 'localhost',
  dialect: 'postgres'
})
