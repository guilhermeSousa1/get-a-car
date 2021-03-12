import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';

/**
 * Component responsible for the toolbar.
 */
@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  /** The event triggered when the sidebar is opened */
  @Output() public openSidebar: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /** Behaviour subject for the url path. */
  public url$: BehaviorSubject<string> = new BehaviorSubject<string>('');

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
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.url.substring(1)),
        tap((url) => this.url$.next(url))
      )
      .subscribe();
  }

}
