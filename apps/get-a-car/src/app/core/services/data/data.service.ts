import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BillingInfo, Car, CarAccessory, CarPreferences } from '@guilhermeSousa1/core/data-models';

/**
 * Service used to get and edit static data.
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
   * @returns  {Observable<CarPreferences>}
   */
  public getDefaultCarPreferences(): Observable<CarPreferences> {
    return this.http.get<CarPreferences>(`${ this.baseUrl }/defaultCarPreferences`);
  }

  /**
   * Returns the billing info.
   *
   * @public
   *
   * @returns  {Observable<BillingInfo>}
   */
  public getBillingInfo(): Observable<BillingInfo[]> {
    return this.http.get<BillingInfo[]>(`${ this.baseUrl }/billingInfo`);
  }

  /**
   * Updates the billing info.
   *
   * @public
   * @param billingInfo  The billing info
   * @returns            {Observable<any>}
   */
  public updateBillingInfo(billingInfo: BillingInfo): Observable<any> {
    return this.http.put<any>(`${ this.baseUrl }/billingInfo`, { ...billingInfo, id: 1 });
  }
}
