import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { Booking } from '../booking';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  bookings: Booking[] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.getBookings();
  }

  getBookings(): void {
    this.subs.add(this.bookingService.getBookings()
      .subscribe(bookings => this.bookings = bookings.slice(1, 5)));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
