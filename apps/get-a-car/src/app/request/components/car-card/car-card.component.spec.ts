import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MockPipe, MockProvider } from 'ng-mocks';
import { EMPTY, of } from 'rxjs';
import { DriveSystem } from '@guilhermeSousa1/core/data-models';
import { CarCardComponent } from '@guilhermeSousa1/request/components/car-card/car-card.component';
import { ReservationService } from '@guilhermeSousa1/core/services/reservation/reservation.service';
import { CarNamePipe } from '@guilhermeSousa1/shared/pipes/car-name/car-name.pipe';
import { testCar, testReservationDetails } from '@guilhermeSousa1/core/test-utils';

describe('CarCardComponent', () => {
  let component: CarCardComponent;
  let fixture: ComponentFixture<CarCardComponent>;
  let debugElement: DebugElement;
  let mockTransform;

  beforeEach(() => {
    mockTransform = jest.fn();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule,
        MatButtonModule
      ],
      declarations: [
        CarCardComponent,
        MockPipe(CarNamePipe, mockTransform)
      ],
      providers: [
        MockProvider(ReservationService, {
          details$:                   EMPTY,
          invalidSameDayReservation$: EMPTY
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCardComponent);
    component = fixture.componentInstance;
    component.car = testCar;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show car details', () => {
    const carName = debugElement.query(By.css('[data-testid="car-name"]')).nativeElement;
    const carImage = debugElement.query(By.css(`.bg-${ testCar.brand }-${ testCar.model }`)).nativeElement;
    const carSeats = debugElement.query(By.css('[data-testid="car-seats"]')).nativeElement;
    const carDriveSystemIcon = debugElement.query(By.css('[data-testid="car-drive-system-icon"]')).nativeElement;
    const carDriveSystem = debugElement.query(By.css('[data-testid="car-drive-system"]')).nativeElement;
    const carFuelMileage = debugElement.query(By.css('[data-testid="car-fuel-mileage"]')).nativeElement;

    expect(carName).toBeTruthy();
    expect(mockTransform).toHaveBeenCalled();
    expect(carImage).toBeTruthy();
    expect(carSeats.textContent).toBe(`${ testCar.seats } seats`);
    expect(carDriveSystemIcon.textContent.trim()).toBe(`${ testCar.driveSystem === DriveSystem.AWD ? 'terrain' : 'apartment' }`);
    expect(carDriveSystem.textContent).toBe(`${ testCar.driveSystem }`);
    expect(carFuelMileage.textContent).toBe(`${ testCar.fuelMileage } MPG`);
  });

  describe('invalid form', () => {
    beforeEach(() => {
      component.reservationDetails$ = of(null);
      component.invalidSameDayReservation$ = of(true);
      fixture.detectChanges();
    });

    it('should disable the book button', () => {
      const bookButton = debugElement.query(By.css('[data-testid="book-button"]')).nativeElement;

      expect(bookButton.disabled).toBeTruthy();
    });

    it('should show invalid same day reservation message', () => {
      const invalidSameDayReservationMessage = debugElement.query(By.css('[data-testid="invalid-same-day-reservation-message"]'));
      const accessoriesMessage = debugElement.query(By.css('[data-testid="accessories-message"]'));

      expect(invalidSameDayReservationMessage).toBeTruthy();
      expect(accessoriesMessage).toBeFalsy();
    });
  });

  describe('valid form', () => {
    beforeEach(() => {
      component.reservationDetails$ = of(testReservationDetails);
      component.invalidSameDayReservation$ = of(false);
      fixture.detectChanges();
    });

    it('should emit on clicking the book button', () => {
      const requestCarSpy = jest.spyOn(component.requestCar, 'emit');
      const bookButton = debugElement.query(By.css('[data-testid="book-button"]')).nativeElement;

      bookButton.click();
      fixture.detectChanges();

      expect(requestCarSpy).toHaveBeenCalledTimes(1);
    });

    it('should show invalid same day reservation message', () => {
      const invalidSameDayReservationMessage = debugElement.query(By.css('[data-testid="invalid-same-day-reservation-message"]'));
      const accessoriesMessage = debugElement.query(By.css('[data-testid="accessories-message"]'));

      expect(invalidSameDayReservationMessage).toBeFalsy();
      expect(accessoriesMessage).toBeTruthy();
    });
  });
});
