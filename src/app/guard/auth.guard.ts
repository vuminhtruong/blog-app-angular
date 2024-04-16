import {CanActivateFn, Router} from '@angular/router';
import {UserService} from "../services/user.service";
import {inject} from "@angular/core";
import {UserComponent} from "../components/user/user.component";
import {NavBarComponent} from "../components/nav-bar/nav-bar.component";

export const authGuard: CanActivateFn = (route, state) => {
  if(typeof localStorage !== 'undefined') {
    if (localStorage.getItem('username')) {
      return true;
    }
  }
  return inject(Router).navigate(['/']);
};
