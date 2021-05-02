import { AdditionalChargePipe } from '@guilhermeSousa1/shared/pipes/additional-charge/additional-charge.pipe';
import { testAccessories } from '@guilhermeSousa1/core/test-utils';

describe('AdditionalChargePipe', () => {
  let additionalChargePipe: AdditionalChargePipe;

  beforeEach(() => {
    additionalChargePipe = new AdditionalChargePipe();
  });

  it('create an instance', () => {
    expect(additionalChargePipe).toBeTruthy();
  });

  it('returns the additional charge', () => {
    const additionalCharge = testAccessories.reduce((accumulator, { price }) => accumulator + price, 0);

    expect(additionalChargePipe.transform(testAccessories)).toBe(additionalCharge);
  });
});
