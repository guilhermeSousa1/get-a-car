import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MockProvider } from 'ng-mocks';
import { EditCarPreferencesDialogComponent } from './edit-car-preferences.dialog.component';
import defaultCarPreferences from '../../page/config/default-car-preferences.json';

describe('EditCarPreferencesComponent', () => {
  let component: EditCarPreferencesDialogComponent;
  let fixture: ComponentFixture<EditCarPreferencesDialogComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      declarations: [
        EditCarPreferencesDialogComponent
      ],
      providers: [
        FormBuilder,
        MockProvider(MatDialogRef),
        MockProvider(MAT_DIALOG_DATA, {
          carPreferences: defaultCarPreferences
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarPreferencesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit valid form', () => {
    const matSelectRadio = debugElement.query(By.css('[data-testid="radio-station"] .mat-select-trigger')).nativeElement;
    const inputTemperature = debugElement.query(By.css('[data-testid="temperature"]')).nativeElement;
    const matSelectDriveMode = debugElement.query(By.css('[data-testid="drive-mode"] .mat-select-trigger')).nativeElement;
    const matSelectChargingCable = debugElement.query(By.css('[data-testid="charging-cable"] .mat-select-trigger')).nativeElement;
    const submitButton = debugElement.query(By.css('[data-testid="submit-button"]')).nativeElement;

    const submitSpy = jest.spyOn(component, 'submit');

    matSelectRadio.click();
    fixture.detectChanges();

    const matOptionsRadio = debugElement.queryAll(By.css('.mat-option'));
    matOptionsRadio[0].nativeElement.click();
    fixture.detectChanges();

    inputTemperature.value = 25;
    inputTemperature.dispatchEvent(new Event('input'));

    matSelectDriveMode.click();
    fixture.detectChanges();

    const matOptionsDriveMode = debugElement.queryAll(By.css('.mat-option'));
    matOptionsDriveMode[0].nativeElement.click();
    fixture.detectChanges();

    matSelectChargingCable.click();
    fixture.detectChanges();

    const matOptionsChargingCable = debugElement.queryAll(By.css('.mat-option'));
    matOptionsChargingCable[0].nativeElement.click();
    fixture.detectChanges();

    submitButton.click();

    expect(submitSpy).toHaveBeenCalledTimes(1);
  });

  it('should not submit invalid form', () => {
    const matSelectRadio = debugElement.query(By.css('[data-testid="radio-station"] .mat-select-trigger')).nativeElement;
    const inputTemperature = debugElement.query(By.css('[data-testid="temperature"]')).nativeElement;
    const matSelectDriveMode = debugElement.query(By.css('[data-testid="drive-mode"] .mat-select-trigger')).nativeElement;
    const matSelectChargingCable = debugElement.query(By.css('[data-testid="charging-cable"] .mat-select-trigger')).nativeElement;
    const submitButton = debugElement.query(By.css('[data-testid="submit-button"]')).nativeElement;

    const submitSpy = jest.spyOn(component, 'submit');

    matSelectRadio.click();
    fixture.detectChanges();

    const matOptionsRadio = debugElement.queryAll(By.css('.mat-option'));
    matOptionsRadio[0].nativeElement.click();
    fixture.detectChanges();

    inputTemperature.value = 30;
    inputTemperature.dispatchEvent(new Event('input'));

    matSelectDriveMode.click();
    fixture.detectChanges();

    const matOptionsDriveMode = debugElement.queryAll(By.css('.mat-option'));
    matOptionsDriveMode[0].nativeElement.click();
    fixture.detectChanges();

    matSelectChargingCable.click();
    fixture.detectChanges();

    const matOptionsChargingCable = debugElement.queryAll(By.css('.mat-option'));
    matOptionsChargingCable[0].nativeElement.click();
    fixture.detectChanges();

    submitButton.click();

    expect(submitSpy).toHaveBeenCalledTimes(0);
  });

  it('should close dialog when form is submitted', () => {
    const dialogCloseSpy = jest.spyOn(component.dialogRef, 'close');

    component.submit();

    expect(dialogCloseSpy).toHaveBeenCalledTimes(1);
  });
});
