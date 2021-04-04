import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MockService } from 'ng-mocks';
import { Car, DriveSystem } from '@guilhermeSousa1/shared/data-models';
import { CarCardComponent } from '@guilhermeSousa1/request/components';

describe('CarCardComponent', () => {
  let component: CarCardComponent;
  let fixture: ComponentFixture<CarCardComponent>;
  let debugElement: DebugElement;

  const carHelper: Car = {
    brand:       'toyota',
    model:       'prius',
    seats:       5,
    driveSystem: DriveSystem.FWD,
    fuelMileage: 45
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule
      ],
      declarations: [
        CarCardComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCardComponent);
    component = fixture.componentInstance;
    component.car = carHelper;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show car details', () => {
    const carBrandAndModel = debugElement.query(By.css('[data-testid="car-brand-model"]')).nativeElement;
    const carImage = debugElement.query(By.css(`.bg-${ carHelper.brand }-${ carHelper.model }`)).nativeElement;
    const carSeats = debugElement.query(By.css('[data-testid="car-seats"]')).nativeElement;
    const carDriveSystemIcon = debugElement.query(By.css('[data-testid="car-drive-system-icon"]')).nativeElement;
    const carDriveSystem = debugElement.query(By.css('[data-testid="car-drive-system"]')).nativeElement;
    const carFuelMileage = debugElement.query(By.css('[data-testid="car-fuel-mileage"]')).nativeElement;

    expect(carBrandAndModel.textContent.trim()).toBe(`${ carHelper.brand } ${ carHelper.model }`);
    expect(carImage).toBeTruthy();
    expect(carSeats.textContent).toBe(`${ carHelper.seats } seats`);
    expect(carDriveSystemIcon.textContent.trim()).toBe(`${ carHelper.driveSystem === DriveSystem.AWD ? 'terrain' : 'apartment' }`);
    expect(carDriveSystem.textContent).toBe(`${ carHelper.driveSystem }`);
    expect(carFuelMileage.textContent).toBe(`${ carHelper.fuelMileage } MPG`);
  });

  describe('invalid form', () => {
    beforeEach(() => {
      component.form = MockService(FormGroup, {
        invalid: true,
        errors:  {
          invalidSameDayReservation: true
        }
      });
      fixture.detectChanges();
    });

    it('should disable the book button', () => {
      const bookButton = debugElement.query(By.css('[data-testid="book-button"]')).nativeElement;

      expect(bookButton.disabled).toBeTruthy();
    });

    it('should show invalid same day reservation message', () => {
      const invalidSameDayReservationMessage = debugElement.query(By.css('[data-testid="invalid-same-day-reservation-message"]')).nativeElement;
      const accessoriesMessage = debugElement.query(By.css('[data-testid="accessories-message"]'));

      expect(invalidSameDayReservationMessage).toBeTruthy();
      expect(accessoriesMessage).toBeFalsy();
    });
  });

  describe('valid form', () => {
    beforeEach(() => {
      component.form = MockService(FormGroup, {
        invalid: false
      });
      fixture.detectChanges();
    });

    it('should emit on clicking the book button', () => {
      const requestCarSpy = jest.spyOn(component.requestCar, 'emit');
      const bookButton = debugElement.query(By.css('[data-testid="book-button"]')).nativeElement;

      bookButton.click();
      fixture.detectChanges();

      expect(requestCarSpy).toHaveBeenCalledTimes(1);
    });
  });
});
