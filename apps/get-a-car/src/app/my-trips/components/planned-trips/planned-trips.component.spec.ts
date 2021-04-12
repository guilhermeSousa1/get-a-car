import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlannedTripsComponent } from '@guilhermeSousa1/my-trips/components/planned-trips/planned-trips.component';

describe('PastTripsComponent', () => {
  let component: PlannedTripsComponent;
  let fixture: ComponentFixture<PlannedTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlannedTripsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
