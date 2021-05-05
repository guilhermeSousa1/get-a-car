import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferralsPageComponent } from '@guilhermeSousa1/referrals/page/referrals-page.component';

const routes: Routes = [
  {
    path:      '',
    component: ReferralsPageComponent,
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
export class ReferralsRoutingModule {
}
