import { createSelector } from "@ngrx/store";

import { Booking } from "../booking";
import { State } from "../reducers";

export const selectBookings = createSelector(
  (state: State) => state.bookings,
  (bookings: Array<Booking>) => bookings
);
