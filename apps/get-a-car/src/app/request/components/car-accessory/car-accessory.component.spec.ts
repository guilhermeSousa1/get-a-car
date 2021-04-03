import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { first } from 'rxjs/operators';
import { CarAccessory } from '@guilhermeSousa1/shared/data-models';
import { CarAccessoryComponent } from './car-accessory.component';

describe('CarAccessoryComponent', () => {
  let component: CarAccessoryComponent;
  let fixture: ComponentFixture<CarAccessoryComponent>;
  let debugElement: DebugElement;

  const accessoryHelper: CarAccessory = {
    name:  'Dog seat hammock',
    price: 10,
    id:    1
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCheckboxModule
      ],
      declarations: [
        CarAccessoryComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarAccessoryComponent);
    component = fixture.componentInstance;
    component.accessory = accessoryHelper;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show name and price of the accessory', () => {
    const accessoryName = debugElement.query(By.css('[data-testid="accessory-name"]')).nativeElement;
    const accessoryPrice = debugElement.query(By.css('[data-testid="accessory-price"]')).nativeElement;

    expect(accessoryName.textContent).toBe(accessoryHelper.name);
    expect(accessoryPrice.textContent).toBe(`Price: $${ accessoryHelper.price }`);
  });

  it('should emit accessory on toggling checkbox', () => {
    const checkbox = debugElement.query(By.css('.mat-checkbox-input')).nativeElement;
    let emittedAccessory: CarAccessory;

    component.toggleAccessory
      .pipe(first())
      .subscribe((accessory) => {
        emittedAccessory = accessory;
      });

    checkbox.click();

    expect(emittedAccessory).toBe(accessoryHelper);
  });
});
