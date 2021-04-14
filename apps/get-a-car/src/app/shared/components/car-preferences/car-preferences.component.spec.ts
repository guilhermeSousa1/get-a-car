import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarPreferencesComponent } from '@guilhermeSousa1/shared/components';

describe('CarPreferencesComponent', () => {
  let component: CarPreferencesComponent;
  let fixture: ComponentFixture<CarPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarPreferencesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
