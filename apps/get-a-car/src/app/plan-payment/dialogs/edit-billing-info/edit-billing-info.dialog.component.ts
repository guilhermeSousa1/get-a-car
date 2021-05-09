import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreditCardValidators } from 'angular-cc-library';
import { Reservation } from '@guilhermeSousa1/core/data-models';
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
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: { trip: Reservation },
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
   * Initializes the form
   *
   * @private
   */
  private initializeForm(): void {
    this.form = this.formBuilder.group({
      postalCode:         [null, [Validators.required, Validators.minLength(5), Validators.maxLength(7), Validators.pattern('[0-9]*')]],
      cardHolderName:     [null, [Validators.required, whitespaceValidator()]],
      cardNumber:         [null, [Validators.required, CreditCardValidators.validateCCNumber]],
      cardExpirationDate: [null, [Validators.required, CreditCardValidators.validateExpDate]],
      cardCCV:            [null, [Validators.required, Validators.minLength(3), Validators.maxLength(4)]]
    });
  }
}
