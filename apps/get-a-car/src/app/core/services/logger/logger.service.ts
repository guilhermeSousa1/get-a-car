import { Injectable } from '@angular/core';

/**
 * Service responsible for the logging operations.
 */
@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  /**
   * Logs the error message.
   *
   * @public
   * @param message  The error message.
   */
  public logError(message: string): void {
    // ToDo: implement a server logging system
    console.error(`Error: ${ message }`);
  }
}
