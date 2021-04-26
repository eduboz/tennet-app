import { Component, OnInit, OnDestroy } from '@angular/core';
import { EquipementService } from '../services/equipement.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Equipement } from '../models/equipement';

@Component({
  selector: 'app-single-equip',
  templateUrl: './single-equip.component.html',
  styleUrls: ['./single-equip.component.scss'],
})
export class SingleEquipComponent implements OnInit, OnDestroy {
  equipements: Equipement;
  equipSub: Subscription;
  materielqte: number;
  action: boolean;

  constructor(
    private route: ActivatedRoute,
    private equipService: EquipementService
  ) {}

  ngOnInit() {
    this.equipSub = this.equipService.equipSubject.subscribe((equipement) => {
      this.equipements = equipement[0];
      this.equipements.materiel_type = equipement[0].materiel_type;
      this.equipements.materiel_quantite = equipement[0].materiel_quantite;
    });
    this.route.params.subscribe((params: Params) => {
      this.equipService.getEquipById(params.id);
    });
  }

  updateEquipement(equipement) {
    const id = this.route.snapshot.paramMap.get('id');

    const newEquipement: Equipement = {
      materiel_id: parseInt(id),
      materiel_type: equipement.materiel_type,
      materiel_quantite: equipement.materiel_quantite + 1,
    };
    this.equipService
      .update(newEquipement.materiel_id, newEquipement)
      .subscribe(
        (response) => {
          this.equipements = newEquipement;
          console.log(
            newEquipement.materiel_quantite,
            newEquipement.materiel_id
          );
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteOneEquipement(equipement) {
    const id = this.route.snapshot.paramMap.get('id');

    const newEquipement: Equipement = {
      materiel_id: parseInt(id),
      materiel_type: equipement.materiel_type,
      materiel_quantite: equipement.materiel_quantite - 1,
    };
    this.equipService
      .update(newEquipement.materiel_id, newEquipement)
      .subscribe(
        (response) => {
          this.equipements = newEquipement;
          console.log(
            newEquipement.materiel_quantite,
            newEquipement.materiel_id
          );
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnDestroy() {
    this.equipSub.unsubscribe();
  }
}
