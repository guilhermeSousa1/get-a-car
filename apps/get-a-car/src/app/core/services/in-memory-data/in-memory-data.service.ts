import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { BillingInfo, Car, CarAccessory, CarPreferences, ChargingCable, DriveMode, DriveSystem, RadioStation, Reservation, ReservationStatus } from '@guilhermeSousa1/core/data-models';

/**
 * Service used for the in memory data.
 */
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  /**
   * Generates the in memory database
   *
   * @public
   */
  public createDb() {
    const accessories: CarAccessory[] = [
      {
        name:  'Dog seat hammock',
        price: 10,
        id:    1
      },
      {
        name:  'Snow chains',
        price: 25,
        id:    2
      },
      {
        name:  'Surfboard rack',
        price: 10,
        id:    3
      },
      {
        name:  'Trailer',
        price: 30,
        id:    4
      }
    ];

    const cars: Car[] = [
      {
        id:          1,
        brand:       'jeep',
        model:       'wrangler',
        seats:       5,
        driveSystem: DriveSystem.AWD,
        fuelMileage: 24
      },
      {
        id:          2,
        brand:       'toyota',
        model:       'prius',
        seats:       5,
        driveSystem: DriveSystem.FWD,
        fuelMileage: 54
      }
    ];

    const defaultCarPreferences: CarPreferences = {
      radioStation:  RadioStation.AMAZING_BLUES,
      temperature:   20,
      driveMode:     DriveMode.COMFORT,
      chargingCable: ChargingCable.LIGHTNING
    };

    const reservations: Reservation[] = [
      {
        id:      1,
        details: {
          address:     'Westminster, London SW1A 0AA, United Kingdom',
          startDate:   1612692000000,
          endDate:     1612821600000,
          drivingDays: 2
        },
        car: {
          id:          2,
          brand:       'toyota',
          model:       'prius',
          seats:       5,
          driveSystem: DriveSystem.FWD,
          fuelMileage: 54
        },
        carPreferences: {
          radioStation:  RadioStation.KISS_FM,
          temperature:   25,
          driveMode:     DriveMode.ECO,
          chargingCable: ChargingCable.USB_C
        },
        accessories: [
          {
            name:  'Snow chains',
            price: 25,
            id:    2
          },
          {
            name:  'Trailer',
            price: 30,
            id:    4
          }
        ],
        additionalCharge: 55,
        status:           ReservationStatus.FINISHED
      },
      {
        id:      2,
        details: {
          address:     'London HA9 0WS, United Kingdom',
          startDate:   1614585600000,
          endDate:     1615388400000,
          drivingDays: 10
        },
        car: {
          id:          1,
          brand:       'jeep',
          model:       'wrangler',
          seats:       5,
          driveSystem: DriveSystem.AWD,
          fuelMileage: 24
        },
        carPreferences: {
          radioStation:  RadioStation.NEW_VEGAS,
          temperature:   18,
          driveMode:     DriveMode.SPORT,
          chargingCable: ChargingCable.MICRO_USB
        },
        accessories: [
          {
            name:  'Surfboard rack',
            price: 10,
            id:    3
          }
        ],
        additionalCharge: 10,
        status:           ReservationStatus.CANCELLED
      },
      {
        id:      3,
        details: {
          address:     'Museumstraat 1, 1071 XX Amsterdam, Netherlands',
          startDate:   1609484400000,
          endDate:     1609538400000,
          drivingDays: 1
        },
        car: {
          id:          1,
          brand:       'jeep',
          model:       'wrangler',
          seats:       5,
          driveSystem: DriveSystem.AWD,
          fuelMileage: 24
        },
        carPreferences: {
          radioStation:  RadioStation.KISS_FM,
          temperature:   26,
          driveMode:     DriveMode.ECO,
          chargingCable: ChargingCable.MICRO_USB
        },
        accessories: [
          {
            name:  'Dog seat hammock',
            price: 10,
            id:    1
          },
          {
            name:  'Snow chains',
            price: 25,
            id:    2
          },
          {
            name:  'Surfboard rack',
            price: 10,
            id:    3
          },
          {
            name:  'Trailer',
            price: 30,
            id:    4
          }
        ],
        additionalCharge: 75,
        status:           ReservationStatus.CANCELLED
      },
      {
        id:      4,
        details: {
          address:     'Viale di Vedano, 5, 20900 Monza MB, Italy',
          startDate:   1609768800000,
          endDate:     1611172800000,
          drivingDays: 17
        },
        car: {
          id:          2,
          brand:       'toyota',
          model:       'prius',
          seats:       5,
          driveSystem: DriveSystem.FWD,
          fuelMileage: 54
        },
        carPreferences: {
          radioStation:  RadioStation.AMAZING_BLUES,
          temperature:   20,
          driveMode:     DriveMode.COMFORT,
          chargingCable: ChargingCable.LIGHTNING
        },
        accessories: [
          {
            name:  'Surfboard rack',
            price: 10,
            id:    3
          },
          {
            name:  'Trailer',
            price: 30,
            id:    4
          },
          {
            name:  'Dog seat hammock',
            price: 10,
            id:    1
          }
        ],
        additionalCharge: 50,
        status:           ReservationStatus.FINISHED
      },
      {
        id:      5,
        details: {
          address:     'Sítio do Escampadinho, Mexilhoeira Grande, 8500-148 Portimão',
          startDate:   1619787600000,
          endDate:     1619982000000,
          drivingDays: 3
        },
        car: {
          id:          1,
          brand:       'jeep',
          model:       'wrangler',
          seats:       5,
          driveSystem: DriveSystem.AWD,
          fuelMileage: 24
        },
        carPreferences: {
          radioStation:  RadioStation.NEW_VEGAS,
          temperature:   17,
          driveMode:     DriveMode.ECO,
          chargingCable: ChargingCable.LIGHTNING
        },
        accessories: [
          {
            name:  'Trailer',
            price: 30,
            id:    4
          }
        ],
        additionalCharge: 30,
        status:           ReservationStatus.FINISHED
      },
      {
        id:      6,
        details: {
          address:     'Mogyoród, Hungaroring utca 10, 2146 Hungary',
          startDate:   1616220000000,
          endDate:     1616587200000,
          drivingDays: 5
        },
        car: {
          id:          2,
          brand:       'toyota',
          model:       'prius',
          seats:       5,
          driveSystem: DriveSystem.FWD,
          fuelMileage: 54
        },
        carPreferences: {
          radioStation:  RadioStation.KISS_FM,
          temperature:   24,
          driveMode:     DriveMode.COMFORT,
          chargingCable: ChargingCable.MICRO_USB
        },
        accessories:      [],
        additionalCharge: 0,
        status:           ReservationStatus.CANCELLED
      },
      {
        id:      7,
        details: {
          address:     'Westminster, London SW1A 0AA, United Kingdom',
          startDate:   1634889600000,
          endDate:     1635184800000,
          drivingDays: 2
        },
        car: {
          id:          2,
          brand:       'toyota',
          model:       'prius',
          seats:       5,
          driveSystem: DriveSystem.FWD,
          fuelMileage: 54
        },
        carPreferences: {
          radioStation:  RadioStation.KISS_FM,
          temperature:   25,
          driveMode:     DriveMode.ECO,
          chargingCable: ChargingCable.USB_C
        },
        accessories: [
          {
            name:  'Snow chains',
            price: 25,
            id:    2
          },
          {
            name:  'Trailer',
            price: 30,
            id:    4
          }
        ],
        additionalCharge: 55,
        status:           ReservationStatus.PLANNED
      },
      {
        id:      8,
        details: {
          address:     'London HA9 0WS, United Kingdom',
          startDate:   1631685600000,
          endDate:     1632146400000,
          drivingDays: 10
        },
        car: {
          id:          1,
          brand:       'jeep',
          model:       'wrangler',
          seats:       5,
          driveSystem: DriveSystem.AWD,
          fuelMileage: 24
        },
        carPreferences: {
          radioStation:  RadioStation.NEW_VEGAS,
          temperature:   18,
          driveMode:     DriveMode.SPORT,
          chargingCable: ChargingCable.MICRO_USB
        },
        accessories: [
          {
            name:  'Surfboard rack',
            price: 10,
            id:    3
          }
        ],
        additionalCharge: 10,
        status:           ReservationStatus.PLANNED
      },
      {
        id:      9,
        details: {
          address:     '2760 Route des Hauts du Camp, DN8, 83330 Le Castellet, France',
          startDate:   1638356400000,
          endDate:     1638626400000,
          drivingDays: 4
        },
        car: {
          id:          2,
          brand:       'toyota',
          model:       'prius',
          seats:       5,
          driveSystem: DriveSystem.FWD,
          fuelMileage: 54
        },
        carPreferences: {
          radioStation:  RadioStation.AMAZING_BLUES,
          temperature:   21,
          driveMode:     DriveMode.ECO,
          chargingCable: ChargingCable.LIGHTNING
        },
        accessories: [
          {
            name:  'Surfboard rack',
            price: 10,
            id:    3
          },
          {
            name:  'Trailer',
            price: 30,
            id:    4
          },
          {
            name:  'Dog seat hammock',
            price: 10,
            id:    1
          }
        ],
        additionalCharge: 50,
        status:           ReservationStatus.PLANNED
      },
      {
        id:      10,
        details: {
          address:     'Red Bull Ring Str. 1, 8724 Spielberg, Austria',
          startDate:   1637420400000,
          endDate:     1637834400000,
          drivingDays: 6
        },
        car: {
          id:          1,
          brand:       'jeep',
          model:       'wrangler',
          seats:       5,
          driveSystem: DriveSystem.AWD,
          fuelMileage: 24
        },
        carPreferences: {
          radioStation:  RadioStation.KISS_FM,
          temperature:   27,
          driveMode:     DriveMode.COMFORT,
          chargingCable: ChargingCable.USB_C
        },
        accessories:      [],
        additionalCharge: 0,
        status:           ReservationStatus.PLANNED
      },
      {
        id:      11,
        details: {
          address:     'Piazza Ayrton Senna da Silva, 1, 40026 Imola BO, Italy',
          startDate:   1636556400000,
          endDate:     1636801200000,
          drivingDays: 4
        },
        car: {
          id:          2,
          brand:       'toyota',
          model:       'prius',
          seats:       5,
          driveSystem: DriveSystem.FWD,
          fuelMileage: 54
        },
        carPreferences: {
          radioStation:  RadioStation.NEW_VEGAS,
          temperature:   18,
          driveMode:     DriveMode.SPORT,
          chargingCable: ChargingCable.MICRO_USB
        },
        accessories: [
          {
            name:  'Dog seat hammock',
            price: 10,
            id:    1
          },
          {
            name:  'Snow chains',
            price: 25,
            id:    2
          },
          {
            name:  'Surfboard rack',
            price: 10,
            id:    3
          },
          {
            name:  'Trailer',
            price: 30,
            id:    4
          }
        ],
        additionalCharge: 75,
        status:           ReservationStatus.PLANNED
      },
      {
        id:      12,
        details: {
          address:     'Senni-San Carlo, 15, 50038 Scarperia e San Piero FI, Italy',
          startDate:   1639306800000,
          endDate:     1639591200000,
          drivingDays: 4
        },
        car: {
          id:          1,
          brand:       'jeep',
          model:       'wrangler',
          seats:       5,
          driveSystem: DriveSystem.AWD,
          fuelMileage: 24
        },
        carPreferences: {
          radioStation:  RadioStation.KISS_FM,
          temperature:   22,
          driveMode:     DriveMode.COMFORT,
          chargingCable: ChargingCable.LIGHTNING
        },
        accessories: [
          {
            name:  'Dog seat hammock',
            price: 10,
            id:    1
          },
          {
            name:  'Trailer',
            price: 30,
            id:    4
          }
        ],
        additionalCharge: 40,
        status:           ReservationStatus.PLANNED
      }
    ];

    const billingInfo: BillingInfo[] = [
      {
        id:                 1,
        postalCode:         '20900',
        cardHolderName:     'John Doe',
        cardNumber:         5105105105105100,
        cardExpirationDate: '12 / 22',
        cardCCV:            223
      }
    ];

    return { accessories, cars, defaultCarPreferences, reservations, billingInfo };
  }

  /**
   * Id generator for the reservations.
   *
   * @public
   *
   * @returns {number}
   */
  public genId(reservations: Reservation[]): number {
    return reservations.length + 1;
  }

  constructor() {
  }
}
