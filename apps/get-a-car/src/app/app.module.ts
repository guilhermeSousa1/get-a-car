import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ComponentsModule } from '@guilhermeSousa1/shared/components/components.module';
import { MaterialModule } from '@guilhermeSousa1/material.module';
import { InMemoryDataService } from '@guilhermeSousa1/core/services/in-memory-data/in-memory-data.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ComponentsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, delay: 0 }
    ),
    MaterialModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
