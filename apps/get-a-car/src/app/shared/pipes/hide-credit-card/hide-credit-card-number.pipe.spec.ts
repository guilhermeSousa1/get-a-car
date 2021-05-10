import { HideCreditCardNumberPipe } from '@guilhermeSousa1/shared/pipes/hide-credit-card/hide-credit-card-number.pipe';

describe('HideCreditCardPipe', () => {
  it('create an instance', () => {
    const pipe = new HideCreditCardNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
