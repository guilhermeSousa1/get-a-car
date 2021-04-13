import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationDetailsFormComponent } from '@guilhermeSousa1/request/components/reservation-details/reservation-details-form/reservation-details-form.component';

describe('ReservationDetailsComponent', () => {
  let component: ReservationDetailsFormComponent;
  let fixture: ComponentFixture<ReservationDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationDetailsFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
