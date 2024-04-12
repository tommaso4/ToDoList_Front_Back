import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { IresponseToken } from '../modules/iresponse-token';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class LogServiceService {

  registerUrl: string = 'http://localhost:8080/auth/register';
  loginUrl: string = 'http://localhost:8080/auth/login';
  jwt: JwtHelperService = new JwtHelperService();


  constructor(
    private http: HttpClient,
    private router:Router
  ) { }

  register(form: FormGroup): Observable<any> {
    return this.http.post(this.registerUrl, form)
  }

  login(form: FormGroup): Observable<IresponseToken> {
    return this.http.post<IresponseToken>(this.loginUrl, form)
      .pipe(tap((data) => {
        const token = data.response;
        localStorage.setItem('token', token)
        const username = this.jwt.decodeToken(token).username
        localStorage.setItem('username', username)
        const idUser = this.jwt.decodeToken(token).idUser
        localStorage.setItem('idUser', idUser)
      }))
  }

  isLoggedIn():boolean{
    const token = localStorage.getItem('token')
    if(token){
      return true
    }else return false;
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('idUser')
    this.router.navigate(['/log-system/log-system/log-in'])
  }
}
