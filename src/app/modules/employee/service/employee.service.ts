import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/auth/interface/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) {
  }

  getEmployees(): Observable<User[]> {
    return this.http.get<User[]>(environment.baseURL + `users`)
  }

  getEmployeeInState(stateId: number): Observable<User[]> {
    return this.http.get<User[]>(environment.baseURL + `users?state=${stateId}`)
  }
}
