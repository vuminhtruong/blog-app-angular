import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppMaterialModule} from "./material/app-material.module";
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatButton} from "@angular/material/button";
import {BlogCardComponent} from './components/blog-card/blog-card.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CardElementComponent} from './components/card-element/card-element.component';
import {Routes} from "@angular/router";
import {PostDetailComponent} from './components/post-detail/post-detail.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CommentComponent} from './components/comment/comment.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PaginationComponent} from './components/pagination/pagination.component';
import {PageSizeComponent} from './components/page-size/page-size.component';
import {UserComponent} from './components/user/user.component';
import {NewPostComponent} from './components/new-post/new-post.component';
import {JwtInterceptorService} from "./services/jwt-interceptor.service";
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { CommentDialogComponent } from './dialog/comment-dialog/comment-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    BlogCardComponent,
    CardElementComponent,
    PostDetailComponent,
    LoginComponent,
    RegisterComponent,
    CommentComponent,
    PaginationComponent,
    PageSizeComponent,
    UserComponent,
    NewPostComponent,
    NewCategoryComponent,
    CommentDialogComponent,
  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: JwtInterceptorService,
    //   multi: true
    // },
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
