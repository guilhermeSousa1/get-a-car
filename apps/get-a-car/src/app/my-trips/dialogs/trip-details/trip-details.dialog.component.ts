import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reservation } from '@guilhermeSousa1/core/data-models';

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'trip-details',
  templateUrl: './trip-details.dialog.component.html',
  styleUrls:   ['./trip-details.dialog.component.scss']
})
export class TripDetailsDialogComponent {

  /**
   * Class constructor.
   *
   * @public
   * @param dialogData   Data passed to the dialog
   */
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: { trip: Reservation }) {
  }

}
