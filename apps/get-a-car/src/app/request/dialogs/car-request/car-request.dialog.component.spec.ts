import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MockComponent, MockProvider } from 'ng-mocks';
import { CarRequestDialogComponent } from '@guilhermeSousa1/request/dialogs/car-request/car-request.dialog.component';
import { CarAccessoryComponent } from '@guilhermeSousa1/request/components/car-accessory/car-accessory.component';
import { Car, DriveSystem, ReservationData } from '@guilhermeSousa1/shared/data-models';
import { DateService } from '@guilhermeSousa1/core/services/date.service';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

describe('CarRequestComponent', () => {
  let component: CarRequestDialogComponent;
  let fixture: ComponentFixture<CarRequestDialogComponent>;
  const dateService = new DateService();

  const mockCar: Car = {
    brand:       'toyota',
    model:       'prius',
    seats:       5,
    driveSystem: DriveSystem.FWD,
    fuelMileage: 45
  };

  const mockReservationData: ReservationData = {
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
          car:             mockCar,
          reservationData: mockReservationData
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display car details', () => {
    const carImage = fixture.debugElement.query(By.css(`.bg-${ component.dialogData.car.brand }-${ component.dialogData.car.model }`));
    const carBrandAndModel = fixture.debugElement.query(By.css('[data-testid="car-brand-model"'));

    expect(carImage).toBeTruthy();
    expect(carBrandAndModel.nativeElement.textContent).toBe(`${ mockCar.brand } ${ mockCar.model }`.trim());
  });

  it('should display reservation details', () => {
    const datePipe = new DatePipe('en');

    const reservationStartDate = fixture.debugElement.query(By.css('[data-testid="reservation-start-date"'));
    const reservationEndDate = fixture.debugElement.query(By.css('[data-testid="reservation-end-date"'));
    const reservationAddress = fixture.debugElement.query(By.css('[data-testid="reservation-address"'));
    const reservationDrivingDays = fixture.debugElement.query(By.css('[data-testid="reservation-driving-days"'));

    expect(reservationStartDate.nativeElement.textContent.trim()).toBe(datePipe.transform(mockReservationData.startDate, 'EEEE, MMMM d, y'));
    expect(reservationEndDate.nativeElement.textContent.trim()).toBe(datePipe.transform(mockReservationData.endDate, 'EEEE, MMMM d, y'));
    expect(reservationAddress.nativeElement.textContent.trim()).toBe(mockReservationData.address);
    expect(reservationDrivingDays.nativeElement.textContent.trim()).toBe(mockReservationData.drivingDays.toString());
  });

  it('should increase the additional charge', () => {
    const originalAdditionalCharge = component.additionalCharge;
    const accessory = component.defaultAccessories[0];

    component.toggleAccessory(accessory);

    expect(component.additionalCharge).toBe(originalAdditionalCharge + accessory.price);
  });
});
