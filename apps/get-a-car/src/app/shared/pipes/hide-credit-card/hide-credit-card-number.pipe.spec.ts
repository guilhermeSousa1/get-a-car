import { HideCreditCardNumberPipe } from '@guilhermeSousa1/shared/pipes/hide-credit-card/hide-credit-card-number.pipe';

describe('HideCreditCardNumberPipe', () => {
  let hideCreditCardNumberPipe: HideCreditCardNumberPipe;

  beforeEach(() => {
    hideCreditCardNumberPipe = new HideCreditCardNumberPipe();
  });

  it('create an instance', () => {
    expect(hideCreditCardNumberPipe).toBeTruthy();
  });

  it('returns the hidden credit card number', () => {
    const creditCardNumber = 4111111111111111;
    expect(hideCreditCardNumberPipe.transform(creditCardNumber)).toBe(`****${ 1111 }`);
  });
});
