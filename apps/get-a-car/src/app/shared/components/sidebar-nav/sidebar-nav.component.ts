import { Component, OnInit } from '@angular/core';

/**
 * Component responsible for the navigation sidebar.
 */
@Component({
  selector: 'sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss']
})
export class SidebarNavComponent implements OnInit {

  /**
   * Class constructor.
   *
   * @public
   * @param changeDetector      Injection of the ChangeDetector service
   */
  constructor() {
  }

  /**
   * Lifecycle hook that is executed after the component is initialized.
   *
   * @public
   */
  public ngOnInit(): void {
    console.log('hello');
  }

}
