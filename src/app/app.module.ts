import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppMaterialModule} from "./material/app-material.module";
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JwtInterceptorService} from "./services/jwt-interceptor.service";
import {DialogModuleModule} from "./modules/dialog-module.module";
import {BlogModule} from "./modules/blog.module";
import {RouteComponentModule} from "./modules/route-component.module";


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    // provideClientHydration(),
    // provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
