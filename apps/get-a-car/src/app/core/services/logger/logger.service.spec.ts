import { TestBed } from '@angular/core/testing';
import { LoggerService } from '@guilhermeSousa1/core/services/logger/logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log the error', () => {
    const errorMessage = 'This is a pretty cool error message';
    const errorSpy = jest.spyOn(console, 'error');

    service.logError(errorMessage);

    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith(`Error: ${ errorMessage }`);
  });
});
