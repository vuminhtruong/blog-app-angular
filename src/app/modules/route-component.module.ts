import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "../components/login/login.component";
import {RegisterComponent} from "../components/register/register.component";
import {UserComponent} from "../components/user/user.component";
import {NewPostComponent} from "../components/new-post/new-post.component";
import {NewCategoryComponent} from "../components/new-category/new-category.component";
import {ImageLibraryComponent} from "../components/image-library/image-library.component";
import {AppMaterialModule} from "../material/app-material.module";
import {FormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AppRoutingModule} from "../app-routing.module";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserComponent,
    NewPostComponent,
    NewCategoryComponent,
    ImageLibraryComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    FontAwesomeModule,
    AppRoutingModule
  ]
})
export class RouteComponentModule { }
