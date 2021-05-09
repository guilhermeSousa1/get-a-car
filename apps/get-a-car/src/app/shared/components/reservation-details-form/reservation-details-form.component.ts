import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { sameDayReservationValidator, whitespaceValidator } from '@guilhermeSousa1/core/validators';
import { DateService } from '@guilhermeSousa1/core/services/date/date.service';
import { ReservationService } from '@guilhermeSousa1/core/services/reservation/reservation.service';
import { ReservationDetails } from '@guilhermeSousa1/core/data-models';

/**
 * Component responsible for the form of the reservation details.
 */

/* eslint-disable no-multi-spaces */
@UntilDestroy()
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
  /** The current day date. */
  public today = new Date();

  /**
   * Class constructor.
   *
   * @public
   *
   * @param breakPointObserver  Injection of the breakpoint observer utility
   * @param dateService         Injection of the Date service
   * @param formBuilder         Injection of the FormBuilder service
   * @param reservationService  Injection of the reservation service
   */
  constructor(private breakPointObserver: BreakpointObserver,
              private dateService: DateService,
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
    this.setupFormSubscriptions();
    this.setupComponentObservables();
  }

  /**
   * Initializes the form
   *
   * @private
   */
  private initializeForm(): void {
    const reservationDetails = this.reservationService.getReservationDetails();

    if (reservationDetails) {
      const address = reservationDetails.address;
      const startDate = this.dateService.formatTimestampToDate(reservationDetails.startDate);
      const endDate = this.dateService.formatTimestampToDate(reservationDetails.endDate);
      const deliveryTime = this.dateService.getHours(startDate);
      const collectionTime = this.dateService.getHours(endDate);

      this.form = this.formBuilder.group({
        address:        [address, [Validators.required, whitespaceValidator()]],
        startDate:      [startDate, Validators.required],
        endDate:        [endDate, Validators.required],
        deliveryTime:   [deliveryTime, Validators.required],
        collectionTime: [collectionTime, Validators.required]
      }, { validators: sameDayReservationValidator() });
    } else {
      this.form = this.formBuilder.group({
        address:        [null, [Validators.required, whitespaceValidator()]],
        startDate:      [null, Validators.required],
        endDate:        [null, Validators.required],
        deliveryTime:   [null, Validators.required],
        collectionTime: [null, Validators.required]
      }, { validators: sameDayReservationValidator() });
    }
  }

  /**
   *  Sets up the component observables.
   *
   * @private
   */
  private setupComponentObservables(): void {
    this.isSmallScreen$ = this.breakPointObserver.observe('(max-width: 639px)')
      .pipe(
        map(((result) => result.matches))
      );
  }

  /**
   * Sets up the subscriptions to the form.
   *
   * @private
   */
  private setupFormSubscriptions(): void {
    combineLatest([
      this.form.valueChanges,
      this.form.statusChanges
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([formData, status]) => {
        if (status === 'VALID') {
          this.reservationService.updateDetails(this.transformFormData(formData));
        } else {
          this.reservationService.updateDetails(null);
        }

        this.reservationService.updateInvalidSameDayReservation(!!this.form.errors?.invalidSameDayReservation);
      });
  }

  /**
   * Transform the form data.
   *
   * @private
   *
   * @param formData  Form data
   * @return          {ReservationDetails}
   */
  private transformFormData(formData: any): ReservationDetails {
    if (formData == null) {
      return null;
    }

    const address = formData['address'].trim();
    const startDate = +this.dateService.setHours(formData['startDate'], formData['deliveryTime']);
    const endDate = +this.dateService.setHours(formData['endDate'], formData['collectionTime']);
    const drivingDays = this.dateService.differenceInDays(formData['startDate'], formData['endDate']) + 1;

    return {
      address,
      startDate,
      endDate,
      drivingDays
    };
  }
}
