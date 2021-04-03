import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/**
 * Component responsible for the toolbar.
 */

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls:   ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  /** The event triggered when the sidebar is opened */
  @Output() public openSidebar = new EventEmitter<MouseEvent>();

  /** Behaviour subject for the url path. */
  public url$: Observable<string>;

  /**
   * Class constructor.
   *
   * @public
   * @param router  Injection of the Router service
   */
  constructor(private router: Router) {
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
   * Sets up the component observables.
   *
   * @private
   */
  private setupComponentObservables(): void {
    this.url$ = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.urlAfterRedirects.substring(1))
      );
  }
}
