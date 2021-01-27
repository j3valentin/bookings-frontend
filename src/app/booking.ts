import { TripWaypoint } from "./trip-waypoint";

export interface Booking {
  id?: number;
  passengerName: string;
  passengerContactNumber: string;
  pickupTime?: Date;
  asap: boolean;
  waitingTime?: number;
  numberOfPassengers: number;
  price: number;
  rating?: number;

  createdOn?: Date;
  lastModifiedOn?: Date;

  tripWayPoints: TripWaypoint[];
}
