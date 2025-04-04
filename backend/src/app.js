import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './graphql/schema.js'
import { resolvers } from './graphql/resolvers.js'

import { sequelize } from './database/connection.js'

const app = express()
app.use(cors())
app.use(express.json())

const server = new ApolloServer({ typeDefs, resolvers })

await server.start()
server.applyMiddleware({ app })

try {
  await sequelize.authenticate()
  console.log('Connection has been established successfully')
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}${server.graphqlPath}`)
  })
} catch (error) {
  console.error('Error connecting to the database', error)
}
