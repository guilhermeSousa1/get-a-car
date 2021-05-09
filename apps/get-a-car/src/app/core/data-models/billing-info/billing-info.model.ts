/**
 * Interface that models the billing info.
 */
export interface BillingInfo {
  /** The postal code */
  postalCode: string;
  /** The card holder name */
  cardHolderName: string;
  /** The card number */
  cardNumber: number;
  /** The card expiration date */
  cardExpirationDate: string;
  /** The card CCV */
  cardCCV: number;
}
