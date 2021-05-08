import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validates that the input value is not composed of only whitespaces
 *
 * @returns  {ValidatorFn}
 */
export function whitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value != null) {
      const inputValue = control.value?.toString();
      const isWhitespace = (inputValue).trim().length === 0;

      return isWhitespace ? { whitespace: true } : null;
    } else {
      return { whitespace: true };
    }
  };
}
