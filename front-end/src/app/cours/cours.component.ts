import { Component, OnInit, OnDestroy } from '@angular/core';
import { EquipementService } from '../services/equipement.service';
import { Equipement } from '../models/equipement';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { Cours } from '../models/cours';
import { CoursService } from '../services/cours.service';
import { Personnel } from '../models/personnel';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss'],
})
export class CoursComponent implements OnInit, OnDestroy {
  private coursSub: Subscription;
  cours: Cours[];
  personnel: Personnel;
  coursubject = new Subject<any[]>();
  constructor(private courservice: CoursService) {}

  ngOnInit(): void {
    this.coursSub = this.courservice.coursSubject.subscribe((cours) => {
      this.cours = cours;
    });
    this.courservice.getAllCours();
  }

  ngOnDestroy(): void {
    this.coursSub.unsubscribe();
  }
}
