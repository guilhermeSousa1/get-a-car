import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

/**
 * HTTP interceptor that retries http requests in case of an error.
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  /**
   * Intercepts an outgoing HTTP request and retries it one more time in case of an error.
   *
   * @public
   *
   * @param request  Intercepted request
   * @param next     HTTP handler that dispatches the request
   * @returns        {Observable<HttpEvent<any>>}
   */
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
