import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { SubSink } from 'subsink';

import { addBooking, getBookings, removeBooking } from '../actions/bookings.actions';
import { Booking } from '../booking';
import { BookingService } from '../booking.service';
import { selectBookings } from '../state/bookings.selectors';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  bookings$ = this.store.pipe(select(selectBookings));

  bookingForm = this.formBuilder.group({
    passengerName: '',
    passengerContactNumber: '',
    asap: true,
    numberOfPassengers: 1,
    price: 0
  });

  constructor(
    private bookingService: BookingService,
    private formBuilder: FormBuilder,
    private store: Store
  ) { }

  ngOnInit() {
    this.getBookings();
  }

  getBookings(): void {
    this.subs.add(this.bookingService.getBookings()
      .subscribe(bookings => this.store.dispatch(getBookings({ bookings }))));
  }

  onSubmit(): void {
    const booking: Booking = this.bookingForm.value;
    this.subs.add(this.bookingService.addBooking(booking)
      .subscribe(_ => this.store.dispatch(addBooking({ booking }))));

    this.bookingForm.reset();
  }

  delete(bookingId: number): void {
    this.subs.add(this.bookingService.deleteBooking(bookingId)
      .subscribe(_ => this.store.dispatch(removeBooking({ bookingId }))));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
