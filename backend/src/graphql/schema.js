import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Author {
    cedula: ID!
    fullName: String!
    nationality: String!
    books: [Book]
  }

  type Book {
    ISBN: ID!
    title: String!
    editorial: String!
    genre: String!
    year: Int!
    authorCedula: String!
    author: Author
  }

  type User {
    id: ID!
    userName: String!
    type: String!
  }

  type AuthPayload {
    token: String!
    message: String!
  }

  type Query {
    getUsers: [User]
    getUser(userName: String!): User

    getBooks: [Book]
    getBook(ISBN: String!): Book

    getAuthors: [Author]
    getAuthor(cedula: ID!): Author
  }

  type Mutation {
    createUser(userName: String!, password: String!, type: String!): User
    updateUser(id: ID!, userName: String!, password: String!, type: String!): User
    deleteUser(id: ID!): String
    login(userName: String!, password: String!): AuthPayload

    createBook(ISBN: String!, title: String!, editorial: String!, genre: String!, year: Int!, authorCedula: String!): Book
    updateBook(ISBN: String!, title: String, editorial: String, genre: String, year: Int, authorCedula: String): Book
    deleteBook(ISBN: String!): String

    createAuthor(cedula: ID!, fullName: String!, nationality: String!): Author
    updateAuthor(cedula: ID!, fullName: String, nationality: String): Author
    deleteAuthor(cedula: ID!): String
  }
`
