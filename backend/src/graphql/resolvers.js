import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

import { Author } from '../models/author.model.js'
import { Book } from '../models/book.model.js'

export const resolvers = {
  Query: {
    getUsers: async () => await User.findAll({ attributes: { exclude: ['password'] } }),
    getUser: async (_, { userName }) => {
      const user = await User.findOne({ where: { userName }, attributes: { exclude: ['password'] } })
      if (!user) throw new Error('User not found')
      return user
    },

    getBooks: async () => {
      return await Book.findAll({
        include: { model: Author, attributes: ['cedula', 'fullName', 'nationality'] }
      })
    },
    getBook: async (_, { ISBN }) => {
      const book = await Book.findOne({
        where: { ISBN },
        include: { model: Author, attributes: ['cedula', 'fullName', 'nationality'] }
      })
      if (!book) throw new Error('Book not found')
      return book
    },

    getAuthors: async () => {
      return await Author.findAll({
        include: {
          model: Book,
          attributes: ['ISBN', 'title', 'editorial', 'genre', 'year']
        }
      })
    },
    getAuthor: async (_, { cedula }) => {
      const author = await Author.findOne({
        where: { cedula },
        include: {
          model: Book,
          attributes: ['ISBN', 'title', 'editorial', 'genre', 'year']
        }
      })
      if (!author) throw new Error('Author not found')
      return author
    }
  },

  Mutation: {

    createUser: async (_, { userName, password, type }) => {
      const cryptedPassword = await bcrypt.hash(password, 12)
      return await User.create({ userName, password: cryptedPassword, type })
    },
    updateUser: async (_, { id, userName, password, type }) => {
      const user = await User.findByPk(id)
      if (!user) throw new Error('User not found')
      user.password = await bcrypt.hash(password, 12)
      user.userName = userName
      user.type = type
      await user.save()
      return user
    },
    deleteUser: async (_, { id }) => {
      const user = await User.findByPk(id)
      if (!user) throw new Error('User not found')
      await User.destroy({ where: { id } })
      return 'User deleted successfully'
    },
    login: async (_, { userName, password }) => {
      const user = await User.findOne({ where: { userName } })
      if (!user) throw new Error('User not found')
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) throw new Error('Incorrect password')
      const token = jwt.sign({ userName: user.userName, type: user.type }, 'mi_llave_secreta_super_segura')
      return { token, message: 'Login Successfully' }
    },

    createBook: async (_, { ISBN, title, editorial, genre, year, authorCedula }) => {
      return await Book.create({ ISBN, title, editorial, genre, year, authorCedula })
    },

    updateBook: async (_, { ISBN, ...data }) => {
      const book = await Book.findOne({ where: { ISBN } })
      if (!book) throw new Error('Book not found')
      await book.update(data)
      return book
    },

    deleteBook: async (_, { ISBN }) => {
      const book = await Book.findOne({ where: { ISBN } })
      if (!book) throw new Error('Book not found')
      await book.destroy()
      return 'Book deleted'
    },

    createAuthor: async (_, { cedula, fullName, nationality }) => {
      return await Author.create({ cedula, fullName, nationality })
    },

    updateAuthor: async (_, { cedula, fullName, nationality }) => {
      const author = await Author.findOne({ where: { cedula } })
      if (!author) throw new Error('Author not found')
      if (fullName) author.fullName = fullName
      if (nationality) author.nationality = nationality
      await author.save()
      return author
    },

    deleteAuthor: async (_, { cedula }) => {
      const author = await Author.findOne({
        where: { cedula },
        include: { model: Book, attributes: ['ISBN'] }
      })
      if (!author) throw new Error('Author not found')
      if (author.Books.length > 0) throw new Error('El Autor tiene libros registrados')
      await author.destroy()
      return 'Author deleted'
    }

  },

  Book: {
    author: async (book) => {
      return await Author.findByPk(book.authorCedula)
    }
  },

  Author: {
    books: async (author) => {
      return await Book.findAll({
        where: { authorCedula: author.cedula },
        attributes: ['ISBN', 'title', 'editorial', 'genre', 'year']
      })
    }
  }
}
