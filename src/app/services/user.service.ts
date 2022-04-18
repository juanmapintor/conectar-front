import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  login(user: User) {
    let loginUser: any = {
      email: user.email,
      password: user.password,
    };

    let params = JSON.stringify(loginUser);

    return firstValueFrom(
      this._http.post(GLOBAL.API_URL + 'login', params, GLOBAL.JSON_HEADERS)
    );
  }

  register(user: User) {
    let params = JSON.stringify(user);
    return firstValueFrom(
      this._http.post(GLOBAL.API_URL + 'register', params, GLOBAL.JSON_HEADERS)
    );
  }

  logout(){
    return firstValueFrom(
      this._http.get(GLOBAL.API_URL + 'logout', GLOBAL.JSON_HEADERS)
    );
  }
}
