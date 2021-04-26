import { Component, OnInit, OnDestroy } from '@angular/core';
import { LicencieService } from '../services/licencie.service';
import { Licencie } from '../models/licencie';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-licencie',
  templateUrl: './licencie.component.html',
  styleUrls: ['./licencie.component.scss'],
})
export class LicencieComponent implements OnInit, OnDestroy {
  private licencieSub: Subscription;
  licencies: Licencie[];
  licencieSubject = new Subject<any[]>();

  constructor(private licencieService: LicencieService) {}

  ngOnInit(): void {
    this.licencieSub = this.licencieService.licencieSubject.subscribe(
      (licencies) => {
        this.licencies = licencies;
        console.log(this.licencies);
      }
    );
    this.licencieService.getAllLicencies();
  }

  ngOnDestroy(): void {
    this.licencieSub.unsubscribe();
  }
}
