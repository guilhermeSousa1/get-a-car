import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

/**
 * Root component of the application.
 */

/* eslint-disable no-multi-spaces */
@UntilDestroy()
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
   * @param router              Injection of the Router service
   */
  constructor(private breakPointObserver: BreakpointObserver,
              private router: Router) {
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
    this.isSmallScreen$ = this.breakPointObserver?.observe('(max-width: 767px)')
      .pipe(
        map(((result) => result.matches)),
        tap((matches) => {
          if (!matches) {
            this.sidebarOpened$.next(false);
          }
        })
      );

    this.router?.events
      .pipe(
        untilDestroyed(this),
        filter((event) => event instanceof NavigationEnd),
        withLatestFrom(this.isSmallScreen$)
      )
      .subscribe(([_, isSmallScreen]) => {
        if (isSmallScreen) {
          this.sidebarOpened$?.next(false);
        }
      });
  }
}
