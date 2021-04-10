import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Car, CarAccessory, ReservationDetails } from '@guilhermeSousa1/shared/data-models';
import { DataService } from '@guilhermeSousa1/core/services/data/data.service';

/**
 * Component responsible for the dialog to request a car.
 */

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'car-request',
  templateUrl: './car-request.dialog.component.html',
  styleUrls:   ['./car-request.dialog.component.scss']
})
export class CarRequestDialogComponent implements OnInit {

  /** Observable for the list of available accessories */
  public allAccessories$: Observable<CarAccessory[]>;
  /** Charging value for the accessories */
  public additionalCharge = 0;

  /** The list of selected accessories */
  private selectedAccessories: CarAccessory[] = [];

  /**
   * Class constructor.
   *
   * @public
   * @param dialogRef    Reference to the dialog
   * @param dataService  Injection of the Data service
   * @param dialogData   Data passed to the dialog
   */
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: { car: Car, reservationDetails: ReservationDetails },
              private dataService: DataService,
              private dialogRef: MatDialogRef<CarRequestDialogComponent>) {
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

  /**
   * Closes the dialog and submits the list of accessories
   *
   * @public
   */
  public submitAccessories(): void {
    this.dialogRef?.close({ selectedAccessories: this.selectedAccessories, additionalCharge: this.additionalCharge });
  }

  /**
   * Sets up the component observables.
   *
   * @private
   */
  private setupComponentObservables(): void {
    this.allAccessories$ = this.dataService?.getAccessories();
  }
}
