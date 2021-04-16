import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Car, CarAccessory, CarPreferences, ReservationDetails } from '@guilhermeSousa1/shared/data-models';
import { DataService } from '@guilhermeSousa1/core/services/data/data.service';

/**
 * Service used to manage the data for the creation, edition and cancellation of a reservation.
 */
@Injectable()
export class ReservationService {

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
        this.carPreferencesSource?.next(defaultCarPreferences);
      });
  }

  /**
   * Updates the car accessories.
   *
   * @public
   *
   * @param carAccessories  The car accessories
   */
  public updateCarAccessories(carAccessories: CarAccessory[]): void {
    if (carAccessories) {
      this.carAccessoriesSource?.next(carAccessories);
    }
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
}
