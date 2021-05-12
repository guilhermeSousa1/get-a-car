import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MockProvider } from 'ng-mocks';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { EditBillingInfoDialogComponent } from '@guilhermeSousa1/plan-payment/dialogs/edit-billing-info/edit-billing-info.dialog.component';

describe('EditBillingInfoComponent', () => {
  let component: EditBillingInfoDialogComponent;
  let fixture: ComponentFixture<EditBillingInfoDialogComponent>;
  let debugElement: DebugElement;
  const mockClose = jest.fn();

  beforeEach(async () => {
    jest.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        CreditCardDirectivesModule
      ],
      declarations: [
        EditBillingInfoDialogComponent
      ],
      providers: [
        FormBuilder,
        MockProvider(MAT_DIALOG_DATA, {
          billingInfo: null
        }),
        MockProvider(MatDialogRef, {
          close: mockClose
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBillingInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit valid form', () => {
    const inputPostalCode = debugElement.query(By.css('[data-testid="postal-code"]')).nativeElement;
    const inputCardHolderName = debugElement.query(By.css('[data-testid="card-holder-name"]')).nativeElement;
    const inputCardNumber = debugElement.query(By.css('[data-testid="card-number"]')).nativeElement;
    const inputCardExpirationDate = debugElement.query(By.css('[data-testid="card-expiration-date"]')).nativeElement;
    const inputCardCCV = debugElement.query(By.css('[data-testid="card-ccv"]')).nativeElement;
    const submitButton = debugElement.query(By.css('[data-testid="submit-button"]')).nativeElement;

    const submitSpy = jest.spyOn(component, 'submit');

    inputPostalCode.value = 54214;
    inputPostalCode.dispatchEvent(new Event('input'));

    inputCardHolderName.value = 'John Doe';
    inputCardHolderName.dispatchEvent(new Event('input'));

    inputCardNumber.value = 4111111111111111;
    inputCardNumber.dispatchEvent(new Event('input'));

    inputCardExpirationDate.value = '05 / 75';
    inputCardExpirationDate.dispatchEvent(new Event('input'));

    inputCardCCV.value = 444;
    inputCardCCV.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    submitButton.click();

    expect(submitSpy).toHaveBeenCalledTimes(1);
  });

  it('should not submit invalid form', () => {
    const inputPostalCode = debugElement.query(By.css('[data-testid="postal-code"]')).nativeElement;
    const inputCardHolderName = debugElement.query(By.css('[data-testid="card-holder-name"]')).nativeElement;
    const inputCardNumber = debugElement.query(By.css('[data-testid="card-number"]')).nativeElement;
    const inputCardExpirationDate = debugElement.query(By.css('[data-testid="card-expiration-date"]')).nativeElement;
    const inputCardCCV = debugElement.query(By.css('[data-testid="card-ccv"]')).nativeElement;
    const submitButton = debugElement.query(By.css('[data-testid="submit-button"]')).nativeElement;

    const submitSpy = jest.spyOn(component, 'submit');

    inputPostalCode.value = 1;
    inputPostalCode.dispatchEvent(new Event('input'));

    inputCardHolderName.value = '   ';
    inputCardHolderName.dispatchEvent(new Event('input'));

    inputCardNumber.value = 12;
    inputCardNumber.dispatchEvent(new Event('input'));

    inputCardExpirationDate.value = '02 / 21';
    inputCardExpirationDate.dispatchEvent(new Event('input'));

    inputCardCCV.value = 1;
    inputCardCCV.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    submitButton.click();

    expect(submitSpy).toHaveBeenCalledTimes(0);
  });

  it('should close dialog when form is submitted', () => {
    component.submit();

    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
