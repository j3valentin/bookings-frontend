import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveComponentModule } from '@ngrx/component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { BookingsComponent } from './bookings/bookings.component';
import { BookingSearchComponent } from './booking-search/booking-search.component';
import { MessagesComponent } from './messages/messages.component';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),

    BrowserAnimationsModule,

    StoreModule.forRoot(reducers, {
      metaReducers
    }),

    StoreDevtoolsModule.instrument({
      // maxAge: 10,
      maxAge: 25,
      logOnly: environment.production
    }),

    ReactiveComponentModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    BookingsComponent,
    BookingDetailComponent,
    MessagesComponent,
    BookingSearchComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
