import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private myAppUrl: string
  private myApiUrl: string
  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/author'
  }
  create(author: any): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}/`, author)
  }
  update(author: any, cedula: string): Observable<any> {
    return this.http.put<any>(`${this.myAppUrl}${this.myApiUrl}/${cedula}`, author)
  }
  remove(cedula: string): Observable<any> {
    return this.http.delete<any>(`${this.myAppUrl}${this.myApiUrl}/${cedula}`)
  }
  findAll(): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/`)
  }
  findbyCedula(cedula: string): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/${cedula}`)
  }
}
