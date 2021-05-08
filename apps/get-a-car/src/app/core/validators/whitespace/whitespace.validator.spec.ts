import { FormControl } from '@angular/forms';
import { whitespaceValidator } from '@guilhermeSousa1/core/validators';

describe('whitespaceValidator', () => {
  const validator = whitespaceValidator();

  it('should return null on string value', () => {
    const formControl = new FormControl();
    formControl.setValue('CoolString');

    expect(validator(formControl)).toStrictEqual(null);
  });

  it('should return null on number value', () => {
    const formControl = new FormControl();
    formControl.setValue('123');

    expect(validator(formControl)).toStrictEqual(null);
  });

  it('should return validation error on whitespace value', () => {
    const formControl = new FormControl();
    formControl.setValue(' ');

    expect(validator(formControl)).toStrictEqual({ whitespace: true });
  });

  it('should return validation error on null value', () => {
    const formControl = new FormControl();
    formControl.setValue(null);

    expect(validator(formControl)).toStrictEqual({ whitespace: true });
  });

  it('should return validation error on empty string value', () => {
    const formControl = new FormControl();
    formControl.setValue('');

    expect(validator(formControl)).toStrictEqual({ whitespace: true });
  });
});
