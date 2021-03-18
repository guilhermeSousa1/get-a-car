import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from '@guilhermeSousa1/shared/components/components.module';
import { MaterialModule } from '@guilhermeSousa1/material.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ComponentsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
