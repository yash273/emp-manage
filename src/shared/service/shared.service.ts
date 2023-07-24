import { Injectable } from '@angular/core';
import { User } from 'src/app/core/auth/interface/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  saveUserToLocal(data: User) {
    const id = data.id
    localStorage.setItem('loggedUserId', JSON.stringify(id));
  }

  getUserFromLocal() {
    return localStorage.getItem('loggedUserId');
  }
}
