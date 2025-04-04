import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { AuthorService } from '../../services/author.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-catalogo',
  imports: [FormsModule, RouterLink, RouterModule, ReactiveFormsModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  selectedOption: string = 'libro';
  showBookForm = false
  showAuthorForm = false
  userType = localStorage.getItem('type')

  books: any = []
  authors: any = []

  constructor(private _bookService: BookService, private _authorService: AuthorService) {
    this.getbooks()
    this.getauthors()
  }

  bookForm = new FormGroup({
    ISBN: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    editorial: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    authorCedula: new FormControl('', [Validators.required])
  })

  authorForm = new FormGroup({
    cedula: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    nationality: new FormControl('', [Validators.required])
  })

  searchISBN = ''
  searchCedula = ''
  copyBooks: any = []
  copyAuthores: any = []
  searchBack = false
  search() {
    if (this.selectedOption === 'libro') {
      if (!this.validate(this.searchISBN)) {
        return
      }
      const filteredBook = this.filterBook(this.searchISBN)
      this.books = []
      if (filteredBook) {
        this.books.push(filteredBook)
        this.searchBack = true
        return
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Libro no encontrado',
          showConfirmButton: false,
          timer: 1200
        }).then(() => {
          this.books = [...this.copyBooks]
        })
      }
      return
    }

    if (!this.validate(this.searchCedula)) {
      return
    }
    const filteredAuthor = this.filterAuthor(this.searchCedula)
    this.authors = []
    if (filteredAuthor) {
      this.authors.push(filteredAuthor)
      this.searchBack = true
      return
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Autor no encontrado',
        showConfirmButton: false,
        timer: 1200
      }).then(() => {
        this.authors = [...this.copyAuthores]
      })
    }
    return
  }

  goBack() {
    this.books = [...this.copyBooks]
    this.authors = [...this.copyAuthores]
    this.searchBack = false
  }

  validate(s: string): boolean {
    if (s === '') {
      return false
    }
    return true
  }

  filterBook(ISBN: string) {
    this.books = [...this.copyBooks]
    return this.books.find((book: any) => book.ISBN === ISBN) || null;
  }

  filterAuthor(cedula: string) {
    this.authors = [...this.copyAuthores]
    return this.authors.find((author: any) => author.cedula === cedula) || null;
  }

  getbooks() {
    this._bookService.findAll().subscribe(data => {
      this.books = data
      this.copyBooks = data
    })
  }

  createBook() {
    if (!this.bookForm.valid) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, complete todos los campos',
        icon: "error",
        showConfirmButton: false,
        timer: 1200
      })
      return
    }
    this._bookService.create(this.bookForm.value).subscribe({
      next: data => {
        this.getbooks()
        this.showBookForm = false
        this.bookForm.reset()
        Swal.fire({
          title: 'Libro registrado!',
          icon: "success",
          showConfirmButton: false,
          timer: 1200
        })
      },
      error: (e: HttpErrorResponse) => {
        Swal.fire({
          title: 'Error Registrando libro!',
          text: 'Ha ocurrido un error',
          icon: "error",
          showConfirmButton: false,
          timer: 1200
        })
      }
    })
  }

  editBook = false
  ISBN = ''
  updateBook(item: any) {
    this.showBookForm = true
    this.editBook = true
    this.bookForm.setValue({
      ISBN: item.ISBN,
      title: item.title,
      editorial: item.editorial,
      genre: item.genre,
      year: item.year,
      authorCedula: item.authorCedula
    })
    this.ISBN = item.ISBN
    this.bookForm.controls['ISBN'].disable()

  }

  saveBookData() {
    if (!this.bookForm.valid) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, complete todos los campos',
        icon: "error",
        showConfirmButton: false,
        timer: 1200
      })
      return
    }
    this._bookService.update(this.bookForm.value, this.ISBN).subscribe({
      next: data => {
        this.getbooks()
        this.cancel()
        Swal.fire({
          title: 'Libro actualizado!',
          icon: "success",
          showConfirmButton: false,
          timer: 1200
        })
      },
      error: (e: HttpErrorResponse) => {
        Swal.fire({
          title: 'Error!',
          text: 'Ha ocurrido un error',
          icon: "error",
          showConfirmButton: false,
          timer: 1200
        })
      }
    })

  }

  deleteBook() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.eliminateBook()
        }
      })
  }

  eliminateBook() {
    this._bookService.remove(this.ISBN).subscribe({
      next: data => {
        this.getbooks()
        this.cancel()
        Swal.fire({
          title: 'Libro eliminado!',
          icon: "success",
          showConfirmButton: false,
          timer: 1200
        })
      },
      error: (e: HttpErrorResponse) => {
        Swal.fire({
          title: 'Error!',
          text: 'Ha ocurrido un error',
          icon: "error",
          showConfirmButton: false,
          timer: 1200
        })
      }
    })

  }

  cancel() {
    this.showBookForm = false
    this.showAuthorForm = false
    this.editBook = false
    this.editAuthor = false
    this.bookForm.controls['ISBN'].enable()
    this.bookForm.reset()
    this.authorForm.controls['cedula'].enable()
    this.authorForm.reset()
  }

  getauthors() {
    this._authorService.findAll().subscribe(data => {
      this.authors = data
      this.copyAuthores = data
    })
  }

  createAuthor() {
    if (!this.authorForm.valid) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, complete todos los campos',
        icon: "error",
        showConfirmButton: false,
        timer: 1200
      })
      return
    }
    this._authorService.create(this.authorForm.value).subscribe({
      next: data => {
        this.getauthors()
        this.showAuthorForm = false
        this.authorForm.reset()
        Swal.fire({
          title: 'Autor registrado!',
          icon: "success",
          showConfirmButton: false,
          timer: 1200
        })
      },
      error: (e: HttpErrorResponse) => {
        Swal.fire({
          title: 'Error Registrando autor!',
          text: 'Ha ocurrido un error',
          icon: "error",
          showConfirmButton: false,
          timer: 1200
        })
      }
    })
  }

  editAuthor = false
  cedula = ''
  updateAuthor(item: any) {
    this.showAuthorForm = true
    this.editAuthor = true
    this.authorForm.setValue({
      cedula: item.cedula,
      fullName: item.fullName,
      nationality: item.nationality
    })
    this.cedula = item.cedula
    this.authorForm.controls['cedula'].disable()
  }

  saveAuthorData() {
    if (this.authorForm.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, complete todos los campos',
        icon: "error",
        showConfirmButton: false,
        timer: 1200
      })
      return
    }
    const author = this.authorForm.value
    author.cedula = this.cedula
    this._authorService.update(author, this.cedula).subscribe({
      next: data => {
        this.getauthors()
        this.cancel()
        Swal.fire({
          title: 'Autor actualizado!',
          icon: "success",
          showConfirmButton: false,
          timer: 1200
        })
      },
      error: (e: HttpErrorResponse) => {
        Swal.fire({
          title: 'Error!',
          text: 'Ha ocurrido un error',
          icon: "error",
          showConfirmButton: false,
          timer: 1200
        })
      }
    })
  }

  deleteAuthor() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.eliminateAuthor()
        }
      })
  }
  eliminateAuthor() {
    this._authorService.remove(this.cedula).subscribe({
      next: data => {
        this.getauthors()
        this.getbooks()
        this.cancel()
        Swal.fire({
          title: 'Autor eliminado!',
          icon: "success",
          showConfirmButton: false,
          timer: 1200
        })
      },
      error: (e: HttpErrorResponse) => {
        console.log(e)
        Swal.fire({
          title: 'Error!',
          text: `${e.error.error}!`,
          icon: "error",
          showConfirmButton: false,
          timer: 1200
        })
      }
    })
  }

  authorsBooks: any = []
  authorName = ''
  showAuthorBook(item: any) {
    this.authorsBooks = item.Books
    this.authorName = item.fullName
  }

  logOut() {
    localStorage.clear()
  }
}
