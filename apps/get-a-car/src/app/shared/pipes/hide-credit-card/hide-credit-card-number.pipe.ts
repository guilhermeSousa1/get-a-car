import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe that hides all of the digits in the credit card number expect for the last four.
 */
@Pipe({
  name: 'hideCreditCardNumber'
})
export class HideCreditCardNumberPipe implements PipeTransform {

  /**
   * Pipe transform function.
   *
   * @param value  The credit card number
   * @returns      {string}
   */
  transform(value: number): unknown {
    const creditCardNumber = value.toString();
    return `****${ creditCardNumber.slice(creditCardNumber.length - 4) }`;
  }

}
