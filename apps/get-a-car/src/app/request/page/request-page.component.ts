import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Car, CarPreferences, ChargingCable, DriveMode, RadioStation, ReservationData } from '@guilhermeSousa1/shared/data-models';
import { sameDayReservationValidation } from '@guilhermeSousa1/core/validators/same-day-reservation.validator';
import { EditCarPreferencesDialogComponent } from '@guilhermeSousa1/request/dialogs/edit-car-preferences/edit-car-preferences.dialog.component';
import { CarRequestDialogComponent } from '@guilhermeSousa1/request/dialogs/car-request/car-request.dialog.component';

import defaultCars from './config/cars.json';
import defaultCarPreferences from './config/default-car-preferences.json';
import { DateService } from '@guilhermeSousa1/core/services/date.service';

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'request-page',
  templateUrl: './request-page.component.html',
  styleUrls:   ['./request-page.component.scss']
})
export class RequestPageComponent implements OnInit {

  /** Instantiation of the radio stations */
  public RADIO_STATIONS = RadioStation;
  /** Instantiation of the drive modes */
  public DRIVE_MODES = DriveMode;
  /** Instantiation of the charging cables */
  public CHARGING_CABLES = ChargingCable;

  /** The list of available cars */
  public cars = defaultCars as Car[];
  /** The car preferences for the reservation */
  public carPreferences = defaultCarPreferences as CarPreferences;
  /** Form group to be used by the form */
  public form: FormGroup;
  /** Observable for the small screen size. */
  public isSmallScreen$: Observable<boolean>;
  /** List of possible time values, hourly separated, of a day */
  public timesList = [
    ...Array.from({ length: 12 }).map((_, hr) => ({ display: `${ hr === 0 ? 12 : hr }:00 AM`, value: hr })),
    ...Array.from({ length: 12 }).map((_, hr) => ({ display: `${ hr === 0 ? 12 : hr }:00 PM`, value: hr + 12 }))
  ]

  /**
   * Class constructor.
   *
   * @public
   *
   * @param dialog              Injection of the Dialog service
   * @param formBuilder         Injection of the FormBuilder service
   * @param breakPointObserver  Injection of the breakpoint observer utility
   * @param dateService         Injection of the Date service
   */
  constructor(private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private breakPointObserver: BreakpointObserver,
              private dateService: DateService) {
  }

  /**
   * Lifecycle hook that is executed after the component is initialized.
   *
   * @public
   */
  public ngOnInit(): void {
    this.initializeForm();
    this.setupComponentObservables();
  }

  /**
   * Displays the modal to edit the car preferences
   *
   * @public
   */
  public showEditCarPreferencesDialog(): void {
    const config: MatDialogConfig = {
      width:     '550px',
      autoFocus: false,
      data:      {
        carPreferences: this.carPreferences
      }
    };

    const dialogRef = this.dialog?.open(EditCarPreferencesDialogComponent, config);

    dialogRef.afterClosed()
      .pipe(
        take(1),
        tap((carPreferences) => {
          if (carPreferences) {
            this.carPreferences = carPreferences;
          }
        })
      )
      .subscribe();
  }

  /**
   * Displays the modal to request a car
   *
   * @public
   * @param requestedCar  The requested car
   */
  public showRequestCarDialog(requestedCar: Car): void {
    const reservationData: ReservationData = {
      address:        this.form?.get('address')?.value,
      startDate:      this.form?.get('startDate')?.value,
      endDate:        this.form?.get('endDate')?.value,
      drivingDays:    this.dateService?.differenceInDays(this.form?.get('startDate')?.value, this.form?.get('endDate')?.value) + 1,
      deliveryTime:   this.form?.get('deliveryTime')?.value,
      collectionTime: this.form?.get('collectionTime')?.value,
      carPreferences: this.carPreferences,
      accessories:    []
    };

    const config: MatDialogConfig = {
      width:     '800px',
      autoFocus: false,
      data:      {
        car: requestedCar,
        reservationData
      }
    };

    const dialogRef = this.dialog?.open(CarRequestDialogComponent, config);
  }

  /**
   * Initializes the form
   *
   * @private
   */
  private initializeForm(): void {
    this.form = this.formBuilder?.group({
      address:        [null, Validators.required],
      startDate:      [null, Validators.required],
      endDate:        [null, Validators.required],
      deliveryTime:   [null, Validators.required],
      collectionTime: [null, Validators.required]
    }, { validators: sameDayReservationValidation() });
  }

  /**
   * Sets up the component observables.
   *
   * @private
   */
  private setupComponentObservables(): void {
    this.isSmallScreen$ = this.breakPointObserver?.observe('(max-width: 639px)')
      .pipe(
        map(((result) => result.matches))
      );
  }
}
