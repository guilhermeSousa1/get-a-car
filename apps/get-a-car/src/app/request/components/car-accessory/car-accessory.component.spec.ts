import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAccessoryComponent } from './car-accessory.component';

describe('CarAccessoryComponent', () => {
  let component: CarAccessoryComponent;
  let fixture: ComponentFixture<CarAccessoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarAccessoryComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarAccessoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
