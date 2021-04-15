import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { sameDayReservationValidator } from '@guilhermeSousa1/core/validators';
import { DateService } from '@guilhermeSousa1/core/services/date/date.service';

/**
 * Component responsible for the form of the reservation details.
 */

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'reservation-details-form',
  templateUrl: './reservation-details-form.component.html',
  styleUrls:   ['./reservation-details-form.component.scss']
})
export class ReservationDetailsFormComponent implements OnInit {

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
   * @param dateService         Injection of the Date service
   * @param formBuilder         Injection of the FormBuilder service
   */
  constructor(private breakPointObserver: BreakpointObserver,
              private dateService: DateService,
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
  }
}
