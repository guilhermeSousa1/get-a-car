import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CarAccessory } from '@guilhermeSousa1/shared/data-models';
import { CarBannerComponent } from '@guilhermeSousa1/my-trips/components/car-banner/car-banner.component';

describe('CarBannerComponent', () => {
  let component: CarBannerComponent;
  let fixture: ComponentFixture<CarBannerComponent>;
  let debugElement: DebugElement;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCheckboxModule
      ],
      declarations: [
        CarBannerComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarBannerComponent);
    component = fixture.componentInstance;
    // component.car = accessoryHelper;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
