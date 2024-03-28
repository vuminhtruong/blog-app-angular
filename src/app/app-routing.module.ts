import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {BlogCardComponent} from "./components/blog-card/blog-card.component";
import {PostDetailComponent} from "./components/post-detail/post-detail.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {guard} from "./guard/guard.guard";
import {UserComponent} from "./components/user/user.component";
import {NewPostComponent} from "./components/new-post/new-post.component";

const routes: Routes = [
  {path: '', component: BlogCardComponent},
  {path: 'post-detail/:id', component: PostDetailComponent},
  {path: 'login',component: LoginComponent, canActivate: [guard]},
  {path: 'register',component: RegisterComponent},
  {path: 'user-detail',component: UserComponent},
  {path: 'new-post',component: NewPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
