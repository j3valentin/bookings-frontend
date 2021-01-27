import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Booking } from '../booking';
import { BookingService } from '../booking.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: [ './booking-detail.component.css' ]
})
export class BookingDetailComponent implements OnInit {
  booking: Booking;

  bookingForm = this.formBuilder.group({
    passengerName: '',
    passengerContactNumber: '',
    asap: true,
    numberOfPassengers: 1,
    price: 0
  });

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getBooking();
  }

  getBooking(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookingService.getBooking(id)
      .subscribe(booking => (this.booking = booking));
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.bookingService.updateBooking(this.booking)
      .subscribe(() => this.goBack());
  }
}
