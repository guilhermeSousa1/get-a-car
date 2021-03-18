import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

const MODULES = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatListModule,
  MatToolbarModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatSidenavModule
];

/** Custom options to configure form field options */
const formFieldDefaults: MatFormFieldDefaultOptions = {
  appearance: 'outline',
  floatLabel: 'auto'
};

@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: formFieldDefaults }
  ]
})
export class MaterialModule {
}
