import { createSelector } from "@ngrx/store";

import { Booking } from "../booking";
import { State } from "../reducers";

export const selectBooking = createSelector(
  (state: State) => state.booking,
  (booking: Booking) => booking
);
