import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../http/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (authService.isAuthenticated()) {
    return true;
  }
  const loginPath = router.parseUrl('/login');
  return new RedirectCommand(loginPath, {
    skipLocationChange: true,
  });
};
