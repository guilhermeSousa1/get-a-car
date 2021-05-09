import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditBillingInfoDialogComponent } from '@guilhermeSousa1/plan-payment/dialogs/edit-billing-info/edit-billing-info.dialog.component';

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls:   ['./billing-info.component.scss']
})
export class BillingInfoComponent {

  /**
   * Class constructor.
   *
   * @public
   * @param dialog  Injection of the Dialog service
   */
  public constructor(private dialog: MatDialog) {
  }

  /**
   * Displays the modal to the billing info
   *
   * @public
   */
  public showEditBillingInfoDialog(): void {
    const config: MatDialogConfig = {
      width:     '850px',
      autoFocus: false
    };

    this.dialog.open(EditBillingInfoDialogComponent, config);
  }
}
