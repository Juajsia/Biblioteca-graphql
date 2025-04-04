import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private myAppUrl: string
  private myApiUrl: string
  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/book'
  }
  create(book: any): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}/`, book)
  }
  update(book: any, ISBN: string): Observable<any> {
    return this.http.put<any>(`${this.myAppUrl}${this.myApiUrl}/${ISBN}`, book)
  }
  remove(ISBN: string): Observable<any> {
    return this.http.delete<any>(`${this.myAppUrl}${this.myApiUrl}/${ISBN}`)
  }
  findAll(): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/`)
  }
  findbyISBN(ISBN: string): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/${ISBN}`)
  }
}
