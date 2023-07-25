import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/core/auth/interface/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private http: HttpClient
  ) { }

  saveUserToLocal(data: User) {
    const id = data.id
    localStorage.setItem('loggedUserId', JSON.stringify(id));
  }

  getUserFromLocal() {
    return localStorage.getItem('loggedUserId');
  }

  removeLoggedUser() {
    return localStorage.removeItem('loggedUserId')
  }

  getCounties() {
    return this.http.get(environment.baseURL + `countries`)
  }

  getStates(countryId: number) {
    return this.http.get(environment.baseURL + `states?countryId=${countryId}`)
  }

  getCities(stateId: number) {
    return this.http.get(environment.baseURL + `cities?stateId=${stateId}`)
  }

}
