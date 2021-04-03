import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { DatePipe } from '@angular/common';
import { By } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MockComponent, MockProvider } from 'ng-mocks';
import { CarRequestDialogComponent } from '@guilhermeSousa1/request/dialogs/car-request/car-request.dialog.component';
import { CarAccessoryComponent } from '@guilhermeSousa1/request/components/car-accessory/car-accessory.component';
import { Car, DriveSystem, ReservationData } from '@guilhermeSousa1/shared/data-models';
import { DateService } from '@guilhermeSousa1/core/services/date.service';

describe('CarRequestComponent', () => {
  let component: CarRequestDialogComponent;
  let fixture: ComponentFixture<CarRequestDialogComponent>;
  let debugElement: DebugElement;
  const dateService = new DateService();

  const carHelper: Car = {
    brand:       'toyota',
    model:       'prius',
    seats:       5,
    driveSystem: DriveSystem.FWD,
    fuelMileage: 45
  };

  const reservationDataHelper: ReservationData = {
    address:        'John Doe Street',
    startDate:      dateService.getTodayDate(),
    endDate:        dateService.getTomorrowDate(),
    drivingDays:    2,
    deliveryTime:   10,
    collectionTime: 20,
    carPreferences: null,
    accessories:    null
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatButtonModule
      ],
      declarations: [
        CarRequestDialogComponent,
        MockComponent(CarAccessoryComponent)
      ],
      providers: [
        MockProvider(MatDialogRef),
        MockProvider(MAT_DIALOG_DATA, {
          car:             carHelper,
          reservationData: reservationDataHelper
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
    const carBrandAndModel = debugElement.query(By.css('[data-testid="car-brand-model"]')).nativeElement;

    expect(carImage).toBeTruthy();
    expect(carBrandAndModel.textContent.trim()).toBe(`${ carHelper.brand } ${ carHelper.model }`);
  });

  it('should display reservation details', () => {
    const datePipe = new DatePipe('en');

    const reservationStartDate = debugElement.query(By.css('[data-testid="reservation-start-date"]')).nativeElement;
    const reservationEndDate = debugElement.query(By.css('[data-testid="reservation-end-date"]')).nativeElement;
    const reservationAddress = debugElement.query(By.css('[data-testid="reservation-address"]')).nativeElement;
    const reservationDrivingDays = debugElement.query(By.css('[data-testid="reservation-driving-days"]')).nativeElement;

    expect(reservationStartDate.textContent.trim()).toBe(datePipe.transform(reservationDataHelper.startDate, 'EEEE, MMMM d, y'));
    expect(reservationEndDate.textContent.trim()).toBe(datePipe.transform(reservationDataHelper.endDate, 'EEEE, MMMM d, y'));
    expect(reservationAddress.textContent.trim()).toBe(reservationDataHelper.address);
    expect(reservationDrivingDays.textContent.trim()).toBe(reservationDataHelper.drivingDays.toString());
  });

  it('should increase the additional charge', () => {
    const originalAdditionalCharge = component.additionalCharge;
    const accessory = component.defaultAccessories[0];

    component.toggleAccessory(accessory);

    expect(component.additionalCharge).toBe(originalAdditionalCharge + accessory.price);
  });
});
