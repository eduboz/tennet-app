import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Licencie } from '../models/licencie';

const baseUrl = 'http://localhost:3001/licencie';

@Injectable({
  providedIn: 'root',
})
export class LicencieService {
  licencieSubject = new Subject<any[]>();
  licencies: Licencie[];

  constructor(private http: HttpClient) {}

  getAllLicencies(): void {
    this.http.get(baseUrl).subscribe(
      (licencie: any[]) => {
        if (licencie) {
          this.licencies = licencie;
          console.log(this.licencies);
          this.emitLicencie();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getLicencieById(id: number) {
    this.licencies = [];
    this.http.get(`${baseUrl}/${id}`).subscribe(
      (licencie: any[]) => {
        if (licencie) {
          this.licencies = licencie;
          console.log(this.licencies);
          this.emitLicencie();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitLicencie(): void {
    this.licencieSubject.next(this.licencies.slice());
  }
}
