import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { first } from 'rxjs/operators';
import { Car, CarAccessory, CarPreferences } from '@guilhermeSousa1/shared/data-models';
import { testAccessories, testCar, testCarPreferences } from '@guilhermeSousa1/shared/test-utils';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DataService
      ]
    });
    service = TestBed.inject(DataService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the list of cars', () => {
    const expectedUrl = 'api/cars';
    let actualCars: Car[] | undefined;

    service.getCars()
      .pipe(first())
      .subscribe((cars) => {
        actualCars = cars;
      });

    const request = controller.expectOne({ method: 'GET', url: expectedUrl });
    request.flush(testCar);
    controller.verify();

    expect(actualCars).toEqual(testCar);
  });

  it('should get the list of car accessories', () => {
    const expectedUrl = 'api/accessories';
    let actualAccessories: CarAccessory[] | undefined;

    service.getAccessories()
      .pipe(first())
      .subscribe((accessories) => {
        actualAccessories = accessories;
      });

    const request = controller.expectOne({ method: 'GET', url: expectedUrl });
    request.flush(testAccessories);
    controller.verify();

    expect(actualAccessories).toEqual(testAccessories);
  });

  it('should get the car preferences', () => {
    const expectedUrl = 'api/defaultCarPreferences';
    let actualCarPreferences: CarPreferences | undefined;

    service.getDefaultCarPreferences()
      .pipe(first())
      .subscribe((carPreferences) => {
        actualCarPreferences = carPreferences;
      });

    const request = controller.expectOne({ method: 'GET', url: expectedUrl });
    request.flush(testCarPreferences);
    controller.verify();

    expect(actualCarPreferences).toEqual(testCarPreferences);
  });

  it('should return errors when getting the list of cars', () => {
    const expectedUrl = 'api/cars';
    const status = 500;
    const statusText = 'Fetching error';
    const errorEvent = new ErrorEvent('Error');

    let actualError: HttpErrorResponse | undefined;

    service.getCars()
      .pipe(first())
      .subscribe(
        () => {
          fail('next handler must not be called');
        },
        (error) => {
          actualError = error;
        },
        () => {
          fail('complete handler must not be called');
        }
      );

    controller.expectOne({ method: 'GET', url: expectedUrl }).error(
      errorEvent,
      { status, statusText }
    );
    controller.verify();

    expect(actualError.error).toBe(errorEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);
  });

  it('should return errors when getting the list of accessories', () => {
    const expectedUrl = 'api/accessories';
    const status = 500;
    const statusText = 'Fetching error';
    const errorEvent = new ErrorEvent('Error');

    let actualError: HttpErrorResponse | undefined;

    service.getAccessories()
      .pipe(first())
      .subscribe(
        () => {
          fail('next handler must not be called');
        },
        (error) => {
          actualError = error;
        },
        () => {
          fail('complete handler must not be called');
        }
      );

    controller.expectOne({ method: 'GET', url: expectedUrl }).error(
      errorEvent,
      { status, statusText }
    );
    controller.verify();

    expect(actualError.error).toBe(errorEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);
  });

  it('should return errors when getting the car preferences', () => {
    const expectedUrl = 'api/defaultCarPreferences';
    const status = 500;
    const statusText = 'Fetching error';
    const errorEvent = new ErrorEvent('Error');

    let actualError: HttpErrorResponse | undefined;

    service.getDefaultCarPreferences()
      .pipe(first())
      .subscribe(
        () => {
          fail('next handler must not be called');
        },
        (error) => {
          actualError = error;
        },
        () => {
          fail('complete handler must not be called');
        }
      );

    controller.expectOne({ method: 'GET', url: expectedUrl }).error(
      errorEvent,
      { status, statusText }
    );
    controller.verify();

    expect(actualError.error).toBe(errorEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);
  });
});
