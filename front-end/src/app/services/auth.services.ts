import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, CanActivate } from '@angular/router';

import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';

import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3001/auth';
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLogin: boolean = false;
  userId: string;
  adminSubject = new Subject<any[]>();
  admin: User;
  userName: string;
  userEmail: string;
  userPassword: string;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  getUser(email: string, password: string) {
    this.http.get('http://localhost:3001/auth/login').subscribe(
      (admin: User[]) => {
        if (admin) {
          //this.admin = admin;
          console.log(this.admin);
          //this.emitAdmin();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onlogin(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://localhost:3001/auth/login', {
          email: email,
          password: password,
        })
        .subscribe(
          (authData) => {
            //this.userId = authData.userId;
            this.userEmail = authData[0].admin_mail;
            this.userName = authData[0].admin_login;
            this.userPassword = authData[0].admin_mdp;
            console.log(authData[0].admin_mail);
            this.isLogin = true;
            this.isUserLoggedIn$.next(true);
            resolve(authData);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
  onlogout() {
    this.isLogin = false;
    this.isUserLoggedIn$.next(false);
  }

  /*emitAdmin(): void {
    this.adminSubject.next(this.admin.slice());
  }*/

  login(email: string, password: string) {
    console.log(email);
    console.log(password);
    return new Promise((resolve, reject) => {
      this.http
        .post(this.url + '/login', { email: email, password: password })
        .subscribe(
          (reponse) => {
            this.isLogin = true;
            this.isUserLoggedIn$.next(true);
            resolve(reponse);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
}
