import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MyTripsRoutingModule } from './my-trips-routing.module';
import { ComponentsModule } from '../shared/components/components.module';
import { MaterialModule } from '../material.module';
import { MyTripsPageComponent } from './page/my-trips-page.component';
import { PastTripsComponent } from './components/past-trips/past-trips.component';
import { PlannedTripsComponent } from '@guilhermeSousa1/my-trips/components/planned-trips/planned-trips.component';
import { TripDetailsDialogComponent } from '@guilhermeSousa1/my-trips/dialogs/trip-details/trip-details.dialog.component';
import { EditTripDialogComponent } from '@guilhermeSousa1/my-trips/dialogs/edit-trip/edit-trip.dialog.component';
import { CarBannerComponent } from '@guilhermeSousa1/my-trips/components/car-banner/car-banner.component';
import { PipesModule } from '@guilhermeSousa1/shared/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    MyTripsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [
    MyTripsPageComponent,
    PlannedTripsComponent,
    PastTripsComponent,
    CarBannerComponent,
    TripDetailsDialogComponent,
    EditTripDialogComponent
  ]
})
export class MyTripsModule {
}
