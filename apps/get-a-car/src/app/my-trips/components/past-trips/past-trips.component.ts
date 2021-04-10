import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reservation, ReservationStatus } from '@guilhermeSousa1/shared/data-models';
import { DataService } from '@guilhermeSousa1/core/services';
import { TripDetailsDialogComponent } from '@guilhermeSousa1/my-trips/dialogs';

/**
 * Component responsible for the past-trips.
 */

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'past-trips',
  templateUrl: './past-trips.component.html',
  styleUrls:   ['./past-trips.component.scss']
})
export class PastTripsComponent implements OnInit {

  /** Instantiation of the reservation status */
  public RESERVATION_STATUS = ReservationStatus;

  /** Observable for the large screen size. */
  public isLargeScreen$: Observable<boolean>;
  /** Observable for the list of past trips */
  public pastReservations$: Observable<Reservation[]>;

  public columnsToDisplay = ['date', 'days', 'car', 'extra-charge', 'status'];

  /**
   * Class constructor.
   *
   * @public
   *
   * @param breakPointObserver  Injection of the breakpoint observer utility
   * @param dataService         Injection of the Data service
   * @param dialog              Injection of the Dialog service
   */
  constructor(private breakPointObserver: BreakpointObserver,
              private dataService: DataService,
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
   * Displays the modal with the trip details.
   *
   * @public
   */
  public showTripDetailsDialog(): void {
    const config: MatDialogConfig = {
      width:     '800px',
      autoFocus: false
    };

    const dialogRef = this.dialog?.open(TripDetailsDialogComponent, config);
  }

  /**
   * Sets up the component observables.
   *
   * @private
   */
  private setupComponentObservables(): void {
    this.isLargeScreen$ = this.breakPointObserver?.observe('(max-width: 1059px)')
      .pipe(
        map(((result) => result.matches))
      );

    this.pastReservations$ = this.dataService?.getPastReservations();
  }

}
