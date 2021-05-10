/**
 * Interface that models the billing info.
 */
export interface BillingInfo {
  /** The id of the billing info */
  id?: number;
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
