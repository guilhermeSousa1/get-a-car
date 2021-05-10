import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { EditBillingInfoDialogComponent } from '@guilhermeSousa1/plan-payment/dialogs/edit-billing-info/edit-billing-info.dialog.component';
import { DataService } from '@guilhermeSousa1/core/services/data/data.service';
import { BillingInfo } from '@guilhermeSousa1/core/data-models';

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls:   ['./billing-info.component.scss']
})
export class BillingInfoComponent implements OnInit {

  /** Observable for the billing info */
  public billingInfo$: Observable<BillingInfo>;

  /** Behaviour subject to force the http request for the billing info */
  private billingInfoRequest$: BehaviorSubject<void> = new BehaviorSubject(undefined);

  /**
   * Class constructor.
   *
   * @public
   * @param dataService  Injection of the Data service
   * @param dialog       Injection of the Dialog service
   */
  constructor(private dataService: DataService,
              private dialog: MatDialog) {
  }

  /**
   * Lifecycle hook that is executed after the component is initialized.
   *
   * @public
   */
  public ngOnInit(): void {
    this.setupComponentObservables();
  }

  /**
   * Displays the modal to edit the billing info
   *
   * @public
   */
  public showEditBillingInfoDialog(billingInfo: BillingInfo): void {
    const config: MatDialogConfig = {
      width:     '850px',
      autoFocus: false,
      data:      {
        billingInfo
      }
    };

    const dialogRef = this.dialog.open(EditBillingInfoDialogComponent, config);

    dialogRef.afterClosed()
      .pipe(
        take(1),
        filter((newBillingInfo) => !!newBillingInfo),
        switchMap((newBillingInfo) => this.dataService.updateBillingInfo(newBillingInfo))
      )
      .subscribe(() => {
        this.billingInfoRequest$.next();
      });
  }

  /**
   * Sets up the component observables.
   *
   * @private
   */
  private setupComponentObservables(): void {
    this.billingInfo$ = this.billingInfoRequest$
      .pipe(
        switchMap(() => this.dataService.getBillingInfo()),
        map((billingInfo) => billingInfo[0])
      );
  }
}
