import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.services';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AuthGuard } from './services/auth-guard.services';
import { AccueilComponent } from './accueil/accueil.component';
import { EquipementComponent } from './equipement/equipement.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { LicencieComponent } from './licencie/licencie.component';
import { LicencieService } from './services/licencie.service';
import { SingleEquipComponent } from './single-equip/single-equip.component';
import { EquipementService } from './services/equipement.service';
import { CoursComponent } from './cours/cours.component';
import { CoursInfoComponent } from './cours-info/cours-info.component';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonnelService } from './services/personnel.service';
import { CoursService } from './services/cours.service';

const appRoutes: Routes = [
  {
    path: 'accueil',
    component: AccueilComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'equipement',
    component: EquipementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'personnel',
    component: PersonnelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'licencie',
    component: LicencieComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'equipement/:id',
    component: SingleEquipComponent,
    canActivate: [AuthGuard],
  },
  { path: 'cours', component: CoursComponent, canActivate: [AuthGuard] },
  {
    path: 'cours/:id',
    component: CoursInfoComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  declarations: [
    AppComponent,
    EquipementComponent,
    PersonnelComponent,
    LicencieComponent,
    SingleEquipComponent,
    CoursComponent,
    CoursInfoComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    LicencieService,
    EquipementService,
    PersonnelService,
    CoursService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
