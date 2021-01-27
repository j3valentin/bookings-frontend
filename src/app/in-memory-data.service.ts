import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Booking } from './booking';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const bookings = [
      // { id: 11, passengerName: 'Dr Nice' },
      // { id: 12, passengerName: 'Narco' },
      // { id: 13, passengerName: 'Bombasto' },
      // { id: 14, passengerName: 'Celeritas' },
      // { id: 15, passengerName: 'Magneta' },
      // { id: 16, passengerName: 'RubberMan' },
      // { id: 17, passengerName: 'Dynama' },
      // { id: 18, passengerName: 'Dr IQ' },
      // { id: 19, passengerName: 'Magma' },
      // { id: 20, passengerName: 'Tornado' }
    ];
    return {bookings};
  }

  // Overrides the genId method to ensure that a booking always has an id.
  // If the bookings array is empty,
  // the method below returns the initial number (11).
  // if the bookings array is not empty, the method below returns the highest
  // booking id + 1.
  genId(bookings: Booking[]): number {
    return bookings.length > 0 ? Math.max(...bookings.map(booking => booking.id)) + 1 : 11;
  }
}
