import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MockProvider } from 'ng-mocks';
import { EMPTY, of } from 'rxjs';
import { CarAccessoryComponent } from '@guilhermeSousa1/shared/components';
import { ReservationService } from '@guilhermeSousa1/core/services/reservation/reservation.service';
import { testAccessories } from '@guilhermeSousa1/core/test-utils';

describe('CarAccessoryComponent', () => {
  let component: CarAccessoryComponent;
  let fixture: ComponentFixture<CarAccessoryComponent>;
  let debugElement: DebugElement;
  let mockUpdateCarAccessories;

  beforeEach(() => {
    mockUpdateCarAccessories = jest.fn();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCheckboxModule
      ],
      declarations: [
        CarAccessoryComponent
      ],
      providers: [
        MockProvider(ReservationService, {
          updateCarAccessories: mockUpdateCarAccessories,
          carAccessories$:      EMPTY
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarAccessoryComponent);
    component = fixture.componentInstance;
    component.accessory = testAccessories[0];
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show name and price of the accessory', () => {
    const accessoryName = debugElement.query(By.css('[data-testid="accessory-name"]')).nativeElement;
    const accessoryPrice = debugElement.query(By.css('[data-testid="accessory-price"]')).nativeElement;

    expect(accessoryName.textContent).toBe(testAccessories[0].name);
    expect(accessoryPrice.textContent).toBe(`Price: $${ testAccessories[0].price }`);
  });

  it('should update car accessories on toggling checkbox', () => {
    const checkbox = debugElement.query(By.css('.mat-checkbox-input')).nativeElement;

    checkbox.click();

    expect(mockUpdateCarAccessories).toHaveBeenCalledTimes(1);
    expect(mockUpdateCarAccessories).toHaveBeenCalledWith([testAccessories[0]]);
  });

  it('should check checkbox', () => {
    const checkbox = debugElement.query(By.css('.mat-checkbox-input')).nativeElement;

    component.isAccessorySelected$ = of(true);
    fixture.detectChanges();

    expect(checkbox.checked).toBeTruthy();
  });
});
