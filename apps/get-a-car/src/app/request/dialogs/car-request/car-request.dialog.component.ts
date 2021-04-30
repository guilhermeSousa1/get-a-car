import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Car, CarAccessory, ReservationDetails } from '@guilhermeSousa1/shared/data-models';
import { DataService } from '@guilhermeSousa1/core/services/data/data.service';
import { ReservationService } from '@guilhermeSousa1/core/services/reservation/reservation.service';

/**
 * Component responsible for the dialog to request a car.
 */

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'car-request',
  templateUrl: './car-request.dialog.component.html',
  styleUrls:   ['./car-request.dialog.component.scss']
})
export class CarRequestDialogComponent implements OnInit {

  /** Observable for the list of available accessories */
  public allAccessories$: Observable<CarAccessory[]>;
  /** Observable for the reservation details. */
  public reservationDetails$: Observable<ReservationDetails>;
  /** Observable for the list of selected accessories */
  public selectedAccessories$: Observable<CarAccessory[]>;

  /**
   * Class constructor.
   *
   * @public
   * @param dialogRef           Reference to the dialog
   * @param dataService         Injection of the Data service
   * @param dialogData          Data passed to the dialog
   * @param reservationService  Injection of the reservation service
   */
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: { car: Car },
              private dataService: DataService,
              private dialogRef: MatDialogRef<CarRequestDialogComponent>,
              private reservationService: ReservationService) {
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
   * Closes the dialog and submits the list of accessories
   *
   * @public
   */
  public submitAccessories(): void {
    this.dialogRef.close(true);
  }

  /**
   * Sets up the component observables.
   *
   * @private
   */
  private setupComponentObservables(): void {
    this.allAccessories$ = this.dataService.getAccessories();
    this.reservationDetails$ = this.reservationService.details$;
    this.selectedAccessories$ = this.reservationService.carAccessories$;
  }
}
