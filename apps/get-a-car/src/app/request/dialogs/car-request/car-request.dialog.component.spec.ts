import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EMPTY, of } from 'rxjs';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { CarAccessoryComponent } from '@guilhermeSousa1/shared/components';
import { DataService } from '@guilhermeSousa1/core/services/data/data.service';
import { CarRequestDialogComponent } from '@guilhermeSousa1/request/dialogs/car-request/car-request.dialog.component';
import { CarNamePipe } from '@guilhermeSousa1/shared/pipes/car-name/car-name.pipe';
import { AdditionalChargePipe } from '@guilhermeSousa1/shared/pipes/additional-charge/additional-charge.pipe';
import { ReservationService } from '@guilhermeSousa1/core/services/reservation/reservation.service';
import { testCar, testReservationDetails } from '@guilhermeSousa1/core/test-utils';

describe('CarRequestComponent', () => {
  let component: CarRequestDialogComponent;
  let fixture: ComponentFixture<CarRequestDialogComponent>;
  let debugElement: DebugElement;
  let mockTransformCarName;
  let mockTransformAdditionalCharge;
  let mockClose;

  beforeEach(() => {
    mockTransformCarName = jest.fn();
    mockTransformAdditionalCharge = jest.fn();
    mockClose = jest.fn();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatButtonModule,
        HttpClientTestingModule
      ],
      declarations: [
        CarRequestDialogComponent,
        MockComponent(CarAccessoryComponent),
        MockPipe(CarNamePipe, mockTransformCarName),
        MockPipe(AdditionalChargePipe, mockTransformAdditionalCharge)
      ],
      providers: [
        MockProvider(MAT_DIALOG_DATA, {
          car: testCar
        }),
        MockProvider(DataService, {
          getAccessories: () => EMPTY
        }),
        MockProvider(MatDialogRef, {
          close: mockClose
        }),
        MockProvider(ReservationService, {
          details$:        of(testReservationDetails),
          carAccessories$: EMPTY
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display car details', () => {
    const carImage = debugElement.query(By.css(`.bg-${ component.dialogData.car.brand }-${ component.dialogData.car.model }`)).nativeElement;
    const carName = debugElement.query(By.css('[data-testid="car-name"]')).nativeElement;

    expect(carImage).toBeTruthy();
    expect(carName).toBeTruthy();
    expect(mockTransformCarName).toHaveBeenCalled();
  });

  it('should display reservation details', () => {
    const datePipe = new DatePipe('en');

    const reservationStartDate = debugElement.query(By.css('[data-testid="reservation-start-date"]')).nativeElement;
    const reservationEndDate = debugElement.query(By.css('[data-testid="reservation-end-date"]')).nativeElement;
    const reservationAddress = debugElement.query(By.css('[data-testid="reservation-address"]')).nativeElement;
    const reservationDrivingDays = debugElement.query(By.css('[data-testid="reservation-driving-days"]')).nativeElement;

    expect(reservationStartDate.textContent.trim()).toBe(datePipe.transform(testReservationDetails.startDate, 'EEEE, MMMM d, y'));
    expect(reservationEndDate.textContent.trim()).toBe(datePipe.transform(testReservationDetails.endDate, 'EEEE, MMMM d, y'));
    expect(reservationAddress.textContent.trim()).toBe(testReservationDetails.address);
    expect(reservationDrivingDays.textContent.trim()).toBe(testReservationDetails.drivingDays.toString());
  });

  it('should render the additional charge', () => {
    const additionalCharge = debugElement.query(By.css('[data-testid="additional-charge"')).nativeElement;

    expect(additionalCharge).toBeTruthy();
    expect(mockTransformAdditionalCharge).toHaveBeenCalled();
  });

  it('should close dialog with true value on submit button click', () => {
    const confirmButton = debugElement.query(By.css('[data-testid="confirm-button"')).nativeElement;

    confirmButton.click();

    expect(mockClose).toHaveBeenCalledTimes(1);
    expect(mockClose).toHaveBeenCalledWith(true);
  });
});
