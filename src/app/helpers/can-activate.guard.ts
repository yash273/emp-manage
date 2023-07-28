import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/auth/service/auth.service';
import { map } from 'rxjs';

export const canActivateGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  let currentRoute = state.url.slice(1);
  const isUserLoggedIn = localStorage.getItem('loggedUserId');

  let parts: string[] = currentRoute.split('/');
  let lastPart = parts.pop();
  if (!isNaN(Number(lastPart)) && parts[parts.length - 1] === "edit") {
    currentRoute = parts.join('/');
  } else {
    currentRoute = state.url.slice(1);
  }

  if (!isUserLoggedIn) {
    router.navigate(['/login']);
    return false;
  } else if (currentRoute !== null && currentRoute !== 'login' && currentRoute !== 'signup') {
    const userId = parseInt(isUserLoggedIn, 10);
    return authService.hasRouteAccess(userId, currentRoute).pipe(
      map(hasAccess => {
        if (hasAccess) {
          return true;
        } else {
          router.navigate(['/dashboard']);
          return false;
        }
      })
    );
  } else {
    router.navigate(['/login']);
    return false;
  }
};
