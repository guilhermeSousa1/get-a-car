import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestPageComponent } from './page/request-page.component';
import { MatSliderModule } from '@angular/material/slider';
import { RequestRoutingModule } from './request-routing.module';
import { ComponentsModule } from '../shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    RequestRoutingModule,
    ComponentsModule,
    MatSliderModule
  ],
  declarations: [
    RequestPageComponent
  ]
})
export class RequestModule {
}
