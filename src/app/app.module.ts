import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppMaterialModule} from "./material/app-material.module";
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatButton} from "@angular/material/button";
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import {HttpClientModule} from "@angular/common/http";
import { CardElementComponent } from './components/card-element/card-element.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    BlogCardComponent,
    CardElementComponent
  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
