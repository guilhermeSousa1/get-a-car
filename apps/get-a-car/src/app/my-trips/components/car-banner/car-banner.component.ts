import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Car, ReservationDetails } from '@guilhermeSousa1/shared/data-models';
import { ReservationService } from '@guilhermeSousa1/core/services/reservation/reservation.service';

/**
 * Component responsible for the car banner.
 */

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'car-banner',
  templateUrl: './car-banner.component.html',
  styleUrls:   ['./car-banner.component.scss']
})
export class CarBannerComponent implements OnInit {

  /** The car */
  @Input() public car: Car;

  /** Observable indicating if the car is selected */
  public isCarSelected$: Observable<boolean>;
  /** Observable for the invalid same day reservation. */
  public invalidSameDayReservation$: Observable<boolean>;
  /** Observable for the reservation details. */
  public reservationDetails$: Observable<ReservationDetails>;

  /**
   * Class constructor.
   *
   * @public
   * @param reservationService  Injection of the reservation service
   */
  constructor(private reservationService: ReservationService) {
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
   * Toggles the selection of the car.
   *
   * @public
   */
  public toggleCarSelection(): void {
    this.reservationService?.updateCar(this.car);
  }

  /**
   *  Sets up the component observables.
   *
   * @private
   */
  private setupComponentObservables(): void {
    this.reservationDetails$ = this.reservationService?.details$;
    this.invalidSameDayReservation$ = this.reservationService?.invalidSameDayReservation$;

    this.isCarSelected$ = this.reservationService?.car$
      .pipe(
        map((selectedCar) => selectedCar?.id === this.car?.id)
      );
  }
}
