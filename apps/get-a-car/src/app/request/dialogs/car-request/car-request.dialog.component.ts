import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Car, CarAccessory, ReservationData } from '@guilhermeSousa1/shared/data-models';
import defaultAccessories from './config/accessories.json';

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'car-request',
  templateUrl: './car-request.dialog.component.html',
  styleUrls:   ['./car-request.dialog.component.scss']
})
export class CarRequestDialogComponent {

  /** The list of the available accessories */
  public defaultAccessories = defaultAccessories;
  /** Charging value for the accessories */
  public additionalCharge = 0;

  /** The list of selected accessories */
  private selectedAccessories: CarAccessory[] = [];

  /**
   * Class constructor.
   *
   * @public
   * @param dialogData  Data passed to the dialog
   * @param dialogRef   Reference to the dialog
   */
  constructor(public dialogRef: MatDialogRef<CarRequestDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: { car: Car, reservationData: ReservationData }) {
  }

  /**
   * Toggles the selection of an accessory
   *
   * @public
   */
  public toggleAccessory(accessory: CarAccessory): void {
    if (this.selectedAccessories?.includes(accessory)) {
      this.selectedAccessories = this.selectedAccessories?.filter((selectedAccessory) => selectedAccessory.id !== accessory.id);
      this.additionalCharge -= accessory.price;
    } else {
      this.selectedAccessories?.push(accessory);
      this.additionalCharge += accessory.price;
    }
  }

}
