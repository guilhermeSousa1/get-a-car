import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EditCarPreferencesDialogComponent } from '../dialogs/edit-car-preferences/edit-car-preferences.dialog.component';

/* eslint-disable no-multi-spaces */
@UntilDestroy()
@Component({
  selector:    'request-page',
  templateUrl: './request-page.component.html',
  styleUrls:   ['./request-page.component.scss']
})
export class RequestPageComponent implements OnInit {

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
   */
  constructor(private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private breakPointObserver: BreakpointObserver) {
  }

  /**
   * Lifecycle hook that is executed after the component is initialized.
   *
   * @public
   */
  public ngOnInit(): void {
    this.isSmallScreen$ = this.breakPointObserver.observe('(max-width: 639px)')
      .pipe(
        map(((result) => result.matches))
      );

    this.initializeForm();
  }

  /**
   * Displays the modal to edit the car preferences
   *
   * @public
   */
  public editCarPreferences(): void {
    const config: MatDialogConfig = {
      width:     '550px',
      autoFocus: false
    };

    const dialogRef = this.dialog.open(EditCarPreferencesDialogComponent, config);

    dialogRef.afterClosed()
      .pipe(
        untilDestroyed(this),
        tap(() => console.log('dialog closed'))
      )
      .subscribe();
  }

  /**
   * Initializes the form
   *
   * @private
   */
  private initializeForm(): void {
    this.form = this.formBuilder.group({
      address:        [null, Validators.required],
      startDate:      [null, Validators.required],
      endDate:        [null, Validators.required],
      deliveryTime:   [null, Validators.required],
      collectionTime: [null, Validators.required]
    }, { validators: this.invalidSameDayReservation });
  }

  /**
   * Validates that the delivery and collection times are possible for same day car reservation.
   *
   * @param control  The form control
   * @returns        {ValidationErrors | null}
   */
  private invalidSameDayReservation: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (control.value?.['startDate'] != null
      && control.value?.['endDate'] != null
      && control.value?.['deliveryTime'] != null
      && control.value?.['collectionTime'] != null
      && +control.value?.['startDate'] === +control.value?.['endDate']
      && control.value?.['deliveryTime'] > control.value?.['collectionTime']) {
      return { invalidSameDayReservation: true };
    } else {
      return null;
    }
  };


}
