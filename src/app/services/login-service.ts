import { Injectable } from '@angular/core';

import { User } from '../interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: User): boolean {
    if(JSON.stringify(user) == JSON.stringify({username:"DEV_TEAM_01", password:"654321@01"})){
      console.log('setting user', user);
      this.userSubject.next(user);
      this.loggedIn.next(true);
      return true;
    }
    else {
      console.log('Login failed');
      return false;
    }
  }

  clearUser() {
    this.userSubject.next(null);
    this.loggedIn.next(false);
  }

  getCurrentUser(): User | null {
    const currentUser = this.userSubject.getValue();
    console.log('getting user', currentUser);
    console.log('is logged in', this.loggedIn.getValue());

    return currentUser;
  }
}
