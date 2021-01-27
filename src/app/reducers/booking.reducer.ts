import { createReducer, on } from '@ngrx/store';

import { getBooking, updateBooking } from '../actions/booking.actions';
import { Booking } from '../booking';

export const initialState: Booking = {
  passengerName: '',
  passengerContactNumber: '',
  asap: true,
  numberOfPassengers: 1,
  price: 0,
  tripWayPoints: []
};

export const bookingReducer = createReducer(
  initialState,
  on(getBooking, (_, { booking }) => ({ ...booking })),
  on(updateBooking, (state, { booking }) => ({ ...state, ...booking }))
);
