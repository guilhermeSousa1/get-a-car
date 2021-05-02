import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MockComponent, MockProvider } from 'ng-mocks';
import { CarCardComponent } from '@guilhermeSousa1/request/components/car-card/car-card.component';
import { DataService } from '@guilhermeSousa1/core/services/data/data.service';
import { CarPreferencesComponent, ReservationDetailsFormComponent } from '@guilhermeSousa1/shared/components';
import { ReservationService } from '@guilhermeSousa1/core/services/reservation/reservation.service';
import { CarRequestDialogComponent } from '@guilhermeSousa1/request/dialogs/car-request/car-request.dialog.component';
import { RequestPageComponent } from './request-page.component';
import { testCar } from '@guilhermeSousa1/core/test-utils';

describe('RequestPageComponent', () => {
  let component: RequestPageComponent;
  let fixture: ComponentFixture<RequestPageComponent>;
  let debugElement: DebugElement;
  let mockOpen;
  let mockUpdateCar;
  let mockCreateReservation;
  let mockResetAccessories;
  let mockNavigate;

  beforeEach(() => {
    mockUpdateCar = jest.fn();
    mockCreateReservation = jest.fn().mockImplementation(() => of(true));
    mockResetAccessories = jest.fn();
    mockNavigate = jest.fn();
    mockOpen = jest.fn().mockReturnValue({ afterClosed: () => of(true) });
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RequestPageComponent,
        MockComponent(ReservationDetailsFormComponent),
        MockComponent(CarPreferencesComponent),
        MockComponent(CarCardComponent)
      ],
      providers: [
        MockProvider(DataService, {
          getCars: () => of([testCar])
        }),
        MockProvider(MatDialog, {
          open: mockOpen
        }),
        MockProvider(ReservationService, {
          updateCar:         mockUpdateCar,
          createReservation: mockCreateReservation,
          resetAccessories:  mockResetAccessories
        }),
        MockProvider(Router, {
          navigate: mockNavigate
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open CarRequestDialogComponent on requestCar event', () => {
    const carCardComponent = debugElement.query(By.directive(CarCardComponent)).componentInstance;

    carCardComponent.requestCar.emit(testCar);

    expect(mockOpen).toHaveBeenCalledTimes(1);
    expect(mockOpen).toHaveBeenCalledWith(CarRequestDialogComponent, expect.anything());
  });

  it('should create reservation on CarRequestDialogComponent close', () => {
    const carCardComponent = debugElement.query(By.directive(CarCardComponent)).componentInstance;

    carCardComponent.requestCar.emit(testCar);

    expect(mockUpdateCar).toHaveBeenCalledTimes(1);
    expect(mockUpdateCar).toHaveBeenCalledWith(testCar);
    expect(mockCreateReservation).toHaveBeenCalledTimes(1);
    expect(mockResetAccessories).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
