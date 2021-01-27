import { Booking } from "./booking";

export interface TripWaypoint {
  id: number;
  booking: Booking;
  locality: string;
  latitude: number;
  longitude: number;
}
