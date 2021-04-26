import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Subject, Subscription } from 'rxjs';

import { AuthService } from '../services/auth.services';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  authStatus: boolean;
  loggedFailed = false;
  loading = false;
  errorMessage = '';
  userSubject = new Subject<any[]>();
  userSub: Subscription;
  admin: User;
  userEmail: string;
  userPassword: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
    this.authStatus = this.authService.isLogin;

    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.userSub = this.authService.adminSubject.subscribe((admin) => {
      this.admin = admin[0];
      this.admin.name = admin[0].name;
      this.admin.email = admin[0].email;
      this.admin.password = admin[0].password;
      this.authService.getUser(email, password);
    });
  }

  onLogin() {
    this.loading = true;
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.authService
      .onlogin(email, password)
      .then(() => {
        this.loading = false;
        this.loggedFailed = false;
        this.userEmail = email;
        this.userPassword = password;
        this.authStatus = this.authService.isLogin;
        this.router.navigate(['/accueil']);
      })
      .catch((err) => {
        this.loading = false;
        this.loggedFailed = true;
        this.errorMessage = err.error.message;
      });
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSignOut() {
    this.authService.onlogout();
    this.authStatus = this.authService.isLogin;
  }
  ngOnDestroy(): void {
    this.userSubject.unsubscribe();
  }
}
