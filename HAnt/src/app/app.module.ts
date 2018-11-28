import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RoutingModule } from './routing.module';
import { DetailsCompComponent } from './details-comp/details-comp.component';
import { MatListModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    DetailsCompComponent
  ],
  imports: [
    MatListModule,
    RoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDODnyhVd_nmbWmch-qK3114Hu2Kr4CIt4'
    })
  ],
  exports: [MatToolbarModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
