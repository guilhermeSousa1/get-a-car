import { Injectable } from '@angular/core';
import { differenceInCalendarDays, startOfToday, startOfTomorrow } from 'date-fns';

/**
 * Service providing utility functions to work with dates.
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
   *
   * @param startDate  The initial date
   * @param endDate    The final date
   * @returns          {number}
   */
  public differenceInDays(startDate: Date, endDate: Date): number {
    return differenceInCalendarDays(endDate, startDate);
  }

  /**
   * Returns the date for today.
   *
   * @public
   *
   * @returns  {Date}
   */
  public getTodayDate(): Date {
    return startOfToday();
  }

  /**
   * Returns the date for tomorrow.
   *
   * @public
   *
   * @returns  {Date}
   */
  public getTomorrowDate(): Date {
    return startOfTomorrow();
  }
}
