import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CarRequestDialogComponent } from '@guilhermeSousa1/request/dialogs/car-request/car-request.dialog.component';
import { RequestRoutingModule } from '@guilhermeSousa1/request/request-routing.module';
import { ComponentsModule } from '@guilhermeSousa1/shared/components/components.module';
import { MaterialModule } from '@guilhermeSousa1/material.module';
import { RequestPageComponent } from '@guilhermeSousa1/request/page/request-page.component';
import { CarAccessoryComponent, CarCardComponent } from '@guilhermeSousa1/request/components';

@NgModule({
  imports: [
    CommonModule,
    RequestRoutingModule,
    ComponentsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    RequestPageComponent,
    CarCardComponent,
    CarAccessoryComponent,
    CarRequestDialogComponent
  ]
})
export class RequestModule {
}
