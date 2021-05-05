import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
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

  /** Flag indicating if the component is ready to be rendered. */
  public isComponentReady = false;
  /** Observable for the medium screen size. */
  public isMediumScreen$: Observable<boolean>;
  /** Behaviour subject for the opened state of the mat-sidenav. */
  public sidebarOpened$ = new BehaviorSubject<boolean>(false);

  /**
   * Class constructor.
   *
   * @public
   * @param breakPointObserver  Injection of the breakpoint observer utility
   * @param matIconRegistry     Injection of the MatIconRegistry service
   * @param domSanitizer        Injection of the DomSanitizer service
   * @param router              Injection of the Router service
   */
  constructor(private breakPointObserver: BreakpointObserver,
              private domSanitizer: DomSanitizer,
              private matIconRegistry: MatIconRegistry,
              private router: Router) {
  }

  /**
   * Lifecycle hook that is executed after the component is initialized.
   *
   * @public
   */
  public ngOnInit(): void {
    this.registerSvgIcons();
    this.setupComponentObservables();

    this.isComponentReady = true;
  }

  /**
   * Registers the svg icons
   *
   * @private
   */
  private registerSvgIcons(): void {
    this.matIconRegistry.addSvgIcon(
      'angular',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/angular.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'twitter',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/twitter.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'linkedin',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/linkedin.svg')
    );
  }

  /**
   * Sets up the component observables.
   *
   * @private
   */
  private setupComponentObservables(): void {
    this.isMediumScreen$ = this.breakPointObserver.observe('(max-width: 767px)')
      .pipe(
        map(((result) => result.matches)),
        tap((matches) => {
          if (!matches) {
            this.sidebarOpened$.next(false);
          }
        })
      );

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((event) => event instanceof NavigationEnd),
        withLatestFrom(this.isMediumScreen$)
      )
      .subscribe(([_, isMediumScreen]) => {
        if (isMediumScreen) {
          this.sidebarOpened$.next(false);
        }
      });
  }
}
