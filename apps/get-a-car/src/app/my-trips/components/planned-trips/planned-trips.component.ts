import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reservation } from '@guilhermeSousa1/shared/data-models';
import { EditTripDialogComponent } from '@guilhermeSousa1/my-trips/dialogs/edit-trip/edit-trip.dialog.component';
import { DataService } from '@guilhermeSousa1/core/services/data/data.service';

/**
 * Component responsible for the planned-trips.
 */

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'planned-trips',
  templateUrl: './planned-trips.component.html',
  styleUrls:   ['./planned-trips.component.scss']
})
export class PlannedTripsComponent implements OnInit {

  /** List of columns to display on the mat-table */
  public columnsToDisplay = ['date', 'days', 'car', 'extra-charge'];

  /** Observable for the large screen size. */
  public isLargeScreen$: Observable<boolean>;
  /** Observable for the list of planned trips */
  public plannedReservations$: Observable<Reservation[]>;
  /** The start index to slice the reservation list */
  public startSlice = 0;
  /** The end index to slice the reservation list */
  public endSlice = 5;

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
   * Displays the modal to edit a trip.
   *
   * @public
   */
  public showEditTripDialog(trip: Reservation): void {
    const config: MatDialogConfig = {
      width:     '800px',
      autoFocus: false,
      data:      {
        trip
      }
    };

    const dialogRef = this.dialog?.open(EditTripDialogComponent, config);
  }

  /**
   * Changes the slicing properties for the reservations list.
   *
   * @public
   *
   * @param  event The page event
   */
  public sliceReservationsList(event: PageEvent): void {
    this.startSlice = event.pageIndex * event.pageSize;
    this.endSlice = this.startSlice + event.pageSize;
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

    this.plannedReservations$ = this.dataService?.getPlannedReservations();
  }

}
