import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.services';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  email: string;
  password: string;
  message: string;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLogin;

    if (this.isLoggedIn) {
      this.message = 'Bienvenue';
    }
  }

  ngOnDestroy() {}
}
