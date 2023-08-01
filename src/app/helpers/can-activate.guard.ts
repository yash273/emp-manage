import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/auth/service/auth.service';
import { catchError, lastValueFrom, map, of, switchMap } from 'rxjs';
import { SharedService } from 'src/shared/service/shared.service';

export const canActivateGuard: CanActivateFn = async (route, state) => {
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
    if (currentRoute === 'login' || currentRoute === 'signup' || currentRoute === '') {
      sharedService.showAlert("Looks like You are not Authorized to Access this page!", "error");
      router.navigate(['/dashboard']);
      return false;
    } else {
      try {
        const value = lastValueFrom(authService.hasRouteAccess(parseInt(isUserLoggedIn, 10), currentRoute))
        const res = await value;
        if (res === true) {
          return true;
        } else {
          sharedService.showAlert("Looks like You are not Authorized to Access this page!", "error");
          return false;
        }
      } catch (error) {
        console.error('Error while checking route access:', error);
        return false;
      }
    }
  } else {
    if (currentRoute === 'login' || currentRoute === 'signup' || currentRoute === '') {
      return true;
    } else {
      sharedService.showAlert("Looks like You are not Authorized to Access this page!", "error");
      router.navigate(['/login']);
      return false;
    }
  }



  // if (isUserLoggedIn) {
  //   if (currentRoute === 'login' || currentRoute === 'signup' || currentRoute === '') {
  //     sharedService.showAlert("Looks like You are not Authorize to Access this page!", "error");
  //     router.navigate(['/dashboard']);
  //     return false;
  //   } else {
  //     authService.hasRouteAccess(parseInt(isUserLoggedIn, 10), currentRoute)
  //       .subscribe((res) => {
  //         if (res === true) {
  //           return true;
  //         } else {
  //           // if (currentRoute !== 'dashboard') {
  //           sharedService.showAlert("Looks like You are not Authorize to Access this page!", "error");
  //           router.navigate(['/dashboard']);
  //           return false;
  //           // } else {
  //           // router.navigate(['/dashboard']);
  //           // return false;
  //           // }
  //         }
  //       })
  //     return true
  //   }
  // } else {
  //   if (currentRoute === 'login' || currentRoute === 'signup' || currentRoute === '') {
  //     return true;
  //   } else {
  //     sharedService.showAlert("Looks like You are not Authorize to Access this page!", "error");
  //     router.navigate(['/login']);
  //     return false;
  //   }
  // }
}
