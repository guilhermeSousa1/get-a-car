import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Car } from '@guilhermeSousa1/shared/data-models';
import { ReservationService } from '@guilhermeSousa1/core/services/reservation/reservation.service';
import { DataService } from '@guilhermeSousa1/core/services/data/data.service';

/**
 * Component responsible for the page to request a car.
 */

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'request-page',
  templateUrl: './request-page.component.html',
  styleUrls:   ['./request-page.component.scss'],
  providers:   [ReservationService]
})
export class RequestPageComponent implements OnInit {

  /** Observable for the list of available cars */
  public allCars$: Observable<Car[]>;

  /**
   * Class constructor.
   *
   * @public
   *
   * @param dataService  Injection of the Data service
   * @param dialog       Injection of the Dialog service
   */
  constructor(private dataService: DataService,
              private dialog: MatDialog) {
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
   * Displays the modal to request a car
   *
   * @public
   * @param requestedCar  The requested car
   */
  public showRequestCarDialog(requestedCar: Car): void {
    // const startDate = +this.dateService?.setHours(this.form?.get('startDate')?.value, this.form?.get('deliveryTime')?.value);
    // const endDate = +this.dateService?.setHours(this.form?.get('endDate')?.value, this.form?.get('collectionTime')?.value);
    // const drivingDays = this.dateService?.differenceInDays(this.form?.get('startDate')?.value, this.form?.get('endDate')?.value) + 1;
    //
    // const reservationDetails: ReservationDetails = {
    //   address: this.form?.get('address')?.value,
    //   startDate,
    //   endDate,
    //   drivingDays
    // };
    //
    // const config: MatDialogConfig = {
    //   width:     '800px',
    //   autoFocus: false,
    //   data:      {
    //     car: requestedCar,
    //     reservationDetails
    //   }
    // };
    //
    // const dialogRef = this.dialog?.open(CarRequestDialogComponent, config);
    //
    // dialogRef.afterClosed()
    //   .pipe(take(1))
    //   .subscribe(({ selectedAccessories, additionalCharge }) => {
    //     if (selectedAccessories != null && additionalCharge != null) {
    //       const reservation: Reservation = {
    //         details:        reservationDetails,
    //         car:            requestedCar,
    //         carPreferences: null,
    //         accessories:    selectedAccessories,
    //         additionalCharge,
    //         status:         ReservationStatus.PLANNED
    //       };
    //     }
    //   });
  }

  /**
   * Sets up the component observables.
   *
   * @private
   */
  private setupComponentObservables(): void {
    this.allCars$ = this.dataService?.getCars();
  }
}
