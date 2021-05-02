import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EMPTY, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { MockProvider } from 'ng-mocks';
import { Car, CarAccessory, CarPreferences, Reservation, ReservationDetails, ReservationStatus } from '@guilhermeSousa1/core/data-models';
import { ReservationService } from '@guilhermeSousa1/core/services/reservation/reservation.service';
import { DataService } from '@guilhermeSousa1/core/services/data/data.service';
import { ReservationAPI } from '@guilhermeSousa1/core/services/reservation-api/reservation-api.service';
import { testAccessories, testCar, testCarPreferences, testReservationDetails } from '@guilhermeSousa1/core/test-utils';

describe('ReservationService', () => {
  let service: ReservationService;
  const mockReservationAPI = {
    createReservation: jest.fn().mockImplementation((reservation: Reservation) => of(reservation)),
    updateReservation: jest.fn().mockImplementation(() => EMPTY)
  };

  beforeEach(() => {
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ReservationService,
        MockProvider(DataService, {
          getDefaultCarPreferences: () => of(testCarPreferences)
        }),
        { provide: ReservationAPI, useValue: mockReservationAPI }
      ]
    });
    service = TestBed.inject(ReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the car accessories', () => {
    let actualCarAccessories: CarAccessory[];

    service.updateCarAccessories(testAccessories);

    service.carAccessories$
      .pipe(first())
      .subscribe((updatedCarAccessories) => {
        actualCarAccessories = updatedCarAccessories;
      });

    expect(actualCarAccessories).toStrictEqual(testAccessories);
  });

  it('should reset the accessories', () => {
    let actualCarAccessories: CarAccessory[];

    service.resetAccessories();

    service.carAccessories$
      .pipe(first())
      .subscribe((updatedCarAccessories) => {
        actualCarAccessories = updatedCarAccessories;
      });

    expect(actualCarAccessories.length).toBe(0);
  });

  it('should get the current car preferences', () => {
    const actualCarPreferences = service.getCarPreferences();

    expect(actualCarPreferences).toBe(testCarPreferences);
  });

  it('should update the car preferences', () => {
    let actualCarPreferences: CarPreferences;

    service.updateCarPreferences(testCarPreferences);

    service.carPreferences$
      .pipe(first())
      .subscribe((updatedCarPreferences) => {
        actualCarPreferences = updatedCarPreferences;
      });

    expect(actualCarPreferences).toStrictEqual(testCarPreferences);
  });

  it('should update the car', () => {
    let actualCar: Car;

    service.updateCar(testCar);

    service.car$
      .pipe(first())
      .subscribe((updatedCar) => {
        actualCar = updatedCar;
      });

    expect(actualCar).toStrictEqual(testCar);
  });

  it('should get the current reservation details', () => {
    const actualReservationDetails = service.getReservationDetails();

    expect(actualReservationDetails).toBe(null);
  });

  it('should update the reservation details', () => {
    let actualReservationDetails: ReservationDetails;

    service.updateDetails(testReservationDetails);

    service.details$
      .pipe(first())
      .subscribe((updatedReservationDetails) => {
        actualReservationDetails = updatedReservationDetails;
      });

    expect(actualReservationDetails).toStrictEqual(testReservationDetails);
  });

  it('should update the invalid same day reservation', () => {
    let actualInvalidSameDayReservation: boolean;
    const invalidSameDayReservation = true;

    service.updateInvalidSameDayReservation(invalidSameDayReservation);

    service.invalidSameDayReservation$
      .pipe(first())
      .subscribe((updatedInvalidSameDayReservation) => {
        actualInvalidSameDayReservation = updatedInvalidSameDayReservation;
      });

    expect(actualInvalidSameDayReservation).toStrictEqual(invalidSameDayReservation);
  });

  it('should reset the source values to the default ones', () => {
    let actualCarAccessories: CarAccessory[];
    let actualCar: Car;
    let actualDetails: ReservationDetails;
    let actualCarPreferences: CarPreferences;
    let actualInvalidSameDayReservation: boolean;

    service.resetSourceValues();

    service.carAccessories$
      .pipe(first())
      .subscribe((updatedCarAccessories) => {
        actualCarAccessories = updatedCarAccessories;
      });

    service.car$
      .pipe(first())
      .subscribe((updatedCar) => {
        actualCar = updatedCar;
      });

    service.details$
      .pipe(first())
      .subscribe((updatedDetails) => {
        actualDetails = updatedDetails;
      });

    service.carPreferences$
      .pipe(first())
      .subscribe((updatedCarPreferences) => {
        actualCarPreferences = updatedCarPreferences;
      });

    service.invalidSameDayReservation$
      .pipe(first())
      .subscribe((updatedInvalidSameDayReservation) => {
        actualInvalidSameDayReservation = updatedInvalidSameDayReservation;
      });

    expect(actualCarAccessories).toStrictEqual([]);
    expect(actualCar).toStrictEqual(null);
    expect(actualDetails).toStrictEqual(null);
    expect(actualCarPreferences).toStrictEqual(testCarPreferences);
    expect(actualInvalidSameDayReservation).toStrictEqual(false);
  });

  it('should reset the source values based on an reservation', () => {
    const reservation: Reservation = {
      id:               1,
      details:          testReservationDetails,
      car:              testCar,
      carPreferences:   testCarPreferences,
      accessories:      testAccessories,
      additionalCharge: 25,
      status:           ReservationStatus.PLANNED
    };

    let actualCarAccessories: CarAccessory[];
    let actualCar: Car;
    let actualDetails: ReservationDetails;
    let actualCarPreferences: CarPreferences;
    let actualInvalidSameDayReservation: boolean;

    service.resetSourceValues(reservation);

    service.carAccessories$
      .pipe(first())
      .subscribe((updatedCarAccessories) => {
        actualCarAccessories = updatedCarAccessories;
      });

    service.car$
      .pipe(first())
      .subscribe((updatedCar) => {
        actualCar = updatedCar;
      });

    service.details$
      .pipe(first())
      .subscribe((updatedDetails) => {
        actualDetails = updatedDetails;
      });

    service.carPreferences$
      .pipe(first())
      .subscribe((updatedCarPreferences) => {
        actualCarPreferences = updatedCarPreferences;
      });

    service.invalidSameDayReservation$
      .pipe(first())
      .subscribe((updatedInvalidSameDayReservation) => {
        actualInvalidSameDayReservation = updatedInvalidSameDayReservation;
      });

    expect(actualCarAccessories).toStrictEqual(reservation.accessories);
    expect(actualCar).toStrictEqual(reservation.car);
    expect(actualDetails).toStrictEqual(reservation.details);
    expect(actualCarPreferences).toStrictEqual(reservation.carPreferences);
    expect(actualInvalidSameDayReservation).toStrictEqual(false);
  });

  it('should create the reservation', () => {
    const reservationAPICreateReservationSpy = jest.spyOn(mockReservationAPI, 'createReservation');
    service.createReservation();

    expect(reservationAPICreateReservationSpy).toHaveBeenCalledTimes(1);
  });

  it('should update the reservation', () => {
    const reservationAPIUpdateReservationSpy = jest.spyOn(mockReservationAPI, 'updateReservation');
    service.updateReservation(1);

    expect(reservationAPIUpdateReservationSpy).toHaveBeenCalledTimes(1);
  });
});
