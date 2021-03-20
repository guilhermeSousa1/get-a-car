import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { finalize, tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EditCarPreferencesDialogComponent } from '../dialogs/edit-car-preferences/edit-car-preferences.dialog.component';

/* eslint-disable no-multi-spaces */
@UntilDestroy()
@Component({
  selector:    'request-page',
  templateUrl: './request-page.component.html',
  styleUrls:   ['./request-page.component.scss']
})
export class RequestPageComponent implements OnInit {

  /**
   * Class constructor.
   *
   * @public
   *
   * @param dialog  Injection of the Dialog service
   */
  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    // Empty
  }

  /**
   * Displays the modal to edit the car preferences
   *
   * @public
   */
  public editCarPreferences(): void {
    const config: MatDialogConfig = {
      width:     '552px',
      autoFocus: false
    };

    const dialogRef = this.dialog.open(EditCarPreferencesDialogComponent, config);

    dialogRef.afterClosed()
      .pipe(
        untilDestroyed(this),
        tap(() => console.log('dialog closed')),
        finalize(() => console.log('subscription finalized'))
      )
      .subscribe();
  }

}
