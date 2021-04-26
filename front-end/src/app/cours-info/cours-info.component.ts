import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CoursService } from '../services/cours.service';
import { Cours } from '../models/cours';
import { Personnel } from '../models/personnel';
import { PersonnelService } from '../services/personnel.service';
import { Licencie } from '../models/licencie';

@Component({
  selector: 'app-single-equip',
  templateUrl: './cours-info.component.html',
  styleUrls: ['./cours-info.component.scss'],
})
export class CoursInfoComponent implements OnInit, OnDestroy {
  cours: Cours;
  personnels: Personnel;
  personnelSub: Subscription;
  coursSub: Subscription;
  information;
  licencieSub: Subscription;
  licencies: Licencie[];

  constructor(
    private route: ActivatedRoute,
    private coursService: CoursService,
    private persoService: PersonnelService
  ) {}

  ngOnInit() {
    this.personnelSub = this.coursService.persSubject.subscribe((personnel) => {
      this.personnels = personnel[0];
      this.personnels.personnel_nom = personnel[0].personnel_nom;
      this.personnels.personnel_prenom = personnel[0].personnel_prenom;
    });

    this.licencieSub = this.coursService.licencieSubject.subscribe(
      (licencie) => {
        this.licencies = licencie;
        console.log(this.licencies);
      }
    );
    this.route.params.subscribe((params: Params) => {
      this.coursService.getPersonnel(params.id);
    });
  }
  ngOnDestroy() {
    this.personnelSub.unsubscribe();
  }
}
