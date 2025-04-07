import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private apollo: Apollo) { }

  create(author: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateAuthor($cedula: ID!, $fullName: String!, $nationality: String!) {
          createAuthor(cedula: $cedula, fullName: $fullName, nationality: $nationality) {
            cedula
            fullName
            nationality
            books {
              ISBN
              title
              editorial
              genre
              year
            }
          }
        }
      `,
      variables: { cedula: author.cedula, fullName: author.fullName, nationality: author.nationality }
    }).pipe(map((result: any) => result.data.createAuthor));
  }

  update(author: any, cedula: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateAuthor($cedula: ID!, $fullName: String, $nationality: String) {
          updateAuthor(cedula: $cedula, fullName: $fullName, nationality: $nationality) {
            cedula
            fullName
            nationality
            books {
              ISBN
              title
              editorial
              genre
              year
            }
          }
        }
      `,
      variables: { cedula: author.cedula, fullName: author.fullName, nationality: author.nationality }
    }).pipe(map((result: any) => result.data.updateAuthor));
  }

  remove(cedula: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteAuthor($cedula: ID!) {
          deleteAuthor(cedula: $cedula)
        }
      `,
      variables: { cedula }
    }).pipe(map((result: any) => result.data.deleteAuthor));
  }

  findAll(): Observable<any> {
    return this.apollo.query({
      query: gql`
        query GetAuthors {
          getAuthors {
            cedula
            fullName
            nationality
            books {
              ISBN
              title
              editorial
              genre
              year
            }
          }
        }
      `,
      fetchPolicy: 'no-cache'
    }).pipe(map((result: any) => result.data.getAuthors));
  }

  findbyCedula(cedula: string): Observable<any> {
    return this.apollo.query({
      query: gql`
        query GetAuthor($cedula: String!) {
          getAuthor(cedula: $cedula) {
            cedula
            fullName
            nationality
            books {
              ISBN
              title
              editorial
              genre
              year
            }
          }
        }
      `,
      variables: { cedula },
      fetchPolicy: 'no-cache'
    }).pipe(map((result: any) => result.data.getAuthor));
  }
}