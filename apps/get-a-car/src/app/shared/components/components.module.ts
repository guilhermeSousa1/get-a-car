import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@guilhermeSousa1/material.module';
import { ReservationDetailsFormComponent } from '@guilhermeSousa1/shared/components/reservation-details-form/reservation-details-form.component';
import { CarPreferencesComponent } from '@guilhermeSousa1/shared/components/car-preferences/car-preferences.component';
import { DialogsModule } from '@guilhermeSousa1/shared/dialogs/dialogs.module';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

const COMPONENTS = [
  SidebarNavComponent,
  ToolbarComponent,
  ReservationDetailsFormComponent,
  CarPreferencesComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    DialogsModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class ComponentsModule {
}
