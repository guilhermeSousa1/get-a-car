import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MockService } from 'ng-mocks';
import { Car, DriveSystem } from '@guilhermeSousa1/shared/data-models';
import { CarCardComponent } from './car-card.component';

describe('CarCardComponent', () => {
  let component: CarCardComponent;
  let fixture: ComponentFixture<CarCardComponent>;

  const mockCar: Car = {
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
    component.car = mockCar;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show car details', () => {
    const carBrandAndModel = fixture.debugElement.query(By.css('[data-testid="car-brand-model"'));
    const carImage = fixture.debugElement.query(By.css(`.bg-${ component.car.brand }-${ component.car.model }`));
    const carSeats = fixture.debugElement.query(By.css('[data-testid="car-seats"'));
    const carDriveSystemIcon = fixture.debugElement.query(By.css('[data-testid="car-drive-system-icon'));
    const carDriveSystem = fixture.debugElement.query(By.css('[data-testid="car-drive-system'));
    const carFuelMileage = fixture.debugElement.query(By.css('[data-testid="car-fuel-mileage'));

    expect(carBrandAndModel.nativeElement.textContent.trim()).toBe(`${ component.car.brand } ${ component.car.model }`);
    expect(carImage).toBeTruthy();
    expect(carSeats.nativeElement.textContent).toBe(`${ component.car.seats } seats`);
    expect(carDriveSystemIcon.nativeElement.textContent.trim()).toBe(`${ component.car.driveSystem === DriveSystem.AWD ? 'terrain' : 'apartment' }`);
    expect(carDriveSystem.nativeElement.textContent).toBe(`${ component.car.driveSystem }`);
    expect(carFuelMileage.nativeElement.textContent).toBe(`${ component.car.fuelMileage } MPG`);
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
      const bookButton = fixture.debugElement.query(By.css('[data-testid="book-button"'));

      expect(bookButton.nativeElement.disabled).toBeTruthy();
    });

    it('should show invalid same day reservation message', () => {
      const invalidSameDayReservationMessage = fixture.debugElement.query(By.css('[data-testid="invalid-same-day-reservation-message"'));
      const accessoriesMessage = fixture.debugElement.query(By.css('[data-testid="accessories-message"'));

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
      const bookButton = fixture.debugElement.query(By.css('[data-testid="book-button"'));

      bookButton.nativeElement.click();
      fixture.detectChanges();

      expect(requestCarSpy).toHaveBeenCalledTimes(1);
    });
  });
});
