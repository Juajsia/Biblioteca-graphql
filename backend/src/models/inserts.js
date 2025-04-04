import bcrypt from 'bcrypt'

import { User } from './user.model.js'
import { Author } from './author.model.js'
import { Book } from './book.model.js'

export const insert = async () => {
  try {
    const password = await bcrypt.hash('P@ssw0rd', 12)
    const users = [
      { userName: 'JuanPablo', password, type: 'Administrador' },
      { userName: 'JuanJose', password, type: 'Empleado' },
      { userName: 'Administrador', password, type: 'Administrador' }
    ]
    await User.bulkCreate(users)

    const authors = [
      { cedula: '123456789', fullName: 'Gabriel García Márquez', nationality: 'Colombia' },
      { cedula: '9876543210', fullName: 'Mario Vargas Llosa', nationality: 'Perú' },
      { cedula: '1023456789', fullName: 'Julio Cortázar', nationality: 'Argentina' },
      { cedula: '876543210', fullName: 'Jorge Luis Borges', nationality: 'Argentina' },
      { cedula: '11223344556', fullName: 'Isabel Allende', nationality: 'Chile' },
      { cedula: '998877665', fullName: 'Carlos Fuentes', nationality: 'México' }
    ]

    await Author.bulkCreate(authors)

    const books = [
      { ISBN: '9780307476463', title: 'Cien años de soledad', editorial: 'Sudamericana', genre: 'Realismo mágico', year: 1967, authorCedula: '123456789' },
      { ISBN: '9780307423290', title: 'El amor en los tiempos del cólera', editorial: 'Oveja Negra', genre: 'Realismo mágico', year: 1985, authorCedula: '123456789' },

      { ISBN: '9780060732805', title: 'La ciudad y los perros', editorial: 'Seix Barral', genre: 'Realismo social', year: 1963, authorCedula: '9876543210' },
      { ISBN: '9780679755268', title: 'La fiesta del Chivo', editorial: 'Alfaguara', genre: 'Novela histórica', year: 2000, authorCedula: '9876543210' },

      { ISBN: '9788432201905', title: 'Rayuela', editorial: 'Sudamericana', genre: 'Novela experimental', year: 1963, authorCedula: '1023456789' },
      { ISBN: '9788426412922', title: 'Bestiario', editorial: 'Minotauro', genre: 'Cuento fantástico', year: 1951, authorCedula: '1023456789' },

      { ISBN: '9788420633125', title: 'Ficciones', editorial: 'Sur', genre: 'Cuento', year: 1944, authorCedula: '876543210' },
      { ISBN: '9788437602103', title: 'El Aleph', editorial: 'Losada', genre: 'Cuento fantástico', year: 1949, authorCedula: '876543210' },

      { ISBN: '9788401337543', title: 'La casa de los espíritus', editorial: 'Plaza & Janés', genre: 'Realismo mágico', year: 1982, authorCedula: '11223344556' },
      { ISBN: '9780062254459', title: 'Paula', editorial: 'HarperCollins', genre: 'Autobiografía', year: 1994, authorCedula: '11223344556' },

      { ISBN: '9788432207419', title: 'La muerte de Artemio Cruz', editorial: 'Fondo de Cultura Económica', genre: 'Novela histórica', year: 1962, authorCedula: '998877665' },
      { ISBN: '9780307475932', title: 'Aura', editorial: 'Joaquín Mortiz', genre: 'Novela fantástica', year: 1962, authorCedula: '998877665' }
    ]

    await Book.bulkCreate(books)
  } catch (error) {
    console.error(error.message)
  }
}
