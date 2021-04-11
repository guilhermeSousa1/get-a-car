import { Injectable } from '@angular/core';
import { differenceInCalendarDays, fromUnixTime, getTime, setHours, startOfToday, startOfTomorrow } from 'date-fns';

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

  /**
   * Formats a date into a timestamp.
   *
   * @public
   *
   * @param value  Original value
   * @returns      {number}
   */
  public formatDateToTimestamp(value: Date): number {
    return getTime(value);
  }

  /**
   * Formats a timestamp into a Date object.
   *
   * @public
   *
   * @param value  Original value
   * @returns      {Date}
   */
  public formatTimestampToDate(value: number): Date {
    return fromUnixTime(value);
  }

  /**
   * Sets the hours to a given date.
   *
   * @public
   *
   * @param date   The date to change the hour
   * @param hours  The hours value
   * @returns      {Date}
   */
  public setHours(date: Date, hours: number): Date {
    return setHours(date, hours);
  }
}
