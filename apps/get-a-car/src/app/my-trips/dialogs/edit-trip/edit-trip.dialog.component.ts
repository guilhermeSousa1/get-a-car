import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Car, CarAccessory, Reservation } from '@guilhermeSousa1/shared/data-models';
import { ReservationService } from '@guilhermeSousa1/core/services/reservation/reservation.service';
import { DataService } from '@guilhermeSousa1/core/services/data/data.service';
import { ReservationAPI } from '@guilhermeSousa1/core/services/reservation-api/reservation-api.service';

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'edit-trip',
  templateUrl: './edit-trip.dialog.component.html',
  styleUrls:   ['./edit-trip.dialog.component.scss']
})
export class EditTripDialogComponent implements OnInit, OnDestroy {

  /** Observable for the list of available accessories */
  public allAccessories$: Observable<CarAccessory[]>;
  /** Observable for the list of available cars */
  public allCars$: Observable<Car[]>;
  /** Observable for the list of selected accessories */
  public selectedAccessories$: Observable<CarAccessory[]>;

  /**
   * Class constructor.
   *
   * @public
   * @param dialogData          Data passed to the dialog
   * @param dataService         Injection of the Data service
   * @param dialogRef           Reference to the dialog
   * @param reservationAPI      Injection of the Reservation API service
   * @param reservationService  Injection of the reservation service
   */
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: { trip: Reservation },
              private dataService: DataService,
              private dialogRef: MatDialogRef<EditTripDialogComponent>,
              private reservationAPI: ReservationAPI,
              private reservationService: ReservationService) {
  }

  /**
   * Lifecycle hook that is executed after the component is initialized.
   *
   * @public
   */
  public ngOnInit(): void {
    this.reservationService.resetSourceValues(this.dialogData.trip);
    this.setupComponentObservables();
  }

  /**
   * Lifecycle hook that is executed when the component is destroyed.
   *
   * @public
   */
  public ngOnDestroy(): void {
    this.reservationService.resetSourceValues();
  }

  /**
   * Updates the reservation
   *
   * @public
   */
  public submitReservation(): void {
    const reservationId = this.dialogData.trip?.id;

    this.reservationService.updateReservation(reservationId)
      .pipe(take(1))
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }

  /**
   * Cancels the reservation
   *
   * @public
   */
  public cancelReservation(): void {
    this.reservationAPI.cancelReservation(this.dialogData.trip)
      .pipe(take(1))
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }

  /**
   * Sets up the component observables.
   *
   * @private
   */
  private setupComponentObservables(): void {
    this.allAccessories$ = this.dataService.getAccessories();
    this.allCars$ = this.dataService.getCars();
    this.selectedAccessories$ = this.reservationService.carAccessories$;
  }
}
