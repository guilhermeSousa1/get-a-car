import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CarAccessory } from '@guilhermeSousa1/shared/data-models';

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'car-accessory',
  templateUrl: './car-accessory.component.html',
  styleUrls:   ['./car-accessory.component.scss']
})
export class CarAccessoryComponent {

  /** The car accessory */
  @Input() public accessory: CarAccessory;

  /** The event triggered when the selection of an accessory is toggled */
  @Output() public toggleAccessory = new EventEmitter<CarAccessory>();

  /**
   * Class constructor.
   *
   * @public
   */
  constructor() {
  }
}
