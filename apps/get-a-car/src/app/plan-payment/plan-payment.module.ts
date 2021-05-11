import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { MaterialModule } from '@guilhermeSousa1/material.module';
import { PlanPaymentRoutingModule } from '@guilhermeSousa1/plan-payment/plan-payment-routing.module';
import { EditBillingInfoDialogComponent } from '@guilhermeSousa1/plan-payment/dialogs/edit-billing-info/edit-billing-info.dialog.component';
import { PipesModule } from '@guilhermeSousa1/shared/pipes/pipes.module';
import { PlanPaymentPageComponent } from './page/plan-payment-page.component';
import { BillingInfoComponent } from './components/billing-info/billing-info.component';
import { SubscriptionPlanComponent } from './components/subscription-plan/subscription-plan.component';

@NgModule({
  imports: [
    CommonModule,
    PlanPaymentRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    CreditCardDirectivesModule,
    PipesModule
  ],
  declarations: [
    PlanPaymentPageComponent,
    BillingInfoComponent,
    EditBillingInfoDialogComponent,
    SubscriptionPlanComponent
  ]
})
export class PlanPaymentModule {
}
