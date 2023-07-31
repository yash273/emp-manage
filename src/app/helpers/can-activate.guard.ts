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
      return authService.hasRouteAccess(parseInt(isUserLoggedIn, 10), currentRoute).pipe(
        map((res: boolean) => {
          if (res) {
            return true;
          } else {
            if (currentRoute !== 'dashboard') {
              sharedService.showAlert("Looks like You are not Authorize to Access this page!", "error");
              router.navigate(['/dashboard']);
              return false;
            } else {
              // router.navigate(['/dashboard']);
              return false;
            }
          }
        })
      );
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
  // return true
}
      // const userId = parseInt(isUserLoggedIn, 10);
      // return authService.hasRouteAccess(userId, currentRoute).pipe(
      //   switchMap(hasAccess => {
      //     if (hasAccess) {
      //       return of(true);
      //     } else {
      //       if (currentRoute !== 'dashboard') {
      //         sharedService.showAlert("Looks like You are not Authorize to Access this page!", "error");
      //       }
      //       router.navigate(['/dashboard']);
      //       return of(false);
      //     }
      //   }),
      //   catchError(() => {
      //     console.log('Error occurred during access check.');
      //     router.navigate(['/dashboard']);
      //     return of(false);
      //   })
      // );