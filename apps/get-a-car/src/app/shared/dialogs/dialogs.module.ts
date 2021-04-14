import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@guilhermeSousa1/material.module';
import { EditCarPreferencesDialogComponent } from '@guilhermeSousa1/shared/dialogs/edit-car-preferences/edit-car-preferences.dialog.component';

const DIALOGS = [
  EditCarPreferencesDialogComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    ...DIALOGS
  ],
  exports: [
    ...DIALOGS
  ]
})
export class DialogsModule {
}
