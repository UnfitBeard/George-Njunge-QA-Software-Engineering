import { CanActivateFn, Router } from '@angular/router';
import { AuthServicesService } from '../auth-services.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServicesService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();
  console.log('Is Authenticated:', isAuthenticated); // Log to check authentication status

  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};

