import { Component, EventEmitter, Output } from '@angular/core';

/**
 * Component responsible for the toolbar.
 */

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls:   ['./toolbar.component.scss']
})
export class ToolbarComponent {

  /** The event triggered when the sidebar is opened */
  @Output() public openSidebar = new EventEmitter<MouseEvent>();

  /**
   * Class constructor.
   *
   * @public
   */
  constructor() {
  }
}
