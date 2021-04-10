import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { sameDayReservationValidator } from '@guilhermeSousa1/core/validators';
import { CarRequestDialogComponent, EditCarPreferencesDialogComponent } from '@guilhermeSousa1/request/dialogs';
import { DataService, DateService } from '@guilhermeSousa1/core/services';
import { Car, CarPreferences, ChargingCable, DriveMode, RadioStation, Reservation, ReservationDetails, ReservationStatus } from '@guilhermeSousa1/shared/data-models';

/**
 * Component responsible for the page to request a car.
 */

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

  /** Observable for the list of available cars */
  public allCars$: Observable<Car[]>;
  /** The car preferences for the reservation */
  public carPreferences: CarPreferences;
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
   * @param breakPointObserver  Injection of the breakpoint observer utility
   * @param dataService         Injection of the Data service
   * @param dateService         Injection of the Date service
   * @param dialog              Injection of the Dialog service
   * @param formBuilder         Injection of the FormBuilder service
   */
  constructor(private breakPointObserver: BreakpointObserver,
              private dataService: DataService,
              private dateService: DateService,
              private dialog: MatDialog,
              private formBuilder: FormBuilder) {
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
    const reservationDetails: ReservationDetails = {
      address:        this.form?.get('address')?.value,
      startDate:      +this.form?.get('startDate')?.value,
      endDate:        +this.form?.get('endDate')?.value,
      drivingDays:    this.dateService?.differenceInDays(this.form?.get('startDate')?.value, this.form?.get('endDate')?.value) + 1,
      deliveryTime:   this.form?.get('deliveryTime')?.value,
      collectionTime: this.form?.get('collectionTime')?.value
    };

    const config: MatDialogConfig = {
      width:     '800px',
      autoFocus: false,
      data:      {
        car: requestedCar,
        reservationDetails
      }
    };

    const dialogRef = this.dialog?.open(CarRequestDialogComponent, config);

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(({ selectedAccessories, additionalCharge }) => {
        const reservation: Reservation = {
          details:        reservationDetails,
          car:            requestedCar,
          carPreferences: this.carPreferences,
          accessories:    selectedAccessories,
          additionalCharge,
          status:         ReservationStatus.PLANNED
        };
      });
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
    }, { validators: sameDayReservationValidator() });
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

    this.allCars$ = this.dataService?.getCars();

    this.dataService?.getDefaultCarPreferences()
      .pipe(take(1))
      .subscribe((carPreferences) => {
        this.carPreferences = carPreferences;
      });
  }
}
