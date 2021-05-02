import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { MockProvider } from 'ng-mocks';
import { ErrorMessageService } from '@guilhermeSousa1/core/services/error/error-message.service';
import { LoggerService } from '@guilhermeSousa1/core/services/logger/logger.service';
import { NotificationService } from '@guilhermeSousa1/core/services/notification/notification.service';
import { GlobalErrorHandlerService } from './global-error-handler.service';

describe('GlobalErrorHandlerService', () => {
  let service: GlobalErrorHandlerService;
  const mockGetServerErrorMessage = jest.fn().mockReturnValueOnce('server error');
  const mockGetClientErrorMessage = jest.fn().mockReturnValueOnce('client error');
  const mockShowError = jest.fn();
  const mockLogError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        GlobalErrorHandlerService,
        MockProvider(ErrorMessageService, {
          getServerErrorMessage: mockGetServerErrorMessage,
          getClientErrorMessage: mockGetClientErrorMessage
        }),
        MockProvider(LoggerService, {
          logError: mockLogError
        }),
        MockProvider(NotificationService, {
          showError: mockShowError
        })
      ]
    });
    service = TestBed.inject(GlobalErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle server error', () => {
    const httpError = new HttpErrorResponse({});

    service.handleError(httpError);

    expect(mockGetServerErrorMessage).toHaveBeenCalledTimes(1);
    expect(mockGetServerErrorMessage).toHaveBeenCalledWith(httpError);
    expect(mockShowError).toHaveBeenCalledTimes(1);
    expect(mockShowError).toHaveBeenCalledWith('server error');
    expect(mockLogError).toHaveBeenCalledTimes(1);
    expect(mockLogError).toHaveBeenCalledWith('server error');
  });

  it('should handle client error', () => {
    const error = new Error();

    service.handleError(error);

    expect(mockGetClientErrorMessage).toHaveBeenCalledTimes(1);
    expect(mockGetClientErrorMessage).toHaveBeenCalledWith(error);
    expect(mockShowError).toHaveBeenCalledTimes(1);
    expect(mockShowError).toHaveBeenCalledWith('client error');
    expect(mockLogError).toHaveBeenCalledTimes(1);
    expect(mockLogError).toHaveBeenCalledWith('client error');
  });
});
