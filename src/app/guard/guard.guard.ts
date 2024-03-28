import { CanActivateFn } from '@angular/router';

export const guard: CanActivateFn = (route, state) => {
  return true;
};
