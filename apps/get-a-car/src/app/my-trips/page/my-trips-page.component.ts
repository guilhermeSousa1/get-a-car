import { Component, OnInit } from '@angular/core';

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'my-trips-page',
  templateUrl: './my-trips-page.component.html',
  styleUrls:   ['./my-trips-page.component.scss']
})
export class MyTripsPageComponent implements OnInit {

  public arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  public columnsToDisplay = ['date', 'days', 'car', 'extra-charge', 'status'];

  /**
   * Class constructor.
   *
   * @public
   */
  constructor() {
  }

  /**
   * Lifecycle hook that is executed after the component is initialized.
   *
   * @public
   */
  public ngOnInit(): void {
  }

}
