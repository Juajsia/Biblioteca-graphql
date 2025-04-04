import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private myAppUrl: string
  private myApiUrl: string
  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/user'
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}/login`, user)
  }
  create(user: any): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}/`, user)
  }
  update(user: any, id: string): Observable<any> {
    return this.http.put<any>(`${this.myAppUrl}${this.myApiUrl}/${id}`, user)
  }
  remove(id: string): Observable<any> {
    return this.http.delete<any>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }
  findAll(): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/`)
  }
  findByUserName(userName: string): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/${userName}`)
  }
}
