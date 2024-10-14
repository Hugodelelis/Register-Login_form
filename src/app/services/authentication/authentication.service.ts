import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor() { }

  saveUser(user: any) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
  
    const userExists = users.some((u: any) => u.email === user.email);
  
    if(!userExists) {
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      return true
    }

    return false
  }

  getUser(email: string, password: string): boolean {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
  
    const user = users.find((u: any) => u.email === email && u.password === password);
  
    return !!user;
  }
}
