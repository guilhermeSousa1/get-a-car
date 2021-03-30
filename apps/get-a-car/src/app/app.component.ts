import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

/**
 * Root component of the application.
 */

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'app-root',
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /** Observable for the small screen size. */
  public isSmallScreen$: Observable<boolean>;
  /** Behaviour subject for the opened state of the mat-sidenav. */
  public sidebarOpened$ = new BehaviorSubject<boolean>(false);

  /**
   * Class constructor.
   *
   * @public
   * @param breakPointObserver  Injection of the breakpoint observer utility
   */
  constructor(private breakPointObserver: BreakpointObserver) {
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
    this.isSmallScreen$ = this.breakPointObserver.observe('(max-width: 768px)')
      .pipe(
        map(((result) => result.matches)),
        tap((matches) => {
          if (!matches) {
            this.sidebarOpened$.next(false);
          }
        })
      );
  }
}
