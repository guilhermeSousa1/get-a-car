import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CarRequestDialogComponent } from '@guilhermeSousa1/request/dialogs/car-request/car-request.dialog.component';
import { RequestRoutingModule } from '@guilhermeSousa1/request/request-routing.module';
import { ComponentsModule } from '@guilhermeSousa1/shared/components/components.module';
import { MaterialModule } from '@guilhermeSousa1/material.module';
import { RequestPageComponent } from '@guilhermeSousa1/request/page/request-page.component';
import { DialogsModule } from '@guilhermeSousa1/shared/dialogs/dialogs.module';
import { CarCardComponent } from '@guilhermeSousa1/request/components/car-card/car-card.component';

@NgModule({
  imports: [
    CommonModule,
    RequestRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ComponentsModule,
    DialogsModule
  ],
  declarations: [
    RequestPageComponent,
    CarCardComponent,
    CarRequestDialogComponent
  ]
})
export class RequestModule {
}
