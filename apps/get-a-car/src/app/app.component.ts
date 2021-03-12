import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Root component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /** Subscription to BreakpointObserver for the small screen size. */
  public isSmallScreen$ = this.breakPointObserver.observe('(max-width: 640px)')
    .pipe(
      map(((result) => result.matches))
    );

  /** Behaviour subject for the opened state of the mat-sidenav. */
  public sidebarOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Class constructor.
   *
   * @public
   * @param breakPointObserver  Injection of the breakpoint observer utility
   */
  constructor(private breakPointObserver: BreakpointObserver) {
  }

  /**
   * Opens the sidebar
   *
   * @public
   * @param event  Event data
   */
  public openSidebar(event: Event): void {
    event.stopPropagation();
    this.sidebarOpened$.next(true);
  }
}
