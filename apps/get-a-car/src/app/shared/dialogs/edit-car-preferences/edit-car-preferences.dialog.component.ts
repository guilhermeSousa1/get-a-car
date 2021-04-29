import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CarPreferences, ChargingCable, DriveMode, RadioStation } from '@guilhermeSousa1/shared/data-models';
import { ReservationService } from '@guilhermeSousa1/core/services/reservation/reservation.service';

/**
 * Component responsible for the dialog to edit the car preferences.
 */

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'edit-car-preferences',
  templateUrl: './edit-car-preferences.dialog.component.html',
  styleUrls:   ['./edit-car-preferences.dialog.component.scss']
})
export class EditCarPreferencesDialogComponent implements OnInit {

  /** Instantiation of the radio stations */
  public RADIO_STATIONS = RadioStation;
  /** Instantiation of the drive modes */
  public DRIVE_MODES = DriveMode;
  /** Instantiation of the charging cables */
  public CHARGING_CABLES = ChargingCable;

  /** Form group to be used by the form */
  public form: FormGroup;

  /**
   * Class constructor.
   *
   * @public
   *
   * @param dialogRef           Reference to the dialog
   * @param formBuilder         Injection of the FormBuilder service
   * @param reservationService  Injection of the reservation service
   */
  constructor(private dialogRef: MatDialogRef<EditCarPreferencesDialogComponent>,
              private formBuilder: FormBuilder,
              private reservationService: ReservationService) {
  }

  /**
   * Lifecycle hook that is executed after the component is initialized.
   *
   * @public
   */
  public ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Submits the form
   *
   * @public
   */
  public submit(): void {
    const carPreferences: CarPreferences = {
      radioStation:  this.form.get('radioStation')?.value,
      temperature:   this.form.get('temperature')?.value,
      driveMode:     this.form.get('driveMode')?.value,
      chargingCable: this.form.get('chargingCable')?.value
    };

    this.reservationService.updateCarPreferences(carPreferences);
    this.dialogRef.close();
  }

  /**
   * Initializes the form
   *
   * @private
   */
  private initializeForm(): void {
    const currentCarPreferences = this.reservationService?.getCarPreferences();

    this.form = this.formBuilder.group({
      radioStation:  [currentCarPreferences?.radioStation, Validators.required],
      temperature:   [currentCarPreferences?.temperature, [Validators.required, Validators.min(15), Validators.max(27)]],
      driveMode:     [currentCarPreferences?.driveMode, Validators.required],
      chargingCable: [currentCarPreferences?.chargingCable, Validators.required]
    });
  }

}
