import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Route, User } from '../interface/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(data: User): Observable<User> {
    return this.http.post<User>(environment.baseURL + `users`, data)
  }

  allUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.baseURL + `users`)
  }

  getUserData(userId: number): Observable<User> {
    return this.http.get<User>(environment.baseURL + `users/${userId}`)
  }

  getRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>(environment.baseURL + `routes`)
  }

  routes !: number[];
  routeId !: number;

  getRouteData(route: string): Observable<Route[]> {
    return this.http.get<Route[]>(environment.baseURL + `routes?route=${route}`)
  }

  // hasRouteAccess(userId: number, route: string): boolean {
  //   this.getUserData(userId).subscribe((res) => {
  //     this.routes = res.route_rights;
  //     console.log(".", this.routes)
  //   });
  //   this.getRouteData(route).subscribe((res) => {
  //     this.routeId = res.id;
  //   });
  //   if (this.routes && this.routeId) {
  //     console.log("routes: ", this.routes, "routeId: ", this.routeId)
  //   }

  //   return true
  // }
  hasRouteAccess(userId: number, route: string): Observable<boolean> {
    this.getRouteData(route).subscribe((res) => {
      this.routeId = res[0].id;
    });
    return this.getUserData(userId).pipe(
      map((userData) => {
        this.routes = userData.route_rights;
        const matchingRoute = this.routes.find((r) => r === this.routeId);
        return !!matchingRoute;
      })
    );
  }
}
