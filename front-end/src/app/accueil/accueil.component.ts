import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent implements OnInit {
  userName: string;
  userPassword: string;
  userEmail: string;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userName = this.authService.userName;
    this.userEmail = this.authService.userEmail;
    this.userPassword = '*****';
  }
}
