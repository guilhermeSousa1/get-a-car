import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Service used to create notifications.
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  /**
   * Class constructor.
   *
   * @param snackBar  Injection of the MatSnackBar service
   */
  constructor(private snackBar: MatSnackBar) {
  }

  /**
   * Shows the error notification.
   *
   * @public
   * @param message  The error message
   */
  public showError(message: string): void {
    this.snackBar.open(message, 'X',
      { panelClass: ['error-notification'], duration: 5000, horizontalPosition: 'end', verticalPosition: 'top' });
  }
}
