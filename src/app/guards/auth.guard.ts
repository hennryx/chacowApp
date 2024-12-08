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

  const userRole: any = authService.getUserRole(); // Fetch user's role dynamically
  const allowedRoles = route.data['roles'] as Array<string>; // Get roles from route data

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    router.navigate(['/not-found']); // Redirect if the role is not allowed
    return false;
  }

  return true;
};
