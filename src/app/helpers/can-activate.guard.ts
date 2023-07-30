import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/auth/service/auth.service';
import { catchError, map, of } from 'rxjs';
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
    // if (isUserLoggedIn) {
    //   if (currentRoute === 'login' || currentRoute === 'signup' || currentRoute === '') {
    //     router.navigate(['/dashboard']); 
    //   return false;
    //   } 
    //   if (currentRoute !== 'login' && currentRoute !== 'signup' && currentRoute !== '') {
    //     const userId = parseInt(isUserLoggedIn, 10);
    //     return authService.hasRouteAccess(userId, currentRoute).pipe(
    //       map(hasAccess => {
    //         if (hasAccess) {
    //           return true;
    //         } else {
    //           console.log('false else access');
    //           router.navigate(['/dashboard']);
    //           return false;
    //         }
    //       })
    //     );
    //   }else{
    //     console.log('false else');
    //     router.navigate(['/dashboard']);
    //     return false;
    //   }
    // }
    // else {
    //   console.log('false else else');
    //   return true;
    // }


  // If user is logged in, protect certain routes, and navigate to dashboard if needed.
  if (isUserLoggedIn) {
    if (currentRoute === 'login' || currentRoute === 'signup' || currentRoute === '') {
      router.navigate(['/dashboard']);
      return false;
    } else {
      const userId = parseInt(isUserLoggedIn, 10);
      const hasAccess = authService.hasRouteAccess(userId, currentRoute);
      if (hasAccess) {
        return true;
      } else {
        router.navigate(['/dashboard']);
        return false;
      }
    }
  } else {
    // Allow access to the login page for non-logged-in users
    if (currentRoute === 'login' || currentRoute === 'signup' || currentRoute === '') {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }
}








// export const canActivateGuardLogin: CanActivateFn = (route, state) => {
//   const router = inject(Router);
//   const isUserLoggedIn = localStorage.getItem('loggedUserId');

//   if (!isUserLoggedIn) {
//     router.navigate(['/login']);
//     return true;
//   }
//   else {
//     router.navigate(['/dashboard']);
//     return false;
//   }
// };
