import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apollo: Apollo) { }

  login(user: { userName: string; password: string }): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation Login($userName: String!, $password: String!) {
          login(userName: $userName, password: $password) {
            token
            message
          }
        }
      `,
      variables: {
        userName: user.userName,
        password: user.password
      }
    }).pipe(map((result: any) => result.data.login));
  }

  create(user: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateUser($userName: String!, $password: String!, $type: String!) {
          createUser(userName: $userName, password: $password, type: $type) {
            id
            userName
            type
          }
        }
      `,
      variables: {
        userName: user.userName,
        password: user.password,
        type: user.type
      }
    }).pipe(map((result: any) => result.data.createUser));
  }

  update(user: any, id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateUser($id: ID!, $userName: String!, $password: String!, $type: String!) {
          updateUser(id: $id, userName: $userName, password: $password, type: $type) {
            id
            userName
            type
          }
        }
      `,
      variables: {
        id,
        userName: user.userName,
        password: user.password,
        type: user.type
      }
    }).pipe(map((result: any) => result.data.updateUser));
  }

  remove(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteUser($id: ID!) {
          deleteUser(id: $id)
        }
      `,
      variables: { id }
    }).pipe(map((result: any) => result.data.deleteUser));
  }

  findAll(): Observable<any> {
    return this.apollo.query({
      query: gql`
        query {
          getUsers {
            id
            userName
            type
          }
        }
      `,
      fetchPolicy: 'no-cache'
    }).pipe(map((result: any) => result.data.getUsers));
  }

  findByUserName(userName: string): Observable<any> {
    return this.apollo.query({
      query: gql`
        query GetUser($userName: String!) {
          getUser(userName: $userName) {
            id
            userName
            type
          }
        }
      `,
      variables: { userName },
      fetchPolicy: 'no-cache'
    }).pipe(map((result: any) => result.data.getUser));
  }
}
