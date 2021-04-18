import { Component, Input } from '@angular/core';
import { Car } from '@guilhermeSousa1/shared/data-models';

/**
 * Component responsible for the car banner.
 */

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'car-banner',
  templateUrl: './car-banner.component.html',
  styleUrls:   ['./car-banner.component.scss']
})
export class CarBannerComponent {

  /** The car */
  @Input() public car: Car;

  /**
   * Class constructor.
   *
   * @public
   */
  constructor() {
  }
}
