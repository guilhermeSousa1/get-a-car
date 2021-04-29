import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EMPTY } from 'rxjs';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { CarBannerComponent } from '@guilhermeSousa1/my-trips/components/car-banner/car-banner.component';
import { ReservationService } from '@guilhermeSousa1/core/services/reservation/reservation.service';
import { EditTripDialogComponent } from '@guilhermeSousa1/my-trips/dialogs/edit-trip/edit-trip.dialog.component';
import { CarAccessoryComponent, CarPreferencesComponent, ReservationDetailsFormComponent } from '@guilhermeSousa1/shared/components';
import { DataService } from '@guilhermeSousa1/core/services/data/data.service';
import { ReservationAPI } from '@guilhermeSousa1/core/services/reservation-api/reservation-api.service';
import { AdditionalChargePipe } from '@guilhermeSousa1/shared/pipes/additional-charge/additional-charge.pipe';
import { testReservations } from '@guilhermeSousa1/shared/test-utils';

describe('EditTripDialogComponent', () => {
  let component: EditTripDialogComponent;
  let fixture: ComponentFixture<EditTripDialogComponent>;
  let debugElement: DebugElement;
  let mockTransform;
  let mockUpdateReservation;
  let mockCancelReservation;

  beforeEach(() => {
    mockTransform = jest.fn();
    mockUpdateReservation = jest.fn().mockImplementation(() => EMPTY);
    mockCancelReservation = jest.fn().mockImplementation(() => EMPTY);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatDialogModule,
        MatButtonModule
      ],
      declarations: [
        EditTripDialogComponent,
        MockComponent(ReservationDetailsFormComponent),
        MockComponent(CarPreferencesComponent),
        MockComponent(CarBannerComponent),
        MockComponent(CarAccessoryComponent),
        MockPipe(AdditionalChargePipe, mockTransform)
      ],
      providers: [
        MockProvider(MAT_DIALOG_DATA, { trip: testReservations[0] }),
        MockProvider(DataService, {
          getAccessories: () => EMPTY,
          getCars:        () => EMPTY
        }),
        MockProvider(MatDialogRef),
        MockProvider(ReservationAPI, {
          cancelReservation: mockCancelReservation
        }),
        MockProvider(ReservationService, {
          updateReservation: mockUpdateReservation,
          carAccessories$:   EMPTY,
          resetSourceValues: () => {
          }
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTripDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the additional charge', () => {
    const additionalCharge = debugElement.query(By.css('[data-testid="additional-charge"')).nativeElement;

    expect(additionalCharge).toBeTruthy();
    expect(mockTransform).toHaveBeenCalled();
  });

  it('should update reservation on Request Changes button click', () => {
    const requestChangesButton = debugElement.query(By.css('[data-testid="request-changes-button"')).nativeElement;

    requestChangesButton.click();

    expect(mockUpdateReservation).toHaveBeenCalledTimes(1);
    expect(mockUpdateReservation).toHaveBeenCalledWith(component.dialogData.trip.id);
  });

  it('should cancel reservation on Cancel Trip button click', () => {
    const requestChangesButton = debugElement.query(By.css('[data-testid="cancel-trip-button"')).nativeElement;

    requestChangesButton.click();

    expect(mockCancelReservation).toHaveBeenCalledTimes(1);
    expect(mockCancelReservation).toHaveBeenCalledWith(component.dialogData.trip);
  });
});
