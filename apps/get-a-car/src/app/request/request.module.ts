import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestRoutingModule } from './request-routing.module';
import { ComponentsModule } from '../shared/components/components.module';
import { MaterialModule } from '../material.module';
import { RequestPageComponent } from './page/request-page.component';
import { EditCarPreferencesDialogComponent } from './dialogs/edit-car-preferences/edit-car-preferences.dialog.component';
import { CarCardComponent } from './components/car-card/car-card.component';
import { CarRequestDialogComponent } from './dialogs/car-request/car-request.dialog.component';
import { CarAccessoryComponent } from './components/car-accessory/car-accessory.component';

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
    EditCarPreferencesDialogComponent,
    CarCardComponent,
    CarRequestDialogComponent,
    CarAccessoryComponent
  ]
})
export class RequestModule {
}
