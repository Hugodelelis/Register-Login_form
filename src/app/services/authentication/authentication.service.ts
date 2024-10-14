import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor() { }

  saveUser(user: any) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));
  }

  getUser() {
    
  }
}
