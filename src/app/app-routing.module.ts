import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {BlogCardComponent} from "./components/blog-card/blog-card.component";
import {PostDetailComponent} from "./components/post-detail/post-detail.component";

const routes: Routes = [
  {path: '', component: BlogCardComponent},
  {path: 'post-detail/:id', component: PostDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
