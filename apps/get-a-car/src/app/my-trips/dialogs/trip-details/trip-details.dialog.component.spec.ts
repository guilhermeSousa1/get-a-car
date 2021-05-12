import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { DatePipe } from '@angular/common';
import { By } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MockPipe, MockProvider } from 'ng-mocks';
import { CarNamePipe } from '@guilhermeSousa1/shared/pipes/car-name/car-name.pipe';
import { TripDetailsDialogComponent } from '@guilhermeSousa1/my-trips/dialogs/trip-details/trip-details.dialog.component';
import { testReservations } from '@guilhermeSousa1/core/test-utils';

describe('TripDetailsComponent', () => {
  let component: TripDetailsDialogComponent;
  let fixture: ComponentFixture<TripDetailsDialogComponent>;
  let debugElement: DebugElement;
  const mockTransform = jest.fn();

  beforeEach(async () => {
    jest.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatDividerModule,
        MatButtonModule
      ],
      declarations: [
        TripDetailsDialogComponent,
        MockPipe(CarNamePipe, mockTransform)
      ],
      providers: [
        MockProvider(MAT_DIALOG_DATA, {
          trip: testReservations[0]
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display reservation details', () => {
    const datePipe = new DatePipe('en');

    const startDate = debugElement.query(By.css('[data-testid="start-date"]')).nativeElement;
    const startDayOfWeek = debugElement.query(By.css('[data-testid="start-day-week"]')).nativeElement;
    const startTime = debugElement.query(By.css('[data-testid="start-time"]')).nativeElement;
    const startLocation = debugElement.query(By.css('[data-testid="start-location"]')).nativeElement;
    const endDate = debugElement.query(By.css('[data-testid="end-date"]')).nativeElement;
    const endDayOfWeek = debugElement.query(By.css('[data-testid="end-day-week"]')).nativeElement;
    const endTime = debugElement.query(By.css('[data-testid="end-time"]')).nativeElement;
    const endLocation = debugElement.query(By.css('[data-testid="end-location"]')).nativeElement;
    const carName = debugElement.query(By.css('[data-testid="car-name"]')).nativeElement;
    const accessoriesList = debugElement.query(By.css('[data-testid="accessories"]')).nativeElement;
    const accessoriesListItems = debugElement.queryAll(By.css('[data-testid="accessory-list-item"]'));
    const additionalCharge = debugElement.query(By.css('[data-testid="additional-charge"]')).nativeElement;

    expect(startDate.textContent.trim()).toBe(datePipe.transform(testReservations[0].details.startDate, 'd/M/yy'));
    expect(startDayOfWeek.textContent.trim()).toBe(datePipe.transform(testReservations[0].details.startDate, 'EEEE'));
    expect(startTime.textContent.trim()).toBe(datePipe.transform(testReservations[0].details.startDate, 'hh:mm a'));
    expect(startLocation.textContent.trim()).toBe(testReservations[0].details.address);
    expect(endDate.textContent.trim()).toBe(datePipe.transform(testReservations[0].details.endDate, 'd/M/yy'));
    expect(endDayOfWeek.textContent.trim()).toBe(datePipe.transform(testReservations[0].details.endDate, 'EEEE'));
    expect(endTime.textContent.trim()).toBe(datePipe.transform(testReservations[0].details.endDate, 'hh:mm a'));
    expect(endLocation.textContent.trim()).toBe(testReservations[0].details.address);
    expect(mockTransform).toHaveBeenCalled();
    expect(carName).toBeTruthy();
    expect(accessoriesList).toBeTruthy();
    expect(accessoriesListItems.length).toBe(testReservations[0].accessories.length);
    expect(additionalCharge.textContent.trim()).toBe(`$${ testReservations[0].additionalCharge }`);
  });
});
