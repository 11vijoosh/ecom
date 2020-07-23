import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId:any =null;
  private _registerUrl = "/user/register";
  private _loginUrl = "/user/login"
  constructor(private http: HttpClient) { }


  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
