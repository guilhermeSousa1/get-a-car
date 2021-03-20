import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestRoutingModule } from './request-routing.module';
import { ComponentsModule } from '../shared/components/components.module';
import { MaterialModule } from '../material.module';
import { RequestPageComponent } from './page/request-page.component';
import { EditCarPreferencesDialogComponent } from './dialogs/edit-car-preferences/edit-car-preferences.dialog.component';

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
    EditCarPreferencesDialogComponent
  ]
})
export class RequestModule {
}
