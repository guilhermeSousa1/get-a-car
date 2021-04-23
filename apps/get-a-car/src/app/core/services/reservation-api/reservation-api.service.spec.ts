import { TestBed } from '@angular/core/testing';
import { ReservationAPI } from '@guilhermeSousa1/core/services/reservation-api/reservation-api.service';

describe('ReservationAPIService', () => {
  let service: ReservationAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
