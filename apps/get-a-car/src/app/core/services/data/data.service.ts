import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car, CarAccessory, CarPreferences } from '@guilhermeSousa1/core/data-models';

/**
 * Service used to get static data.
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {

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
   * Returns the list of cars.
   *
   * @public
   *
   * @returns  {Observable<Car[]>}
   */
  public getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${ this.baseUrl }/cars`);
  }

  /**
   * Returns the list of car accessories.
   *
   * @public
   *
   * @returns  {Observable<CarAccessory[]>}
   */
  public getAccessories(): Observable<CarAccessory[]> {
    return this.http.get<CarAccessory[]>(`${ this.baseUrl }/accessories`);
  }

  /**
   * Returns the default car preferences.
   *
   * @public
   *
   * @returns  {Observable<CarPreferences[]>}
   */
  public getDefaultCarPreferences(): Observable<CarPreferences> {
    return this.http.get<CarPreferences>(`${ this.baseUrl }/defaultCarPreferences`);
  }
}
