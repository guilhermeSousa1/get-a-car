import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestPageComponent } from './page/request-page.component';
import { RequestRoutingModule } from './request-routing.module';
import { ComponentsModule } from '../shared/components/components.module';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    RequestRoutingModule,
    ComponentsModule,
    MaterialModule
  ],
  declarations: [
    RequestPageComponent
  ]
})
export class RequestModule {
}
