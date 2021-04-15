import { FormControl } from '@angular/forms';
import { sameDayReservationValidator } from '@guilhermeSousa1/core/validators';
import { DateService } from '@guilhermeSousa1/core/services/date/date.service';

describe('SameDayReservationValidator', () => {
  const validator = sameDayReservationValidator();
  const dateService = new DateService();

  // Form control that when passed to the validator returns a validation error.
  const invalidSameDayReservationFormControl = {
    startDate:      dateService.getTodayDate(),
    endDate:        dateService.getTodayDate(),
    deliveryTime:   10,
    collectionTime: 8
  };

  it('should return null on no specified dates', () => {
    const formControl = new FormControl();
    formControl.setValue({
      ...invalidSameDayReservationFormControl,
      startDate: null,
      endDate:   null
    });

    expect(validator(formControl)).toBe(null);
  });

  it('should return null on no specified times', () => {
    const formControl = new FormControl();
    formControl.setValue({
      ...invalidSameDayReservationFormControl,
      deliveryTime:   null,
      collectionTime: null
    });

    expect(validator(formControl)).toBe(null);
  });

  it('should return null on no different dates', () => {
    const formControl = new FormControl();
    formControl.setValue({
      ...invalidSameDayReservationFormControl,
      endDate: dateService.getTomorrowDate()
    });

    expect(validator(formControl)).toEqual(null);
  });

  it('should return null when collection time is superior to delivery time', () => {
    const formControl = new FormControl();
    formControl.setValue({
      ...invalidSameDayReservationFormControl,
      collectionTime: 20
    });

    expect(validator(formControl)).toEqual(null);
  });

  it('should return validation error', () => {
    const formControl = new FormControl();
    formControl.setValue({
      ...invalidSameDayReservationFormControl
    });

    expect(validator(formControl)).toStrictEqual({ invalidSameDayReservation: true });
  });
});
