import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanPaymentPageComponent } from '@guilhermeSousa1/plan-payment/page/plan-payment-page.component';

const routes: Routes = [
  {
    path:      '',
    component: PlanPaymentPageComponent,
    pathMatch: 'full'
  },
  {
    path:       '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanPaymentRoutingModule {
}
