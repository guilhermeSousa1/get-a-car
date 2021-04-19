import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Car, CarAccessory, CarPreferences, Reservation, ReservationDetails, ReservationStatus } from '@guilhermeSousa1/shared/data-models';
import { DataService } from '@guilhermeSousa1/core/services/data/data.service';

/**
 * Service used to manage the data for the creation, edition and cancellation of a reservation.
 */
@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  /** The default car preferences */
  private defaultCarPreferences: CarPreferences;

  /** The source for the car accessories */
  private readonly carAccessoriesSource = new BehaviorSubject<CarAccessory[]>([]);
  /** The source for the car preferences  */
  private readonly carPreferencesSource = new BehaviorSubject<CarPreferences>(null);
  /** The source for the car */
  private readonly carSource = new BehaviorSubject<Car>(null);
  /** The source for the reservation details  */
  private readonly detailsSource = new BehaviorSubject<ReservationDetails>(null);
  /** The source for the invalid same day reservation */
  private readonly invalidSameDayReservationSource = new BehaviorSubject<boolean>(false);

  /** Exposed observable for the car accessories */
  public readonly carAccessories$ = this.carAccessoriesSource?.asObservable();
  /** Exposed observable for the car preferences */
  public readonly carPreferences$ = this.carPreferencesSource?.asObservable();
  /** Exposed observable for the car */
  public readonly car$ = this.carSource?.asObservable();
  /** Exposed observable for the details */
  public readonly details$ = this.detailsSource?.asObservable();
  /** Exposed observable for the invalid same day reservation */
  public readonly invalidSameDayReservation$ = this.invalidSameDayReservationSource?.asObservable();

  /**
   * Class constructor.
   *
   * @public
   *
   * @param dataService  Injection of the Data service
   */
  constructor(private dataService: DataService) {
    this.dataService?.getDefaultCarPreferences()
      .pipe(take(1))
      .subscribe((defaultCarPreferences) => {
        this.defaultCarPreferences = defaultCarPreferences;
        this.carPreferencesSource?.next(defaultCarPreferences);
      });
  }

  /**
   * Updates the car accessories.
   *
   * @public
   *
   * @param carAccessory  The car accessory
   */
  public updateCarAccessories(carAccessory: CarAccessory): void {
    const selectedCarAccessories = this.carAccessoriesSource?.getValue();

    if (selectedCarAccessories?.some((selectedAccessory) => selectedAccessory.id === carAccessory.id)) {
      this.carAccessoriesSource?.next(selectedCarAccessories?.filter((selectedAccessory) => selectedAccessory.id !== carAccessory.id));
    } else {
      this.carAccessoriesSource?.next([...selectedCarAccessories, carAccessory]);
    }
  }

  /**
   * Resets the source subject of the car accessories.
   *
   * @public
   */
  public resetAccessories(): void {
    return this.carAccessoriesSource?.next([]);
  }

  /**
   * Returns the latest value for the car preferences.
   *
   * @public
   */
  public getCarPreferences(): CarPreferences {
    return this.carPreferencesSource?.getValue();
  }

  /**
   * Updates the car preferences.
   *
   * @public
   *
   * @param carPreferences  The car preferences
   */
  public updateCarPreferences(carPreferences: CarPreferences): void {
    if (carPreferences) {
      this.carPreferencesSource?.next(carPreferences);
    }
  }

  /**
   * Updates the car.
   *
   * @public
   *
   * @param car  The car
   */
  public updateCar(car: Car): void {
    if (car) {
      this.carSource?.next(car);
    }
  }

  /**
   * Returns the latest value for the reservation details.
   *
   * @public
   */
  public getReservationDetails(): ReservationDetails {
    return this.detailsSource?.getValue();
  }

  /**
   * Updates the reservation details.
   *
   * @public
   *
   * @param details  The reservation details
   */
  public updateDetails(details: ReservationDetails): void {
    if (details) {
      this.detailsSource?.next(details);
    } else {
      this.detailsSource?.next(null);
    }
  }

  /**
   * Updates the invalid same day reservation.
   *
   * @public
   *
   * @param invalidSameDayReservation  Flag for the invalid same day reservation
   */
  public updateInvalidSameDayReservation(invalidSameDayReservation: boolean): void {
    this.invalidSameDayReservationSource?.next(invalidSameDayReservation);
  }

  /**
   * Resets the values for the source subjects.
   *
   * @public
   */
  public resetSourceValues(): void {
    this.carAccessoriesSource?.next([]);
    this.carPreferencesSource?.next(this.defaultCarPreferences);
    this.carSource?.next(null);
    this.detailsSource?.next(null);
    this.invalidSameDayReservationSource?.next(false);
    console.log('cleared');
  }

  /**
   * Submits the reservation.
   *
   * @public
   */
  public submitReservation(): void {
    const reservation: Reservation = this.transformReservationData();
    console.log(reservation);
  }

  /**
   * Transform the reservation data.
   *
   * @private
   *
   * @return  {Reservation}
   */
  private transformReservationData(): Reservation {
    const details = this.detailsSource?.getValue();
    const car = this.carSource?.getValue();
    const carPreferences = this.carPreferencesSource?.getValue();
    const carAccessories = this.carAccessoriesSource?.getValue();
    const additionalCharge = carAccessories.reduce((accumulator, { price }) => accumulator + price, 0);


    if (details == null || car == null || carPreferences == null || carAccessories == null) {
      return null;
    }

    return {
      details,
      car,
      carPreferences,
      additionalCharge,
      accessories: carAccessories,
      status:      ReservationStatus.PLANNED
    };
  }
}
