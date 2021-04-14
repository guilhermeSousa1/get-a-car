import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { DataService } from '@guilhermeSousa1/core/services';
import { CarPreferences, ChargingCable, DriveMode, RadioStation } from '@guilhermeSousa1/shared/data-models';
import { EditCarPreferencesDialogComponent } from '@guilhermeSousa1/shared/dialogs';

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

  /** The car preferences */
  public carPreferences: CarPreferences;

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
      .pipe(take(1))
      .subscribe((carPreferences) => {
        if (carPreferences) {
          this.carPreferences = carPreferences;
        }
      });
  }

  /**
   * Sets up the component observables.
   *
   * @private
   */
  private setupComponentObservables(): void {
    this.dataService?.getDefaultCarPreferences()
      .pipe(take(1))
      .subscribe((carPreferences) => {
        this.carPreferences = carPreferences;
      });
  }
}
