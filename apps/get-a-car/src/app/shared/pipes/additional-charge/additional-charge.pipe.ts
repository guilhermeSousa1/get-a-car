import { Pipe, PipeTransform } from '@angular/core';
import { CarAccessory } from '@guilhermeSousa1/core/data-models';

/**
 * Pipe that receives an array of accessories and returns the additional charge for those accessories.
 */
@Pipe({
  name: 'additionalCharge'
})
export class AdditionalChargePipe implements PipeTransform {

  /**
   * Pipe transform function.
   *
   * @param value  The selected accessories
   * @returns      {number}
   */
  transform(value: CarAccessory[]): number {
    return value.reduce((accumulator, { price }) => accumulator + price, 0);
  }
}
