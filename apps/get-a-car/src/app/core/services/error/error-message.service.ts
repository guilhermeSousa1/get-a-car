import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Service used to determine the error message.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  /**
   * Returns the client error message.
   *
   * @public
   * @param error  The client side error
   * @returns  {string}
   */
  public getClientErrorMessage(error: Error): string {
    return error.message
      ? error.message
      : error.toString();
  }

  /**
   * Returns the server error message.
   *
   * @public
   *
   * @param error  The server side error
   * @returns  {string}
   */
  public getServerErrorMessage(error: HttpErrorResponse): string {
    return navigator.onLine
      ? error.message
      : 'No Internet Connection';
  }
}
