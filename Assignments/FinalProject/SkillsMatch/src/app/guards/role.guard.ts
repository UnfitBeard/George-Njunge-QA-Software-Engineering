import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesService } from '../auth-services.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServicesService);
  const router = inject(Router);

  const expectedRole = route.data['role'];
  const userRole = authService.getCurrentUserRole();

  console.log('Expected Role:', expectedRole);
  console.log('User Role:', userRole);

  if (userRole === expectedRole) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};

