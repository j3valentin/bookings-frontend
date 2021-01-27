import { createReducer, on } from '@ngrx/store';

import { getBookings, addBooking, removeBooking } from '../actions/bookings.actions';
import { Booking } from '../booking';

export const initialState: ReadonlyArray<Booking> = [];

export const bookingsReducer = createReducer(
  initialState,
  on(getBookings, (_, { bookings }) => [...bookings]),
  on(addBooking, (state, { booking }) => {
    // if (state.indexOf(booking) > -1) return state;

    return [...state, booking];
  }),
  on(removeBooking, (state, { bookingId }) => state.filter(booking => booking.id !== bookingId))
);
