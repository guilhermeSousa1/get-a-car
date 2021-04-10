import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripDetailsDialogComponent } from '@guilhermeSousa1/my-trips/dialogs';

describe('TripDetailsComponent', () => {
  let component: TripDetailsDialogComponent;
  let fixture: ComponentFixture<TripDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripDetailsDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
