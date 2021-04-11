/**
 * Interface that models the reservation details.
 */
export interface ReservationDetails {
  /** The delivery and return address */
  address: string;
  /** The start date (hours included) of the reservation */
  startDate: number;
  /** The end date (hours included) of the reservation */
  endDate: number;
  /** The number of driving days */
  drivingDays: number;
}
