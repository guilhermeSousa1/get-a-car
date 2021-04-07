import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation, ReservationStatus } from '@guilhermeSousa1/shared/data-models';
import { DataService } from '@guilhermeSousa1/core/services';

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'my-trips-page',
  templateUrl: './my-trips-page.component.html',
  styleUrls:   ['./my-trips-page.component.scss']
})
export class MyTripsPageComponent implements OnInit {

  /** Instantiation of the reservation status */
  public RESERVATION_STATUS = ReservationStatus;

  /** Observable for the list of past trips */
  public pastReservations$: Observable<Reservation[]>;

  public columnsToDisplay = ['date', 'days', 'car', 'extra-charge', 'status'];

  /**
   * Class constructor.
   *
   * @public
   *
   * @param dataService  Injection of the Data service
   */
  constructor(private dataService: DataService) {
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
   * Sets up the component observables.
   *
   * @private
   */
  private setupComponentObservables(): void {
    this.pastReservations$ = this.dataService?.getPastReservations();
  }

}
