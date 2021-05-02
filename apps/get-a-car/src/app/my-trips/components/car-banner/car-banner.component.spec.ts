import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatRadioModule } from '@angular/material/radio';
import { EMPTY, of } from 'rxjs';
import { MockPipe, MockProvider } from 'ng-mocks';
import { CarBannerComponent } from '@guilhermeSousa1/my-trips/components/car-banner/car-banner.component';
import { ReservationService } from '@guilhermeSousa1/core/services/reservation/reservation.service';
import { CarNamePipe } from '@guilhermeSousa1/shared/pipes/car-name/car-name.pipe';
import { testCar, testReservationDetails } from '@guilhermeSousa1/core/test-utils';

describe('CarBannerComponent', () => {
  let component: CarBannerComponent;
  let fixture: ComponentFixture<CarBannerComponent>;
  let debugElement: DebugElement;

  const mockUpdateCar = jest.fn();
  const mockTransform = jest.fn();

  beforeEach(async () => {
    jest.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [
        MatRadioModule
      ],
      declarations: [
        CarBannerComponent,
        MockPipe(CarNamePipe, mockTransform)
      ],
      providers: [
        MockProvider(ReservationService, {
          details$:                   of(testReservationDetails),
          invalidSameDayReservation$: EMPTY,
          car$:                       EMPTY,
          updateCar:                  mockUpdateCar
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarBannerComponent);
    component = fixture.componentInstance;
    component.car = testCar;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show car details', () => {
    const carName = debugElement.query(By.css(`[data-testid="car-name"]`)).nativeElement;
    const carImage = debugElement.query(By.css(`.bg-${ testCar.brand }-${ testCar.model }`)).nativeElement;

    expect(mockTransform).toHaveBeenCalled();
    expect(carName).toBeTruthy();
    expect(carImage).toBeTruthy();
  });

  it('should call updateCar method on radio button change', () => {
    const radioButton = debugElement.query(By.css('[data-testid="radio-button"]')).nativeElement;

    radioButton.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(mockUpdateCar).toHaveBeenCalledTimes(1);
  });

  it('should check radio button', () => {
    const radioButton = debugElement.query(By.css('[data-testid="radio-button"]'));

    component.isCarSelected$ = of(true);
    fixture.detectChanges();

    expect(radioButton.classes['mat-radio-checked']).toBeTruthy();
  });

  it('should disable the radio button', () => {
    const radioButton = debugElement.query(By.css('[data-testid="radio-button"]'));

    component.reservationDetails$ = of(null);
    fixture.detectChanges();

    expect(radioButton.classes['mat-radio-disabled']).toBeTruthy();
  });

  it('should show invalid same day reservation message and hide available message', () => {
    const invalidSameDayReservationMessage = debugElement.query(By.css('[data-testid="invalid-same-day-reservation-message"]')).nativeElement;
    const availableMessage = debugElement.query(By.css('[data-testid="available-message"]'));

    component.invalidSameDayReservation$ = of(true);
    fixture.detectChanges();

    expect(invalidSameDayReservationMessage).toBeTruthy();
    expect(availableMessage).toBeFalsy();
  });
});
