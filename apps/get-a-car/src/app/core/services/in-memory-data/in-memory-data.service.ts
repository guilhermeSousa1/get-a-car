import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Car, CarAccessory, CarPreferences, ChargingCable, DriveMode, DriveSystem, RadioStation, Reservation, ReservationStatus } from '@guilhermeSousa1/shared/data-models';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
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

    const pastReservations: Reservation[] = [
      {
        id:      1,
        details: {
          address:     'Westminster, London SW1A 0AA, United Kingdom',
          startDate:   1612692000,
          endDate:     1612821600,
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
          startDate:   1614585600,
          endDate:     1615388400,
          drivingDays: 11
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
          startDate:   1609484400,
          endDate:     1609538400,
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
          startDate:   1609768800,
          endDate:     1611172800,
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
      }
    ];

    const plannedReservations: Reservation[] = [
      {
        id:      5,
        details: {
          address:     'Westminster, London SW1A 0AA, United Kingdom',
          startDate:   1612692000,
          endDate:     1612821600,
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
        id:      6,
        details: {
          address:     'London HA9 0WS, United Kingdom',
          startDate:   1614585600,
          endDate:     1615388400,
          drivingDays: 11
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
      }
    ];

    return { accessories, cars, defaultCarPreferences, pastReservations, plannedReservations };
  }

  constructor() {
  }
}
