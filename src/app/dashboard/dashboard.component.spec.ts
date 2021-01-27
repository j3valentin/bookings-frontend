import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { BookingSearchComponent } from '../booking-search/booking-search.component';
import { BookingService } from '../booking.service';
import { BOOKINGS } from '../mock-bookings';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let bookingService;
  let getBookingsSpy;

  beforeEach(waitForAsync(() => {
    bookingService = jasmine.createSpyObj('BookingService', ['getBookings']);
    getBookingsSpy = bookingService.getBookings.and.returnValue(of(BOOKINGS));
    TestBed
        .configureTestingModule({
          declarations: [DashboardComponent, BookingSearchComponent],
          imports: [RouterTestingModule.withRoutes([])],
          providers: [{provide: BookingService, useValue: bookingService}]
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top Bookings" as headline', () => {
    expect(fixture.nativeElement.querySelector('h3').textContent).toEqual('Top Bookings');
  });

  it('should call bookingService', waitForAsync(() => {
       expect(getBookingsSpy.calls.any()).toBe(true);
     }));

  it('should display 4 links', waitForAsync(() => {
       expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
     }));
});
