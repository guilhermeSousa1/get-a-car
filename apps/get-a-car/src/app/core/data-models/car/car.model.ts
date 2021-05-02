import { DriveSystem } from './drive-system.enum';

/**
 * Interface that models the car stats.
 */
export interface Car {
  /** The id of the car */
  id: number;
  /** The car brand */
  brand: string;
  /** The car model */
  model: string;
  /** The number of car seats */
  seats: number;
  /** The car drive system */
  driveSystem: DriveSystem;
  /** The car fuel mileage */
  fuelMileage: number;
}
