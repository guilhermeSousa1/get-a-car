import { Car, CarAccessory, ReservationDetails, ReservationStatus } from '@guilhermeSousa1/shared/data-models';

/**
 * Interface that models a reservation.
 */
export interface Reservation {
  /** The details of the reservation */
  details: ReservationDetails;
  /** The reserved car */
  car: Car;
  /** The car accessories */
  accessories: CarAccessory[];
  /** The reservation status */
  status: ReservationStatus;
}
