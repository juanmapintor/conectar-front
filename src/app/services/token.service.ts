import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {User} from "../models/user";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  
  private loginSync = new Subject<boolean>();
  private loginObservableSync = this.loginSync.asObservable();

  constructor() { }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token.split('|')[1]);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): User {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return <User>(JSON.parse(user));
    } else {
      throw new Error('No hay ningun usuario activo en el momento');
    }
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public emitLogin(){
    this.loginSync.next(true);
  }

  public loginObservable(){
    return this.loginObservableSync;
  }

}