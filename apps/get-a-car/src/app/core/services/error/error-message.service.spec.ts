import { TestBed } from '@angular/core/testing';
import { ErrorMessageService } from '@guilhermeSousa1/core/services/error/error-message.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('ErrorService', () => {
  let service: ErrorMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('client error', () => {
    it('should return message property', () => {
      const errorMessage = 'Test error';
      const error = Error(errorMessage);
      const clientErrorMessage = service.getClientErrorMessage(error);

      expect(clientErrorMessage).toBe(errorMessage);
    });

    it('should return error converted to string', () => {
      const error = Error();
      const clientErrorMessage = service.getClientErrorMessage(error);

      expect(clientErrorMessage).toBe('Error');
    });
  });

  describe('server error', () => {
    it('should return message property', () => {
      const httpError = new HttpErrorResponse({});
      const serverErrorMessage = service.getServerErrorMessage(httpError);

      expect(serverErrorMessage).toBe(httpError.message);
    });

    it('should return no internet connection', () => {
      jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(false);
      const errorMessage = 'Test error';
      const error = Error(errorMessage);
      const httpError = new HttpErrorResponse({ error });
      const serverErrorMessage = service.getServerErrorMessage(httpError);

      expect(serverErrorMessage).toBe('No Internet Connection');
    });
  });

});
