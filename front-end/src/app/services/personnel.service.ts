import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personnel } from '../models/personnel';

const baseUrl = 'http://localhost:3001/personnel';

@Injectable({
  providedIn: 'root',
})
export class PersonnelService {
  persSubject = new Subject<any[]>();
  personnels: Personnel[];
  personnel: Personnel;

  constructor(private http: HttpClient) {}

  getAllPerso(): void {
    this.http.get(baseUrl).subscribe(
      (personnel: Personnel[]) => {
        if (personnel) {
          this.personnels = personnel;
          console.log(this.personnels);
          this.emitPersonnel();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitPersonnel(): void {
    this.persSubject.next(this.personnels.slice());
  }
}
