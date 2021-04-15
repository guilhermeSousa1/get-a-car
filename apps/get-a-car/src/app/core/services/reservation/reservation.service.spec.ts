import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReservationService } from '@guilhermeSousa1/core/services/reservation/reservation.service';

describe('ReservationService', () => {
  let service: ReservationService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ReservationService
      ]
    });
    service = TestBed.inject(ReservationService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
