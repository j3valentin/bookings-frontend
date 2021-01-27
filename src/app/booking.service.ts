import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Booking } from './booking';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class BookingService {

  private bookingsUrl = 'api/bookings';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET bookings from the server */
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.bookingsUrl)
      .pipe(
        tap(_ => this.log('fetched bookings')),
        // map(bookings => bookings.items || []),
        catchError(this.handleError<Booking[]>('getBookings', []))
      );
  }

  /** GET booking by id. Return `undefined` when id not found */
  getBookNo404<Data>(id: number): Observable<Booking> {
    const url = `${this.bookingsUrl}/?id=${id}`;
    return this.http.get<Booking[]>(url)
      .pipe(
        map(bookings => bookings[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} booking id=${id}`);
        }),
        catchError(this.handleError<Booking>(`getBooking id=${id}`))
      );
  }

  /** GET booking by id. Will 404 if id not found */
  getBooking(id: number): Observable<Booking> {
    const url = `${this.bookingsUrl}/${id}`;
    return this.http.get<Booking>(url).pipe(
      tap(_ => this.log(`fetched booking id=${id}`)),
      catchError(this.handleError<Booking>(`getBooking id=${id}`))
    );
  }

  /* GET bookings whose name contains search term */
  searchBookings(term: string): Observable<Booking[]> {
    if (!term.trim()) {
      // if not search term, return empty booking array.
      return of([]);
    }
    return this.http.get<Booking[]>(`${this.bookingsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found bookings matching "${term}"`) :
         this.log(`no bookings matching "${term}"`)),
      catchError(this.handleError<Booking[]>('searchBookings', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new booking to the server */
  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.bookingsUrl, booking, this.httpOptions).pipe(
      tap((newBook: Booking) => this.log(`added booking w/ id=${newBook.id}`)),
      catchError(this.handleError<Booking>('addBooking'))
    );
  }

  /** DELETE: delete the booking from the server */
  deleteBooking(booking: Booking | number): Observable<Booking> {
    const id = typeof booking === 'number' ? booking : booking.id;
    const url = `${this.bookingsUrl}/${id}`;

    return this.http.delete<Booking>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted booking id=${id}`)),
      catchError(this.handleError<Booking>('deleteBooking'))
    );
  }

  /** PUT: update the booking on the server */
  updateBooking(booking: Booking): Observable<any> {
    const id = typeof booking === 'number' ? booking : booking.id;
    const url = `${this.bookingsUrl}/${id}`;

    return this.http.put(url, booking, this.httpOptions).pipe(
      tap(_ => this.log(`updated booking id=${booking.id}`)),
      catchError(this.handleError<any>('updateBooking'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a BookingService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`BookingService: ${message}`);
  }
}
