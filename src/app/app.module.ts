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
import {Routes} from "@angular/router";
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { CommentComponent } from './components/comment/comment.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    BlogCardComponent,
    CardElementComponent,
    PostDetailComponent,
    LoginComponent,
    RegisterComponent,
    CommentComponent
  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
