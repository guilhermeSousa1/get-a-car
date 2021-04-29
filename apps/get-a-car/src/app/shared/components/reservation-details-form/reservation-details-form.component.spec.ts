import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EMPTY } from 'rxjs';
import { MockProvider } from 'ng-mocks';
import { ReservationDetailsFormComponent } from '@guilhermeSousa1/shared/components/reservation-details-form/reservation-details-form.component';
import { DataService } from '@guilhermeSousa1/core/services/data/data.service';
import { ReservationService } from '@guilhermeSousa1/core/services/reservation/reservation.service';
import { DateService } from '@guilhermeSousa1/core/services/date/date.service';

describe('ReservationDetailsComponent', () => {
  let component: ReservationDetailsFormComponent;
  let fixture: ComponentFixture<ReservationDetailsFormComponent>;
  let debugElement: DebugElement;
  const dateService = new DateService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDatepickerModule,
        MatSelectModule,
        MatNativeDateModule
      ],
      declarations: [
        ReservationDetailsFormComponent
      ],
      providers: [
        FormBuilder,
        MockProvider(BreakpointObserver, {
          observe: () => EMPTY
        }),
        MockProvider(DataService),
        MockProvider(ReservationService)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationDetailsFormComponent);
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

  it('form should be invalid trigger invalid same day reservation', () => {
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
});
