import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personnel } from '../models/personnel';
import { Cours } from '../models/cours';
import { Licencie } from '../models/licencie';

const baseUrl = 'http://localhost:3001/cours';

@Injectable({
  providedIn: 'root',
})
export class CoursService {
  coursSubject = new Subject<any[]>();
  persSubject = new Subject<any[]>();
  licencieSubject = new Subject<any[]>();
  cours: Cours[];
  personnel: Personnel[];
  unCour: Cours;
  licencie: Licencie[];

  constructor(private http: HttpClient) {}

  getAllCours(): void {
    this.http.get(baseUrl).subscribe(
      (cours: Cours[]) => {
        if (cours) {
          this.cours = cours;
          console.log(this.cours);
          this.emitCours();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPersonnel(id: number): void {
    this.http.get(`${baseUrl}/${id}`).subscribe(
      (personnel: Personnel[]) => {
        if (personnel) {
          this.personnel = personnel;
          console.log(this.personnel);
          this.emitPersonnel();
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this.http.get(`${baseUrl}/${id}`).subscribe((licencie: Licencie[]) => {
      if (licencie) {
        this.licencie = licencie;
        console.log(this.licencie);
        this.emitLicencie();
      }
    });
  }

  getLicencie(licencie_niv: string): void {
    this.http.get(`${baseUrl}/${licencie_niv}`).subscribe(
      (licencie: Licencie[]) => {
        if (licencie) {
          this.licencie = licencie;
          console.log(this.licencie);
          this.emitLicencie();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitCours(): void {
    this.coursSubject.next(this.cours.slice());
  }

  emitPersonnel(): void {
    this.persSubject.next(this.personnel.slice());
  }
  emitLicencie(): void {
    this.licencieSubject.next(this.licencie.slice());
  }
}
