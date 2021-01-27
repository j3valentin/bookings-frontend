import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { Booking } from '../booking';
import { bookingReducer } from './booking.reducer';
import { bookingsReducer } from './bookings.reducer';

export interface State {
  bookings: ReadonlyArray<Booking>;
  booking: Booking;
}

export const reducers: ActionReducerMap<State> = {
  bookings: bookingsReducer,
  booking: bookingReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
