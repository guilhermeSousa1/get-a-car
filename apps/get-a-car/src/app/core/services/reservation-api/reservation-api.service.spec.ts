import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { first } from 'rxjs/operators';
import { ReservationAPI } from '@guilhermeSousa1/core/services/reservation-api/reservation-api.service';
import { Reservation, ReservationStatus } from '@guilhermeSousa1/shared/data-models';
import { testReservations } from '@guilhermeSousa1/shared/test-utils';

describe('ReservationAPIService', () => {
  let service: ReservationAPI;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ReservationAPI
      ]
    });
    service = TestBed.inject(ReservationAPI);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the past reservations', () => {
    const expectedUrl = 'api/reservations';
    let actualPastReservations: Reservation[] | undefined;

    service.getPastReservations()
      .pipe(first())
      .subscribe((pastReservations) => {
        actualPastReservations = pastReservations;
      });

    const request = controller.expectOne({ method: 'GET', url: expectedUrl });
    request.flush(testReservations);
    controller.verify();

    expect(actualPastReservations).toEqual([testReservations[1]]);
  });

  it('should get the planned reservations', () => {
    const expectedUrl = 'api/reservations';
    let actualPlannedReservations: Reservation[] | undefined;

    service.getPlannedReservations()
      .pipe(first())
      .subscribe((plannedReservations) => {
        actualPlannedReservations = plannedReservations;
      });

    const request = controller.expectOne({ method: 'GET', url: expectedUrl });
    request.flush(testReservations);
    controller.verify();

    expect(actualPlannedReservations).toEqual([testReservations[0]]);
  });

  it('should create the reservation', () => {
    const expectedUrl = 'api/reservations';
    let actualCreatedReservation: Reservation | undefined;

    service.createReservation(testReservations[0])
      .pipe(first())
      .subscribe((reservation) => {
        actualCreatedReservation = reservation;
      });

    const request = controller.expectOne({ method: 'POST', url: expectedUrl });
    request.flush(testReservations[0]);
    controller.verify();

    expect(request.request.body).toEqual(testReservations[0]);
    expect(actualCreatedReservation).toEqual(testReservations[0]);
  });

  it('should update the reservation', () => {
    const expectedUrl = 'api/reservations';
    let actualUpdatedReservation: Reservation | undefined;

    service.updateReservation(testReservations[0])
      .pipe(first())
      .subscribe((reservation) => {
        actualUpdatedReservation = reservation;
      });

    const request = controller.expectOne({ method: 'PUT', url: expectedUrl });
    request.flush(testReservations[0]);
    controller.verify();

    expect(request.request.body).toEqual(testReservations[0]);
    expect(actualUpdatedReservation).toEqual(testReservations[0]);
  });

  it('should cancel the reservation', () => {
    const expectedUrl = 'api/reservations';
    let actualCancelledReservation: Reservation | undefined;

    service.cancelReservation(testReservations[0])
      .pipe(first())
      .subscribe((reservation) => {
        actualCancelledReservation = reservation;
      });

    const request = controller.expectOne({ method: 'PUT', url: expectedUrl });
    request.flush({ ...testReservations[0], status: ReservationStatus.CANCELLED });
    controller.verify();

    expect(request.request.body).toEqual({ ...testReservations[0], status: ReservationStatus.CANCELLED });
    expect(actualCancelledReservation).toEqual({ ...testReservations[0], status: ReservationStatus.CANCELLED });
  });
});
