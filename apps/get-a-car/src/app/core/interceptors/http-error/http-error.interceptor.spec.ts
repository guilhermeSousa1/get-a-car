import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorInterceptor } from './http-error.interceptor';

describe('HttpErrorInterceptor', () => {
  let interceptor: HttpErrorInterceptor;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HttpErrorInterceptor,
        {
          provide:  HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi:    true
        }
      ]
    });
    interceptor = TestBed.inject(HttpErrorInterceptor);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should throw error', () => {
    let actualError;
    const interceptSpy = jest.spyOn(interceptor, 'intercept');

    httpClient.get('thisIsAnInvalidUrl').subscribe(() => {
    },
    (error) => {
      actualError = error;
    });

    expect(interceptSpy).toThrowError(actualError);
  });
});
