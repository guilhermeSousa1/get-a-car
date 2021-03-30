import { CarPreferences } from '@guilhermeSousa1/shared/data-models';
import { CarAccessory } from '@guilhermeSousa1/shared/data-models/car/car-accessory.model';

/**
 * Interface that models the reservation data.
 */
export interface ReservationData {
  /** The delivery and return address */
  address: string;
  /** The start date of the reservation */
  startDate: Date;
  /** The end date of the reservation */
  endDate: Date;
  /** The time (hour) in which the vehicle will be delivered */
  deliveryTime: number;
  /** The time (hour) in which the vehicle will be collected */
  collectionTime: number;
  /** The car preferences */
  carPreferences: CarPreferences;
  /** The car accessories */
  accessories: CarAccessory[];
}
