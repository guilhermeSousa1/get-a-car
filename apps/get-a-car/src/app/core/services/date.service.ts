import { Injectable } from '@angular/core';
import { differenceInCalendarDays } from 'date-fns';

/**
 * Service providing utility functions that can be used by any component or service that works with dates.
 */
@Injectable({
  providedIn: 'root'
})
export class DateService {

  /**
   * Class constructor.
   *
   * @public
   */
  constructor() {
  }

  /**
   * Returns the difference in days between two dates.
   *
   * @public
   * @static
   *
   * @param startDate  The initial date
   * @param endDate    The final date
   * @returns          {number}
   */
  public differenceInDays(startDate: Date, endDate: Date): number {
    return differenceInCalendarDays(endDate, startDate);
  }
}
