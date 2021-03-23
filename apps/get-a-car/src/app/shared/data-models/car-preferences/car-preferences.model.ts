import { ChargingCable } from './charging-cable.enum';
import { DriveMode } from './drive-mode.enum';
import { RadioStation } from './radio-stations.enum';

/**
 * Interface that models the car preferences.
 */
export interface CarPreferences {
  /** The radio station */
  radioStation: RadioStation;
  /** The AC temperature */
  temperature: number;
  /** The drive mode */
  driveMode: DriveMode;
  /** The charging cable */
  chargingCable: ChargingCable;
}
