import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CarAccessory } from '@guilhermeSousa1/shared/data-models';
import { CarAccessoryComponent } from './car-accessory.component';

describe('CarAccessoryComponent', () => {
  let component: CarAccessoryComponent;
  let fixture: ComponentFixture<CarAccessoryComponent>;

  const mockAccessory: CarAccessory = {
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
    component.accessory = mockAccessory;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show name and price of the accessory', () => {
    const accessoryName = fixture.debugElement.query(By.css('[data-testid="accessory-name"]'));
    const accessoryPrice = fixture.debugElement.query(By.css('[data-testid="accessory-price"]'));

    expect(accessoryName.nativeElement.textContent).toBe(mockAccessory.name);
    expect(accessoryPrice.nativeElement.textContent).toBe(`Price: $${ mockAccessory.price }`);
  });

  it('should emit accessory on toggling checkbox', () => {
    const checkbox = fixture.debugElement.query(By.css('.mat-checkbox-input'));
    let emittedAccessory: CarAccessory;

    component.toggleAccessory.subscribe((accessory) => {
      emittedAccessory = accessory;
    });

    checkbox.nativeElement.click();

    expect(emittedAccessory).toBe(mockAccessory);
  });
});
