import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validates that the delivery and collection times are possible for same day car reservation periods.
 *
 * @returns  {ValidatorFn}
 */
export function sameDayReservationValidation(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value?.['startDate'] != null
      && control.value?.['endDate'] != null
      && control.value?.['deliveryTime'] != null
      && control.value?.['collectionTime'] != null
      && +control.value?.['startDate'] === +control.value?.['endDate']
      && control.value?.['deliveryTime'] >= control.value?.['collectionTime']) {
      return { invalidSameDayReservation: true };
    } else {
      return null;
    }
  };
}
