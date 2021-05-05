import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MaterialModule } from '@guilhermeSousa1/material.module';
import { ReferralsRoutingModule } from '@guilhermeSousa1/referrals/referrals-routing.module';
import { ReferralsPageComponent } from '@guilhermeSousa1/referrals/page/referrals-page.component';
import { ReferralStepComponent } from './components/referral-step/referral-step.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReferralsRoutingModule,
    MaterialModule,
    ClipboardModule
  ],
  declarations: [
    ReferralsPageComponent,
    ReferralStepComponent
  ]
})
export class ReferralsModule {
}
