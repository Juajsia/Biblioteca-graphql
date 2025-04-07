import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private apollo: Apollo) { }

  create(book: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateBook($ISBN: String!, $title: String!, $editorial: String!, $genre: String!, $year: Int!, $authorCedula: String!) {
          createBook(ISBN: $ISBN, title: $title, editorial: $editorial, genre: $genre, year: $year, authorCedula: $authorCedula) {
            ISBN
            title
            editorial
            genre
            year
            author {
              cedula
              fullName
              nationality
            }
          }
        }
      `,
      variables: { ISBN: book.ISBN, title: book.title, editorial: book.editorial, genre: book.genre, year: book.year, authorCedula: book.authorCedula }
    }).pipe(map((result: any) => result.data.createBook));
  }

  update(book: any, ISBN: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateBook($ISBN: String!, $title: String, $editorial: String, $genre: String, $year: Int, $authorCedula: String) {
          updateBook(ISBN: $ISBN, title: $title, editorial: $editorial, genre: $genre, year: $year, authorCedula: $authorCedula) {
            ISBN
            title
            editorial
            genre
            year
            author {
              cedula
              fullName
              nationality
            }
          }
        }
      `,
      variables: { ISBN, title: book.title, editorial: book.editorial, genre: book.genre, year: book.year, authorCedula: book.authorCedula }
    }).pipe(map((result: any) => result.data.updateBook));
  }

  remove(ISBN: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteBook($ISBN: String!) {
          deleteBook(ISBN: $ISBN)
        }
      `,
      variables: { ISBN }
    }).pipe(map((result: any) => result.data.deleteBook));
  }

  findAll(): Observable<any> {
    return this.apollo.query({
      query: gql`
        query GetBooks {
          getBooks {
            ISBN
            title
            editorial
            genre
            year
            authorCedula
            author {
              cedula
              fullName
              nationality
            }
          }
        }
      `,
      fetchPolicy: 'no-cache'
    }).pipe(map((result: any) => result.data.getBooks));
  }

  findbyISBN(ISBN: string): Observable<any> {
    return this.apollo.query({
      query: gql`
        query GetBook($ISBN: String!) {
          getBook(ISBN: $ISBN) {
            ISBN
            title
            editorial
            genre
            year
            author {
              cedula
              fullName
              nationality
            }
          }
        }
      `,
      variables: { ISBN },
      fetchPolicy: 'no-cache'
    }).pipe(map((result: any) => result.data.getBook));
  }
}
