import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car, DriveSystem } from '@guilhermeSousa1/shared/data-models';

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'car-card',
  templateUrl: './car-card.component.html',
  styleUrls:   ['./car-card.component.scss']
})
export class CarCardComponent {

  /** Instantiation of the drive systems */
  public DRIVE_SYSTEM = DriveSystem;

  /** The car stats */
  @Input() public car: Car;
  /** Flag indicating if the request-a-car form is invalid*/
  @Input() public isFormInvalid: boolean;

  /** The event triggered in order to book a car */
  @Output() public requestCar = new EventEmitter<MouseEvent>();

  /**
   * Class constructor.
   *
   * @public
   */
  constructor() {
  }

}
