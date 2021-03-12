import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

/**
 * Root component of the application.
 */
@Component({
  selector:    'app-root',
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /** Behaviour subject for the small screen size. */
  public isSmallScreen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /** Behaviour subject for the url path. */
  public url$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  /** Behaviour subject for the opened state of the mat-sidenav. */
  public sidebarOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.url.substring(1)),
        tap((url) => this.url$.next(url))
      )
      .subscribe();

    this.breakPointObserver.observe('(max-width: 639px)')
      .pipe(
        map(((result) => result.matches)),
        tap((matches) => this.isSmallScreen$.next(matches))
      )
      .subscribe();
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
