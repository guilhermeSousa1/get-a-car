import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestPageComponent } from './page/request-page.component';

const routes: Routes = [
  {
    path: '',
    component: RequestPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule {
}
