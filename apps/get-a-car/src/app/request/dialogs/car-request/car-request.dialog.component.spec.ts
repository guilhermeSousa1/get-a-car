import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EMPTY } from 'rxjs';
import { MockComponent, MockProvider } from 'ng-mocks';
import { Car, DriveSystem, ReservationDetails } from '@guilhermeSousa1/shared/data-models';
import { CarAccessoryComponent } from '@guilhermeSousa1/shared/components';
import { DataService } from '@guilhermeSousa1/core/services/data/data.service';
import { DateService } from '@guilhermeSousa1/core/services/date/date.service';
import { CarRequestDialogComponent } from '@guilhermeSousa1/request/dialogs/car-request/car-request.dialog.component';

import defaultAccessories from 'src/assets/data/accessories.json';


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

  const reservationDataHelper: ReservationDetails = {
    address:     'John Doe Street',
    startDate:   dateService.formatDateToTimestamp(dateService.getTodayDate()),
    endDate:     dateService.formatDateToTimestamp(dateService.getTomorrowDate()),
    drivingDays: 2
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatButtonModule,
        HttpClientTestingModule
      ],
      declarations: [
        CarRequestDialogComponent,
        MockComponent(CarAccessoryComponent)
      ],
      providers: [
        MockProvider(DataService, {
          getAccessories: () => EMPTY
        }),
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
    const accessory = defaultAccessories[0];

    component.toggleAccessory(accessory);

    expect(component.additionalCharge).toBe(originalAdditionalCharge + accessory.price);
  });
});
