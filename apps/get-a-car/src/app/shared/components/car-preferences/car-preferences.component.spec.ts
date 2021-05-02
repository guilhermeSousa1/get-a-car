import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MockProvider } from 'ng-mocks';
import { CarPreferencesComponent } from '@guilhermeSousa1/shared/components';
import { ReservationService } from '@guilhermeSousa1/core/services/reservation/reservation.service';
import { EditCarPreferencesDialogComponent } from '@guilhermeSousa1/shared/dialogs';
import { testCarPreferences } from '@guilhermeSousa1/core/test-utils';

describe('CarPreferencesComponent', () => {
  let component: CarPreferencesComponent;
  let fixture: ComponentFixture<CarPreferencesComponent>;
  let debugElement: DebugElement;
  let mockOpen;

  beforeEach(() => {
    mockOpen = jest.fn();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatButtonModule
      ],
      declarations: [
        CarPreferencesComponent
      ],
      providers: [
        MockProvider(MatDialog, {
          open: mockOpen
        }),
        MockProvider(ReservationService, {
          carPreferences$: of(testCarPreferences)
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show car preferences', () => {
    const radioStation = debugElement.query(By.css(`[data-testid="radio-station"]`)).nativeElement;
    const temperature = debugElement.query(By.css(`[data-testid="temperature"]`)).nativeElement;
    const driveMode = debugElement.query(By.css(`[data-testid="drive-mode"]`)).nativeElement;
    const chargingCable = debugElement.query(By.css(`[data-testid="charging-cable"]`)).nativeElement;

    expect(radioStation.textContent.trim()).toBe(`Radio station: ${ testCarPreferences.radioStation }`);
    expect(temperature.textContent.trim()).toBe(`Temperature: ${ testCarPreferences.temperature } Cº`);
    expect(driveMode.textContent.trim()).toBe(`Drive mode: ${ testCarPreferences.driveMode }`);
    expect(chargingCable.textContent.trim()).toBe(`Charging cable: ${ testCarPreferences.chargingCable }`);
  });

  it('should open EditCarPreferencesDialogComponent', () => {
    const editButton = debugElement.query(By.css(`[data-testid="edit-button"]`)).nativeElement;

    editButton.click();

    expect(mockOpen).toHaveBeenCalledTimes(1);
    expect(mockOpen).toHaveBeenCalledWith(EditCarPreferencesDialogComponent, expect.anything());
  });
});
