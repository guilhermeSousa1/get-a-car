import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessageService } from '@guilhermeSousa1/core/services/error/error-message.service';
import { LoggerService } from '@guilhermeSousa1/core/services/logger/logger.service';
import { NotificationService } from '@guilhermeSousa1/core/services/notification/notification.service';

/**
 * Service responsible for handling all the application errors.
 */
@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  /**
   * Class constructor.
   *
   * @param errorMessageService  Injection of the ErrorMessage Service
   * @param loggerService        Injection of the Logger Service
   * @param notificationService  Injection of the Notification Service
   */
  constructor(private errorMessageService: ErrorMessageService,
              private loggerService: LoggerService,
              private notificationService: NotificationService) {
  }

  /**
   * The global error handler
   *
   * @public
   * @param error  The error data
   */
  public handleError(error: Error | HttpErrorResponse): void {
    let message;

    if (error instanceof HttpErrorResponse) {
      // server error
      message = this.errorMessageService.getServerErrorMessage(error);
      this.notificationService.showError(message);
    } else {
      // client Error
      message = this.errorMessageService.getClientErrorMessage(error);
      this.notificationService.showError(message);
    }
    this.loggerService.logError(message);
  }
}
