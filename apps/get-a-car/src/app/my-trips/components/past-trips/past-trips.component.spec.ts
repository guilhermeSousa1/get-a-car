import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EMPTY, of } from 'rxjs';
import { MockPipe, MockProvider } from 'ng-mocks';
import { DataService } from '@guilhermeSousa1/core/services/data/data.service';
import { ReservationAPI } from '@guilhermeSousa1/core/services/reservation-api/reservation-api.service';
import { CarNamePipe } from '@guilhermeSousa1/shared/pipes/car-name/car-name.pipe';
import { testReservations } from '@guilhermeSousa1/core/test-utils';
import { TripDetailsDialogComponent } from '@guilhermeSousa1/my-trips/dialogs';
import { PastTripsComponent } from './past-trips.component';

describe('PastTripsComponent', () => {
  let component: PastTripsComponent;
  let fixture: ComponentFixture<PastTripsComponent>;
  let debugElement: DebugElement;
  let mockOpen;
  let mockTransform;

  beforeEach(() => {
    mockTransform = jest.fn();
    mockOpen = jest.fn();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatTableModule,
        MatCardModule,
        MatButtonModule,
        MatPaginatorModule
      ],
      declarations: [
        PastTripsComponent,
        MockPipe(CarNamePipe, mockTransform)
      ],
      providers: [
        MockProvider(BreakpointObserver, {
          observe: () => EMPTY
        }),
        MockProvider(DataService),
        MockProvider(MatDialog, {
          open: mockOpen
        }),
        MockProvider(ReservationAPI, {
          getPastReservations: () => of(testReservations)
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update startSlice and endSlice values', () => {
    const sliceReservationsListSpy = jest.spyOn(component, 'sliceReservationsList');
    const initialStartSlice = component.startSlice;
    const buttonPaginatorNext = debugElement.query(By.css('.mat-paginator-navigation-next'));

    // Use a larger array in order to force pagination
    component.pastReservations$ = of(Array(6).fill(testReservations[0]));
    fixture.detectChanges();
    buttonPaginatorNext.nativeElement.click();

    expect(sliceReservationsListSpy).toHaveBeenCalledTimes(1);
    expect(component.startSlice).toBe(initialStartSlice + 5);
    expect(component.endSlice).toBe(component.startSlice + 5);
  });

  describe('table layout', () => {
    beforeEach(() => {
      component.isLargeScreen$ = of(false);
      fixture.detectChanges();
    });

    it('should render the columns in the correct order', () => {
      const tableHeaderCells = debugElement.nativeElement.querySelectorAll('th');
      const dateCell = tableHeaderCells[0];
      const daysCell = tableHeaderCells[1];
      const carCell = tableHeaderCells[2];
      const extraChargeCell = tableHeaderCells[3];
      const statusCell = tableHeaderCells[4];

      expect(dateCell.className).toContain('mat-column-date');
      expect(daysCell.className).toContain('mat-column-days');
      expect(carCell.className).toContain('mat-column-car');
      expect(extraChargeCell.className).toContain('mat-column-extra-charge');
      expect(statusCell.className).toContain('mat-column-status');
    });

    it('should render the correct header cells title', () => {
      const tableHeaderCells = debugElement.nativeElement.querySelectorAll('th');
      const dateCell = tableHeaderCells[0];
      const daysCell = tableHeaderCells[1];
      const carCell = tableHeaderCells[2];
      const extraChargeCell = tableHeaderCells[3];
      const statusCell = tableHeaderCells[4];

      expect(dateCell.innerHTML).toContain('Date');
      expect(daysCell.innerHTML).toContain('Days');
      expect(carCell.innerHTML).toContain('Car');
      expect(extraChargeCell.innerHTML).toContain('Extra Charge');
      expect(statusCell.innerHTML).toContain('Status');
    });

    it('should render past reservation details', () => {
      const datePipe = new DatePipe('en');

      const firstTableRow = debugElement.nativeElement.querySelector('.mat-row');
      const dateInterval = firstTableRow.querySelector('[data-testid="date-interval"]');
      const weekDaysInterval = firstTableRow.querySelector('[data-testid="week-days-interval"]');
      const drivingDays = firstTableRow.querySelector('[data-testid="driving-days"]');
      const carName = firstTableRow.querySelector('[data-testid="car-name"]');
      const additionalCharge = firstTableRow.querySelector('[data-testid="additional-charge"]');
      const reservationStatus = firstTableRow.querySelector('[data-testid="reservation-status"]');

      expect(dateInterval.textContent.trim()).toBe(
        `${ datePipe.transform(testReservations[0].details.startDate, 'd/M/yy') } - ${ datePipe.transform(testReservations[0].details.endDate, 'd/M/yy') }`
      );
      expect(weekDaysInterval.textContent.trim()).toBe(
        `${ datePipe.transform(testReservations[0].details.startDate, 'EEEE') } - ${ datePipe.transform(testReservations[0].details.endDate, 'EEEE') }`
      );
      expect(drivingDays.textContent.trim()).toBe(testReservations[0].details.drivingDays.toString());
      expect(mockTransform).toHaveBeenCalled();
      expect(carName).toBeTruthy();
      expect(additionalCharge.textContent.trim()).toBe(`$${ testReservations[0].additionalCharge.toString() }`);
      expect(reservationStatus.textContent.trim()).toBe(testReservations[0].status.toString());
    });

    it('should open the TripDetailsDialogComponent', () => {
      const firstTableRow = debugElement.nativeElement.querySelector('.mat-row');

      firstTableRow.click();

      expect(mockOpen).toHaveBeenCalledTimes(1);
      expect(mockOpen).toHaveBeenCalledWith(TripDetailsDialogComponent, expect.anything());
    });
  });

  describe('cards layout', () => {
    beforeEach(() => {
      component.isLargeScreen$ = of(true);
      fixture.detectChanges();
    });

    it('should render past reservation details', () => {
      const datePipe = new DatePipe('en');

      const firstCard = debugElement.query(By.css('mat-card'));
      const dateInterval = firstCard.query(By.css('[data-testid="date-interval"]'));
      const weekDaysInterval = firstCard.query(By.css('[data-testid="week-days-interval"]'));
      const drivingDays = firstCard.query(By.css('[data-testid="driving-days"]'));
      const carName = firstCard.query(By.css('[data-testid="car-name"]'));
      const additionalCharge = firstCard.query(By.css('[data-testid="additional-charge"]'));
      const reservationStatus = firstCard.query(By.css('[data-testid="reservation-status"]'));

      expect(dateInterval.nativeElement.textContent.trim()).toBe(
        `${ datePipe.transform(testReservations[0].details.startDate, 'd/M/yy') } - ${ datePipe.transform(testReservations[0].details.endDate, 'd/M/yy') }`
      );
      expect(weekDaysInterval.nativeElement.textContent.trim()).toBe(
        `${ datePipe.transform(testReservations[0].details.startDate, 'EEEE') } - ${ datePipe.transform(testReservations[0].details.endDate, 'EEEE') }`
      );
      expect(drivingDays.nativeElement.textContent.trim()).toBe(`Days: ${ testReservations[0].details.drivingDays.toString() }`);
      expect(mockTransform).toHaveBeenCalled();
      expect(carName).toBeTruthy();
      expect(additionalCharge.nativeElement.textContent.trim()).toBe(`Extra Charge: $${ testReservations[0].additionalCharge.toString() }`);
      expect(reservationStatus.nativeElement.textContent.trim()).toBe(`Status: ${ testReservations[0].status.toString() }`);
    });

    it('should open the TripDetailsDialogComponent', () => {
      const firstCard = debugElement.query(By.css('mat-card'));
      const detailsButton = firstCard.query(By.css('[data-testid="details-button"]'));

      detailsButton.nativeElement.click();

      expect(mockOpen).toHaveBeenCalledTimes(1);
      expect(mockOpen).toHaveBeenCalledWith(TripDetailsDialogComponent, expect.anything());
    });
  });
});
