import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MyTripsRoutingModule } from './my-trips-routing.module';
import { ComponentsModule } from '../shared/components/components.module';
import { MaterialModule } from '../material.module';
import { MyTripsPageComponent } from './page/my-trips-page.component';

@NgModule({
  imports: [
    CommonModule,
    MyTripsRoutingModule,
    ComponentsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [MyTripsPageComponent]
})
export class MyTripsModule {
}