import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@guilhermeSousa1/material.module';
import { PlanPaymentRoutingModule } from '@guilhermeSousa1/plan-payment/plan-payment-routing.module';
import { PlanPaymentPageComponent } from './page/plan-payment-page.component';

@NgModule({
  imports: [
    CommonModule,
    PlanPaymentRoutingModule,
    MaterialModule
  ],
  declarations: [
    PlanPaymentPageComponent
  ]
})
export class PlanPaymentModule {
}
