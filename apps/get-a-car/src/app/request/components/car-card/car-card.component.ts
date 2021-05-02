import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Car, DriveSystem, ReservationDetails } from '@guilhermeSousa1/core/data-models';
import { ReservationService } from '@guilhermeSousa1/core/services/reservation/reservation.service';

/**
 * Component responsible for the car card.
 */

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'car-card',
  templateUrl: './car-card.component.html',
  styleUrls:   ['./car-card.component.scss']
})
export class CarCardComponent implements OnInit {

  /** Instantiation of the drive systems */
  public DRIVE_SYSTEM = DriveSystem;

  /** The car stats */
  @Input() public car: Car;

  /** The event triggered in order to book a car */
  @Output() public requestCar = new EventEmitter<MouseEvent>();

  /** Observable for the invalid same day reservation. */
  public invalidSameDayReservation$: Observable<boolean>;
  /** Observable for the reservation details. */
  public reservationDetails$: Observable<ReservationDetails>;

  /**
   * Class constructor.
   *
   * @public
   *
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
   *  Sets up the component observables.
   *
   * @private
   */
  private setupComponentObservables(): void {
    this.reservationDetails$ = this.reservationService.details$;
    this.invalidSameDayReservation$ = this.reservationService.invalidSameDayReservation$;
  }
}
