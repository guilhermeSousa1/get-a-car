import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reservation, ReservationStatus } from '@guilhermeSousa1/core/data-models';

/**
 * Service responsible for the reservation api.
 */
@Injectable({
  providedIn: 'root'
})
export class ReservationAPI {

  /** Base path for the in memory data */
  private baseUrl = 'api';

  /**
   * Class constructor.
   *
   * @public
   * @param http  Injection of the HttpClient service
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Returns the list of past reservations.
   *
   * @public
   *
   * @returns  {Observable<Reservation[]>}
   */
  public getPastReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${ this.baseUrl }/reservations`)
      .pipe(
        map((reservations) => {
          const filteredReservations = reservations.filter((reservation) => reservation?.status !== ReservationStatus.PLANNED);
          return filteredReservations.sort((a, b) => (a.details?.startDate > b.details?.startDate ? 1 : -1));
        })
      );
  }

  /**
   * Returns the list of planned reservations.
   *
   * @public
   *
   * @returns  {Observable<Reservation[]>}
   */
  public getPlannedReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${ this.baseUrl }/reservations`)
      .pipe(
        map((reservations) => {
          const filteredReservations = reservations.filter((reservation) => reservation?.status === ReservationStatus.PLANNED);
          return filteredReservations.sort((a, b) => (a.details?.startDate > b.details?.startDate ? 1 : -1));
        })
      );
  }

  /**
   * Creates a new reservation.
   *
   * @public
   *
   * @param reservation  The new reservation
   * @returns            {Observable<Reservation>}
   */
  public createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${ this.baseUrl }/reservations`, reservation);
  }

  /**
   * Updates an existing reservation.
   *
   * @public
   *
   * @param reservation  The updated reservation
   * @returns            {Observable<any>}
   */
  public updateReservation(reservation: Reservation): Observable<any> {
    return this.http.put<any>(`${ this.baseUrl }/reservations`, reservation);
  }

  /**
   * Cancels an existing reservation.
   *
   * @public
   *
   * @param reservation  The reservation to cancel
   * @returns            {Observable<any>}
   */
  public cancelReservation(reservation: Reservation): Observable<any> {
    return this.http.put<any>(`${ this.baseUrl }/reservations`, { ...reservation, status: ReservationStatus.CANCELLED });
  }
}
