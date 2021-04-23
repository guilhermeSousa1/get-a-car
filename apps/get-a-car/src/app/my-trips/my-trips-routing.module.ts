import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyTripsPageComponent } from './page/my-trips-page.component';

const routes: Routes = [
  {
    path:      '',
    component: MyTripsPageComponent,
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
export class MyTripsRoutingModule {
}
