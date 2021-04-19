import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CarAccessory } from '@guilhermeSousa1/shared/data-models';
import { ReservationService } from '@guilhermeSousa1/core/services/reservation/reservation.service';

/**
 * Component responsible for the car accessory.
 */

/* eslint-disable no-multi-spaces */
@UntilDestroy()
@Component({
  selector:    'car-accessory',
  templateUrl: './car-accessory.component.html',
  styleUrls:   ['./car-accessory.component.scss']
})
export class CarAccessoryComponent implements OnInit {

  /** The car accessory */
  @Input() public accessory: CarAccessory;

  /** Flag indicating if the accessory is selected */
  public isAccessorySelected = false;

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
   * Toggles the selection of the accessory in the reservation service.
   *
   * @public
   */
  public toggleCarAccessory(): void {
    this.reservationService?.updateCarAccessories(this.accessory);
  }

  /**
   * Sets up the component observables.
   *
   * @private
   */
  private setupComponentObservables(): void {
    this.reservationService?.carAccessories$
      .pipe(untilDestroyed(this))
      .subscribe((selectedAccessories) => {
        this.isAccessorySelected = selectedAccessories.some((selectedAccessory) => selectedAccessory.id === this.accessory?.id);
      });
  }
}
