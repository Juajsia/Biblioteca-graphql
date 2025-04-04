import { sequelize } from './database/connection.js'
import './models/author.model.js'
import './models/book.model.js'
import './models/user.model.js'

import { insert } from './models/inserts.js'

try {
  await sequelize.sync({ force: true })
  await insert()
  console.log('Database synchronized')
} catch (error) {
  console.error('Error synchronizing the database', error)
}
