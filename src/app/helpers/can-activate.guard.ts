import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/auth/service/auth.service';
import { map } from 'rxjs';
import { SharedService } from 'src/shared/service/shared.service';

export const canActivateGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const sharedService = inject(SharedService);
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
  }
  else if (isUserLoggedIn && currentRoute !== 'login' && currentRoute !== 'signup' && currentRoute !== '') {
    const userId = parseInt(isUserLoggedIn, 10);
    return authService.hasRouteAccess(userId, currentRoute).pipe(
      map(hasAccess => {
        if (hasAccess) {
          console.log("hi")
          return true;
        } else {
          sharedService.showAlert("Looks like You are not Authorize to Access this page!", "error");
          router.navigate(['/dashboard']);
          return false;
        }
      })
    );
  }
  else if (isUserLoggedIn) {
    router.navigate(['/dashboard']);
    return true;
  } else {
    sharedService.showAlert("Oops! Something Went Wrong!", 'default');
    router.navigate(['/login']);
    return true;
  }

};
