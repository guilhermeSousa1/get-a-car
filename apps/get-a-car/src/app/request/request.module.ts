import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CarRequestDialogComponent, EditCarPreferencesDialogComponent } from './dialogs';
import { CarAccessoryComponent, CarCardComponent } from './components';
import { RequestRoutingModule } from './request-routing.module';
import { ComponentsModule } from '../shared/components/components.module';
import { MaterialModule } from '../material.module';
import { RequestPageComponent } from './page/request-page.component';

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
    EditCarPreferencesDialogComponent,
    CarRequestDialogComponent
  ]
})
export class RequestModule {
}
