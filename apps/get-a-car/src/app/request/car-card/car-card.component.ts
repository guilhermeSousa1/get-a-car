import { Component, Input } from '@angular/core';
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

  constructor() {
  }

}
