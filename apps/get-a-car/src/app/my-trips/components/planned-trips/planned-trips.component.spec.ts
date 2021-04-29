import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EMPTY, of } from 'rxjs';
import { MockPipe, MockProvider } from 'ng-mocks';
import { DataService } from '@guilhermeSousa1/core/services/data/data.service';
import { ReservationAPI } from '@guilhermeSousa1/core/services/reservation-api/reservation-api.service';
import { testReservations } from '@guilhermeSousa1/shared/test-utils';
import { CarNamePipe } from '@guilhermeSousa1/shared/pipes/car-name/car-name.pipe';
import { PlannedTripsComponent } from '@guilhermeSousa1/my-trips/components/planned-trips/planned-trips.component';
import { EditTripDialogComponent } from '@guilhermeSousa1/my-trips/dialogs/edit-trip/edit-trip.dialog.component';

describe('PlannedTripsComponent', () => {
  let component: PlannedTripsComponent;
  let fixture: ComponentFixture<PlannedTripsComponent>;
  let debugElement: DebugElement;
  let mockTransform;
  let mockMatDialog;

  beforeEach(() => {
    mockTransform = jest.fn();
    mockMatDialog = {
      open: jest.fn().mockImplementation(() => ({
        afterClosed: () => of(true)
      }))
    };
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
        PlannedTripsComponent,
        MockPipe(CarNamePipe, mockTransform)
      ],
      providers: [
        MockProvider(BreakpointObserver, {
          observe: () => EMPTY
        }),
        MockProvider(DataService),
        { provide: MatDialog, useValue: mockMatDialog },
        MockProvider(ReservationAPI, {
          getPlannedReservations: () => of(testReservations)
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedTripsComponent);
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
    component.plannedReservations$ = of(Array(6).fill(testReservations[0]));
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

      expect(dateCell.className).toContain('mat-column-date');
      expect(daysCell.className).toContain('mat-column-days');
      expect(carCell.className).toContain('mat-column-car');
      expect(extraChargeCell.className).toContain('mat-column-extra-charge');
    });

    it('should render the correct header cells title', () => {
      const tableHeaderCells = debugElement.nativeElement.querySelectorAll('th');
      const dateCell = tableHeaderCells[0];
      const daysCell = tableHeaderCells[1];
      const carCell = tableHeaderCells[2];
      const extraChargeCell = tableHeaderCells[3];

      expect(dateCell.innerHTML).toContain('Date');
      expect(daysCell.innerHTML).toContain('Days');
      expect(carCell.innerHTML).toContain('Car');
      expect(extraChargeCell.innerHTML).toContain('Extra Charge');
    });

    it('should render past reservation details', () => {
      const datePipe = new DatePipe('en');

      const firstTableRow = debugElement.nativeElement.querySelector('.mat-row');
      const dateInterval = firstTableRow.querySelector('[data-testid="date-interval"]');
      const weekDaysInterval = firstTableRow.querySelector('[data-testid="week-days-interval"]');
      const drivingDays = firstTableRow.querySelector('[data-testid="driving-days"]');
      const carName = firstTableRow.querySelector('[data-testid="car-name"]');
      const additionalCharge = firstTableRow.querySelector('[data-testid="additional-charge"]');

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
    });

    it('should open the EditTripDialogComponent', () => {
      const firstTableRow = debugElement.nativeElement.querySelector('.mat-row');

      firstTableRow.click();

      expect(mockMatDialog.open).toHaveBeenCalledTimes(1);
      expect(mockMatDialog.open).toHaveBeenCalledWith(EditTripDialogComponent, expect.anything());
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
    });

    it('should open the EditTripDialogComponent', () => {
      const firstCard = debugElement.query(By.css('mat-card'));
      const editButton = firstCard.query(By.css('[data-testid="edit-button"]'));

      editButton.nativeElement.click();

      expect(mockMatDialog.open).toHaveBeenCalledTimes(1);
      expect(mockMatDialog.open).toHaveBeenCalledWith(EditTripDialogComponent, expect.anything());
    });
  });
});
