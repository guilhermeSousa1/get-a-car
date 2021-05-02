import { CarNamePipe } from '@guilhermeSousa1/shared/pipes/car-name/car-name.pipe';
import { testCar } from '@guilhermeSousa1/core/test-utils';

describe('CarNamePipe', () => {
  let carNamePipe: CarNamePipe;

  beforeEach(() => {
    carNamePipe = new CarNamePipe();
  });

  it('create an instance', () => {
    expect(carNamePipe).toBeTruthy();
  });

  it('returns the additional charge', () => {
    expect(carNamePipe.transform(testCar)).toBe(`${ testCar.brand } ${ testCar.model }`);
  });
});
