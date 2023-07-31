import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/auth/service/auth.service';
import { catchError, map, of, switchMap } from 'rxjs';
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

  if (isUserLoggedIn) {
    console.log("guard call")
    if (currentRoute === 'login' || currentRoute === 'signup' || currentRoute === '') {
      sharedService.showAlert("Looks like You are not Authorize to Access this page!", "error");
      router.navigate(['/dashboard']);
      return false;
    } else {
      let x = true;
      const userId = parseInt(isUserLoggedIn, 10);
      authService.hasRouteAccess(userId, currentRoute).subscribe((res) => {
        x = res;
        if (x === true) {
          return true;
        } else {
          if (currentRoute !== 'dashboard') {
            sharedService.showAlert("Looks like You are not Authorize to Access this page!", "error");
            router.navigate(['/dashboard']);
            return false;
          } else {
            router.navigate(['/dashboard']);
            return false;
          }
        }
      })
      return x;
    }
  } else {
    if (currentRoute === 'login' || currentRoute === 'signup' || currentRoute === '') {
      return true;
    } else {
      sharedService.showAlert("Looks like You are not Authorize to Access this page!", "error");
      router.navigate(['/login']);
      return false;
    }
  }
}
