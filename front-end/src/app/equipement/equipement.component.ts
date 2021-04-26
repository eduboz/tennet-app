import { Component, OnInit, OnDestroy } from '@angular/core';
import { EquipementService } from '../services/equipement.service';
import { Equipement } from '../models/equipement';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-equipement',
  templateUrl: './equipement.component.html',
  styleUrls: ['./equipement.component.scss'],
})
export class EquipementComponent implements OnInit, OnDestroy {
  private equipementSub: Subscription;
  equipements: Equipement[];
  equipSubject = new Subject<any[]>();
  constructor(private equipService: EquipementService) {}

  ngOnInit(): void {
    this.equipementSub = this.equipService.equipSubject.subscribe(
      (equipements) => {
        this.equipements = equipements;
        console.log(this.equipements);
      }
    );
    this.equipService.getAllEquip();
  }

  ngOnDestroy(): void {
    this.equipementSub.unsubscribe();
  }
}
