import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { By } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { EMPTY } from 'rxjs';
import { MockComponent, MockProvider } from 'ng-mocks';
import { DataService, DateService } from '@guilhermeSousa1/core/services';
import { EditCarPreferencesDialogComponent } from '@guilhermeSousa1/request/dialogs';
import { CarCardComponent } from '@guilhermeSousa1/request/components';
import { RequestPageComponent } from './request-page.component';

describe('RequestPageComponent', () => {
  let component: RequestPageComponent;
  let fixture: ComponentFixture<RequestPageComponent>;
  let debugElement: DebugElement;

  const mockMatDialog = {
    open: jest.fn().mockImplementation(() => ({
      afterClosed: () => EMPTY
    }))
  };

  const dateService = new DateService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatNativeDateModule,
        BrowserAnimationsModule
      ],
      declarations: [
        RequestPageComponent,
        MockComponent(CarCardComponent)
      ],
      providers: [
        FormBuilder,
        { provide: MatDialog, useValue: mockMatDialog },
        MockProvider(BreakpointObserver, {
          observe: () => EMPTY
        }),
        MockProvider(DateService),
        MockProvider(DataService, {
          getDefaultCarPreferences: () => EMPTY,
          getCars:                  () => EMPTY
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

  it('form should be valid', () => {
    const inputAddress = debugElement.query(By.css('[data-testid="address"]')).nativeElement;
    const inputStartDate = debugElement.query(By.css('[data-testid="start-date"]')).nativeElement;
    const inputEndDate = debugElement.query(By.css('[data-testid="end-date"]')).nativeElement;
    const matSelectCollectionTime = debugElement.query(By.css('[data-testid="collection-time"] .mat-select-trigger')).nativeElement;
    const matSelectDeliveryTime = debugElement.query(By.css('[data-testid="delivery-time"] .mat-select-trigger')).nativeElement;

    inputAddress.value = 'John Doe Street';
    inputAddress.dispatchEvent(new Event('input'));

    inputStartDate.value = dateService.getTodayDate();
    inputStartDate.dispatchEvent(new Event('input'));

    inputEndDate.value = dateService.getTomorrowDate();
    inputEndDate.dispatchEvent(new Event('input'));

    matSelectCollectionTime.click();
    fixture.detectChanges();

    const matOptionsCollectionTime = debugElement.queryAll(By.css('.mat-option'));
    matOptionsCollectionTime[0].nativeElement.click();
    fixture.detectChanges();

    matSelectDeliveryTime.click();
    fixture.detectChanges();

    const matOptionsDeliveryTime = debugElement.queryAll(By.css('.mat-option'));
    matOptionsDeliveryTime[0].nativeElement.click();
    fixture.detectChanges();

    expect(component.form.valid).toBeTruthy();
  });

  it('should trigger invalid same day reservation', () => {
    const inputStartDate = debugElement.query(By.css('[data-testid="start-date"]')).nativeElement;
    const inputEndDate = debugElement.query(By.css('[data-testid="end-date"]')).nativeElement;
    const matSelectDeliveryTime = debugElement.query(By.css('[data-testid="delivery-time"] .mat-select-trigger')).nativeElement;
    const matSelectCollectionTime = debugElement.query(By.css('[data-testid="collection-time"] .mat-select-trigger')).nativeElement;

    inputStartDate.value = dateService.getTodayDate();
    inputStartDate.dispatchEvent(new Event('input'));

    inputEndDate.value = dateService.getTodayDate();
    inputEndDate.dispatchEvent(new Event('input'));

    matSelectCollectionTime.click();
    fixture.detectChanges();

    const matOptionsCollectionTime = debugElement.queryAll(By.css('.mat-option'));
    matOptionsCollectionTime[0].nativeElement.click();
    fixture.detectChanges();

    matSelectDeliveryTime.click();
    fixture.detectChanges();

    const matOptionsDeliveryTime = debugElement.queryAll(By.css('.mat-option'));
    matOptionsDeliveryTime[0].nativeElement.click();
    fixture.detectChanges();

    expect(component.form.errors.invalidSameDayReservation).toBeTruthy();
  });

  it('should open edit car preferences dialog', () => {
    const carPreferencesButton = debugElement.query(By.css('[data-testid="car-preferences-button"]')).nativeElement;

    carPreferencesButton.click();

    expect(mockMatDialog.open).toBeCalledTimes(1);
    expect(mockMatDialog.open.mock.calls[0][0]).toBe(EditCarPreferencesDialogComponent);
  });
});
