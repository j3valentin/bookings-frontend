import { createAction, props } from '@ngrx/store';
import { Booking } from '../booking';

export const getBooking = createAction(
  '[Booking One/API] Retrieve Booking Success',
  props<{ booking: Booking }>()
);

export const updateBooking = createAction(
  '[Booking Patch/API] Update Booking',
  props<{ booking: Booking }>()
);
