import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CarPreferences, ChargingCable, DriveMode, RadioStation } from '@guilhermeSousa1/shared/data-models';
import { EditCarPreferencesDialogComponent } from '@guilhermeSousa1/shared/dialogs';
import { ReservationService } from '@guilhermeSousa1/core/services/reservation/reservation.service';

/**
 * Component responsible for the car preferences.
 */

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'car-preferences',
  templateUrl: './car-preferences.component.html',
  styleUrls:   ['./car-preferences.component.scss']
})
export class CarPreferencesComponent implements OnInit {

  /** Instantiation of the radio stations */
  public RADIO_STATIONS = RadioStation;
  /** Instantiation of the drive modes */
  public DRIVE_MODES = DriveMode;
  /** Instantiation of the charging cables */
  public CHARGING_CABLES = ChargingCable;

  /** Observable for the car preferences */
  public carPreferences$: Observable<CarPreferences>;

  /**
   * Class constructor.
   *
   * @public
   *
   * @param dialog              Injection of the Dialog service
   * @param reservationService  Injection of the reservation service
   */
  constructor(private dialog: MatDialog,
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
   * Displays the modal to edit the car preferences
   *
   * @public
   */
  public showEditCarPreferencesDialog(): void {
    const config: MatDialogConfig = {
      width:     '550px',
      autoFocus: false
    };

    this.dialog?.open(EditCarPreferencesDialogComponent, config);
  }

  /**
   * Sets up the component observables.
   *
   * @private
   */
  private setupComponentObservables(): void {
    this.carPreferences$ = this.reservationService?.carPreferences$;
  }
}
