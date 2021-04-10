import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Car, DriveSystem } from '@guilhermeSousa1/shared/data-models';

/**
 * Component responsible for the car card.
 */

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
  /** Form group for requesting a car */
  @Input() public form: FormGroup;

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
