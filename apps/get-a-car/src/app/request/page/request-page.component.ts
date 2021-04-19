import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Car } from '@guilhermeSousa1/shared/data-models';
import { ReservationService } from '@guilhermeSousa1/core/services/reservation/reservation.service';
import { DataService } from '@guilhermeSousa1/core/services/data/data.service';
import { CarRequestDialogComponent } from '@guilhermeSousa1/request/dialogs/car-request/car-request.dialog.component';

/**
 * Component responsible for the page to request a car.
 */

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'request-page',
  templateUrl: './request-page.component.html',
  styleUrls:   ['./request-page.component.scss']
})
export class RequestPageComponent implements OnInit, OnDestroy {

  /** Observable for the list of available cars */
  public allCars$: Observable<Car[]>;

  /**
   * Class constructor.
   *
   * @public
   *
   * @param dataService         Injection of the Data service
   * @param dialog              Injection of the Dialog service
   * @param reservationService  Injection of the reservation service
   */
  constructor(private dataService: DataService,
              private dialog: MatDialog,
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
   * Lifecycle hook that is executed when the component is destroyed.
   *
   * @public
   */
  public ngOnDestroy(): void {
    this.reservationService?.resetSourceValues();
  }

  /**
   * Displays the modal to request a car
   *
   * @public
   * @param requestedCar  The requested car
   */
  public showRequestCarDialog(requestedCar: Car): void {
    const config: MatDialogConfig = {
      width:     '800px',
      autoFocus: false,
      data:      {
        car: requestedCar
      }
    };

    const dialogRef = this.dialog?.open(CarRequestDialogComponent, config);

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          this.reservationService?.updateCar(requestedCar);
          this.reservationService?.submitReservation();
        } else {
          this.reservationService?.resetAccessories();
        }
      });
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
