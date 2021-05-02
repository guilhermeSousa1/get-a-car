import { ChargingCable, DriveMode, DriveSystem, RadioStation, Reservation, ReservationStatus } from '@guilhermeSousa1/core/data-models';

export const testReservations: Reservation[] = [
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
    status:           ReservationStatus.PLANNED
  },
  {
    id:      2,
    details: {
      address:     'London HA9 0WS, United Kingdom',
      startDate:   1614585600000,
      endDate:     1615388400000,
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
    status:           ReservationStatus.FINISHED
  }
];
