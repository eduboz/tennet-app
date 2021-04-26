import { Component, OnInit, OnDestroy } from '@angular/core';
import { LicencieService } from '../services/licencie.service';
import { Licencie } from '../models/licencie';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { Personnel } from '../models/personnel';
import { PersonnelService } from '../services/personnel.service';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss'],
})
export class PersonnelComponent implements OnInit, OnDestroy {
  private personnelSub: Subscription;
  personnels: Personnel[];
  personnelSubject = new Subject<any[]>();

  constructor(private personnelService: PersonnelService) {}

  ngOnInit(): void {
    this.personnelSub = this.personnelService.persSubject.subscribe(
      (personnels) => {
        this.personnels = personnels;
        console.log(this.personnels);
      }
    );
    this.personnelService.getAllPerso();
  }

  ngOnDestroy(): void {
    this.personnelSub.unsubscribe();
  }
}
