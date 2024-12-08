import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/']);
    return false;
  }

  const userRole: any = authService.getUserRole();
  const allowedRoles = route.data['roles'] as Array<string>;
  console.log('User Role:', userRole);

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    router.navigate(['/not-found']);
    return false;
  }

  return true;
};
