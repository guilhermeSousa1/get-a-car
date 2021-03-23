import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarPreferences, ChargingCable, DriveMode, RadioStation } from '@guilhermeSousa1/shared/data-models';

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
   * @param formBuilder  Injection of the FormBuilder service
   * @param dialogData   Data passed to the dialog
   * @param dialogRef    A reference to the dialog
   */
  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditCarPreferencesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: { carPreferences: CarPreferences }) {
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
      radioStation:  this.form?.get('radioStation')?.value ?? this.dialogData?.carPreferences?.radioStation,
      temperature:   this.form?.get('temperature')?.value ?? this.dialogData?.carPreferences?.temperature,
      driveMode:     this.form?.get('driveMode')?.value ?? this.dialogData?.carPreferences?.driveMode,
      chargingCable: this.form?.get('chargingCable')?.value ?? this.dialogData?.carPreferences?.chargingCable
    };

    this.dialogRef?.close(carPreferences);
  }

  /**
   * Initializes the form
   *
   * @private
   */
  private initializeForm(): void {
    this.form = this.formBuilder?.group({
      radioStation:  [this.dialogData?.carPreferences?.radioStation, Validators.required],
      temperature:   [this.dialogData?.carPreferences?.temperature, [Validators.required, Validators.min(15), Validators.max(27)]],
      driveMode:     [this.dialogData?.carPreferences?.driveMode, Validators.required],
      chargingCable: [this.dialogData?.carPreferences?.chargingCable, Validators.required]
    });
  }

}
