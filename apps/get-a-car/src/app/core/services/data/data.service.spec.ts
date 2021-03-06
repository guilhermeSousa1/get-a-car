import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { first } from 'rxjs/operators';
import { testAccessories, testBillingInfo, testCar, testCarPreferences } from '@guilhermeSousa1/core/test-utils';
import { BillingInfo, Car, CarAccessory, CarPreferences } from '@guilhermeSousa1/core/data-models';
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

  it('should get the billing info', () => {
    const expectedUrl = 'api/billingInfo';
    let actualBillingInfo: BillingInfo[] | undefined;

    service.getBillingInfo()
      .pipe(first())
      .subscribe((billingInfo) => {
        actualBillingInfo = billingInfo;
      });

    const request = controller.expectOne({ method: 'GET', url: expectedUrl });
    request.flush([testBillingInfo]);
    controller.verify();

    expect(actualBillingInfo).toEqual([testBillingInfo]);
  });

  it('should update the billing info', () => {
    const expectedUrl = 'api/billingInfo';
    let actualUpdatedBillingInfo: BillingInfo | undefined;

    service.updateBillingInfo(testBillingInfo)
      .pipe(first())
      .subscribe((billingInfo) => {
        actualUpdatedBillingInfo = billingInfo;
      });

    const request = controller.expectOne({ method: 'PUT', url: expectedUrl });
    request.flush(testBillingInfo);
    controller.verify();

    expect(request.request.body).toEqual(testBillingInfo);
    expect(actualUpdatedBillingInfo).toEqual(testBillingInfo);
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

  it('should return errors when getting the billing info', () => {
    const expectedUrl = 'api/billingInfo';
    const status = 500;
    const statusText = 'Fetching error';
    const errorEvent = new ErrorEvent('Error');

    let actualError: HttpErrorResponse | undefined;

    service.getBillingInfo()
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

  it('should return errors when updating the billing info', () => {
    const expectedUrl = 'api/billingInfo';
    const status = 500;
    const statusText = 'Fetching error';
    const errorEvent = new ErrorEvent('Error');

    let actualError: HttpErrorResponse | undefined;

    service.updateBillingInfo(testBillingInfo)
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

    controller.expectOne({ method: 'PUT', url: expectedUrl }).error(
      errorEvent,
      { status, statusText }
    );
    controller.verify();

    expect(actualError.error).toBe(errorEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);
  });
});
