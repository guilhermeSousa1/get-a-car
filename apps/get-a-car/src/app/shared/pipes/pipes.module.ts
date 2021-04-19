import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditionalChargePipe } from '@guilhermeSousa1/shared/pipes/additional-charge/additional-charge.pipe';
import { CarNamePipe } from './car-name/car-name.pipe';

const PIPES = [
  AdditionalChargePipe,
  CarNamePipe
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...PIPES
  ],
  exports: [
    ...PIPES
  ]
})
export class PipesModule {
}
