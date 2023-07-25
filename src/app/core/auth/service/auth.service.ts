import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Route, User } from '../interface/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(data: User): Observable<User> {
    return this.http.post<User>(environment.baseURL + `users`, data)
  }

  allUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.baseURL + `users`)
  }

  getUserData(userId: number): Observable<User> {
    return this.http.get<User>(environment.baseURL + `users/${userId}`)
  }

  getRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>(environment.baseURL + `routes`)
  }
}
