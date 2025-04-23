import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthServicesService } from '../auth-services.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthServicesService);
  
  // Clone the request to add withCredentials
  req = req.clone({
    withCredentials: true
  });
  
  // Get token from localStorage
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      // Check if token is nested inside a token object
      const accessToken = user?.token?.accessToken || user?.token;
      
      if (accessToken) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      }
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
    }
  }
  
  return next(req);
}; 