import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@guilhermeSousa1/material.module';
import { CarAccessoryComponent, CarPreferencesComponent, ReservationDetailsFormComponent, SidebarNavComponent, ToolbarComponent } from '@guilhermeSousa1/shared/components';
import { DialogsModule } from '@guilhermeSousa1/shared/dialogs/dialogs.module';

const COMPONENTS = [
  CarAccessoryComponent,
  CarPreferencesComponent,
  ReservationDetailsFormComponent,
  SidebarNavComponent,
  ToolbarComponent
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
