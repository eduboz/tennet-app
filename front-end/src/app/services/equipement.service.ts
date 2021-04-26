import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipement } from '../models/equipement';
import { isBoolean } from 'util';

const baseUrl = 'http://localhost:3001/equipement';

@Injectable({
  providedIn: 'root',
})
export class EquipementService {
  equipSubject = new Subject<any[]>();
  equipements: Equipement[];
  equipement: Equipement;
  action: boolean;

  constructor(private http: HttpClient) {}

  getAllEquip(): void {
    this.http.get(baseUrl).subscribe(
      (equipement: Equipement[]) => {
        if (equipement) {
          this.equipements = equipement;
          console.log(this.equipements);
          this.emitEquip();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getEquipById(id: number) {
    this.equipements = [];
    this.http.get(`${baseUrl}/${id}`).subscribe(
      (equipements: any[]) => {
        if (equipements) {
          this.equipements = equipements;
          console.log(this.equipements);
          this.emitEquip();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  addEquipement(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteEquipement(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  emitEquip(): void {
    this.equipSubject.next(this.equipements.slice());
  }
}
