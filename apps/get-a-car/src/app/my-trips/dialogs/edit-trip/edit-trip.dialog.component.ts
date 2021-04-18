import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Car, CarAccessory, Reservation } from '@guilhermeSousa1/shared/data-models';
import { ReservationService } from '@guilhermeSousa1/core/services/reservation/reservation.service';
import { DataService } from '@guilhermeSousa1/core/services/data/data.service';

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'edit-trip',
  templateUrl: './edit-trip.dialog.component.html',
  styleUrls:   ['./edit-trip.dialog.component.scss'],
  providers:   [ReservationService]
})
export class EditTripDialogComponent implements OnInit {

  /** Observable for the list of available accessories */
  public allAccessories$: Observable<CarAccessory[]>;
  /** Observable for the list of available cars */
  public allCars$: Observable<Car[]>;

  /**
   * Class constructor.
   *
   * @public
   * @param dialogData   Data passed to the dialog
   * @param dataService  Injection of the Data service
   */
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: { trip: Reservation },
              private dataService: DataService) {
  }

  /**
   * Lifecycle hook that is executed after the component is initialized.
   *
   * @public
   */
  public ngOnInit(): void {
    this.setupComponentObservables();
  }

  /**
   * Sets up the component observables.
   *
   * @private
   */
  private setupComponentObservables(): void {
    this.allAccessories$ = this.dataService?.getAccessories();
    this.allCars$ = this.dataService?.getCars();
  }
}
