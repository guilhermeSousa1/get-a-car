import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreditCardValidators } from 'angular-cc-library';
import { BillingInfo } from '@guilhermeSousa1/core/data-models';
import { whitespaceValidator } from '@guilhermeSousa1/core/validators';

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'edit-billing-info',
  templateUrl: './edit-billing-info.dialog.component.html',
  styleUrls:   ['./edit-billing-info.dialog.component.scss']
})
export class EditBillingInfoDialogComponent implements OnInit {

  /** Form group to be used by the form */
  public form: FormGroup;

  /**
   * Class constructor.
   *
   * @public
   * @param dialogData   Data passed to the dialog
   * @param dialogRef    Reference to the dialog
   * @param formBuilder  Injection of the FormBuilder service
   */
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: { billingInfo: BillingInfo },
              private dialogRef: MatDialogRef<EditBillingInfoDialogComponent>,
              private formBuilder: FormBuilder) {
  }

  /**
   * Lifecycle hook that is executed after the component is initialized.
   *
   * @public
   */
  public ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Submits the form
   *
   * @public
   */
  public submit(): void {
    const billingInfo: BillingInfo = {
      postalCode:         this.form.get('postalCode')?.value.trim() ?? this.dialogData.billingInfo?.postalCode,
      cardHolderName:     this.form.get('cardHolderName')?.value.trim() ?? this.dialogData.billingInfo?.cardHolderName,
      cardNumber:         this.form.get('cardNumber')?.value ?? this.dialogData.billingInfo?.cardNumber,
      cardExpirationDate: this.form.get('cardExpirationDate')?.value ?? this.dialogData.billingInfo?.cardExpirationDate,
      cardCCV:            this.form.get('cardCCV')?.value ?? this.dialogData.billingInfo?.cardCCV
    };

    this.dialogRef.close(billingInfo);
  }

  /**
   * Initializes the form
   *
   * @private
   */
  private initializeForm(): void {
    this.form = this.formBuilder.group({
      postalCode: [
        this.dialogData.billingInfo?.postalCode,
        [Validators.required, Validators.minLength(5), Validators.maxLength(7), Validators.pattern('[0-9]*')]
      ],
      cardHolderName:     [this.dialogData.billingInfo?.cardHolderName, [Validators.required, whitespaceValidator()]],
      cardNumber:         [this.dialogData.billingInfo?.cardNumber, [Validators.required, CreditCardValidators.validateCCNumber]],
      cardExpirationDate: [this.dialogData.billingInfo?.cardExpirationDate, [Validators.required, CreditCardValidators.validateExpDate]],
      cardCCV:            [this.dialogData.billingInfo?.cardCCV, [Validators.required, Validators.minLength(3), Validators.maxLength(4)]]
    });
  }
}
