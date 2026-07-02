import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://osstem.naquinesm.com/api';

  constructor(private http: HttpClient) { }

  login(data:any){
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  logout(){
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  register(data:any){
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  saveToken(token:string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(){
    return !!this.getToken();
  }

  clear(){
    localStorage.clear();
  }
}
