import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Car, CarAccessory, CarPreferences } from '@guilhermeSousa1/shared/data-models';
import { DataService } from './data.service';
import { environment } from '../../../../environments/environment';
import defaultCars from 'src/assets/data/cars.json';
import defaultAccessories from 'src/assets/data/accessories.json';
import defaultCarPreferences from 'src/assets/data/default-car-preferences.json';

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
    const expectedUrl = `${ environment.url }/cars.json`;
    let actualCars: Car[] | undefined;

    service.getCars()
      .subscribe((cars) => {
        actualCars = cars;
      });

    const request = controller.expectOne({ method: 'GET', url: expectedUrl });
    request.flush(defaultCars);
    controller.verify();

    expect(actualCars).toEqual(defaultCars);
  });

  it('should get the list of car accessories', () => {
    const expectedUrl = `${ environment.url }/accessories.json`;
    let actualAccessories: CarAccessory[] | undefined;

    service.getAccessories()
      .subscribe((accessories) => {
        actualAccessories = accessories;
      });

    const request = controller.expectOne({ method: 'GET', url: expectedUrl });
    request.flush(defaultAccessories);
    controller.verify();

    expect(actualAccessories).toEqual(defaultAccessories);
  });

  it('should get the car preferences', () => {
    const expectedUrl = `${ environment.url }/default-car-preferences.json`;
    let actualCarPreferences: CarPreferences | undefined;

    service.getDefaultCarPreferences()
      .subscribe((carPreferences) => {
        actualCarPreferences = carPreferences;
      });

    const request = controller.expectOne({ method: 'GET', url: expectedUrl });
    request.flush(defaultCarPreferences);
    controller.verify();

    expect(actualCarPreferences).toEqual(defaultCarPreferences);
  });

  it('should return errors when getting the list of cars', () => {
    const expectedUrl = `${ environment.url }/cars.json`;
    const status = 500;
    const statusText = 'Fetching error';
    const errorEvent = new ErrorEvent('Error');

    let actualError: HttpErrorResponse | undefined;

    service.getCars().subscribe(
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
    const expectedUrl = `${ environment.url }/accessories.json`;
    const status = 500;
    const statusText = 'Fetching error';
    const errorEvent = new ErrorEvent('Error');

    let actualError: HttpErrorResponse | undefined;

    service.getAccessories().subscribe(
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
    const expectedUrl = `${ environment.url }/default-car-preferences.json`;
    const status = 500;
    const statusText = 'Fetching error';
    const errorEvent = new ErrorEvent('Error');

    let actualError: HttpErrorResponse | undefined;

    service.getDefaultCarPreferences().subscribe(
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
