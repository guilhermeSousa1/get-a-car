import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reservation } from '@guilhermeSousa1/shared/data-models';

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'edit-trip',
  templateUrl: './edit-trip.dialog.component.html',
  styleUrls:   ['./edit-trip.dialog.component.scss']
})
export class EditTripDialogComponent {

  /**
   * Class constructor.
   *
   * @public
   * @param dialogData   Data passed to the dialog
   */
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: { trip: Reservation }) {
  }

}
