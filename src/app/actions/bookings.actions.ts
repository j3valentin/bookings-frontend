import { createAction, props } from '@ngrx/store';
import { Booking } from '../booking';

export const getBookings = createAction(
  '[Booking List/API] Retrieve Bookings Success',
  props<{ bookings: Booking[] }>()
);

export const addBooking = createAction(
  '[Booking Post/API] Create Booking',
  props<{ booking: Booking }>()
);

export const removeBooking = createAction(
  '[Booking Delete/API] Remove Booking',
  props<{ bookingId: number }>()
);
