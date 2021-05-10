import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditionalChargePipe } from '@guilhermeSousa1/shared/pipes/additional-charge/additional-charge.pipe';
import { HideCreditCardNumberPipe } from '@guilhermeSousa1/shared/pipes/hide-credit-card/hide-credit-card-number.pipe';
import { CarNamePipe } from '@guilhermeSousa1/shared/pipes/car-name/car-name.pipe';

const PIPES = [
  AdditionalChargePipe,
  CarNamePipe,
  HideCreditCardNumberPipe
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
