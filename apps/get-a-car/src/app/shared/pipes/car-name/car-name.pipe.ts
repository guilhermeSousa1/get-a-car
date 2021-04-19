import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '@guilhermeSousa1/shared/data-models';

/**
 * Pipe that receives a car object and returns the name of the car.
 */
@Pipe({
  name: 'carName'
})
export class CarNamePipe implements PipeTransform {

  /**
   * Pipe transform function.
   *
   * @param value  The car
   * @returns      {string}
   */
  transform(value: Car): string {
    return `${ value?.brand } ${ value?.model }`;
  }

}
