import { Component, Input } from '@angular/core';

/**
 * Component responsible for the referral step.
 */

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'referral-step',
  templateUrl: './referral-step.component.html',
  styleUrls:   ['./referral-step.component.scss']
})
export class ReferralStepComponent {

  /** The step title */
  @Input() public title: string;
  /** The step description */
  @Input() public description: string;
  /** The step icon */
  @Input() public icon: string;

  /**
   * Class constructor.
   *
   * @public
   */
  constructor() {
  }

}
