import { CarPreferences } from '@guilhermeSousa1/shared/data-models';

/**
 * Interface that models the reservation details.
 */
export interface ReservationDetails {
  /** The delivery and return address */
  address: string;
  /** The start date of the reservation */
  startDate: number;
  /** The end date of the reservation */
  endDate: number;
  /** The number of driving days */
  drivingDays: number;
  /** The time (hour) in which the vehicle will be delivered */
  deliveryTime: number;
  /** The time (hour) in which the vehicle will be collected */
  collectionTime: number;
}
