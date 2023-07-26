import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route, User } from 'src/app/core/auth/interface/user';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { SharedService } from 'src/shared/service/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  routes!: Route[];
  filteredRoutes: any[] = [];
  userId!: any;
  currentUser!: User

  constructor(
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.userId = this.sharedService.getUserFromLocal();

  }

  ngOnInit(): void {
    this.getAllRoutes();
    this.getUserRoutes()
  }

  logout() {
    this.sharedService.removeLoggedUser();
    this.router.navigate(['/login'])
  }


  getAllRoutes() {
    this.authService.getRoutes().subscribe((res) => {
      this.routes = res;
    });
  }

  getUserRoutes() {
    // console.log(x)
    this.authService.getUserData(this.userId).subscribe((res) => {
      this.currentUser = res;
      if (res && res.route_rights) {
        this.filteredRoutes = this.routes.filter((route) => res.route_rights.includes(route.id));
      }
    })
  }

  // Function to provide a unique identifier for each item in *ngFor loop
  trackByRouteId(index: number, route: any): number {
    return route.id;
  }



  getIconForRoute(route: string): string {
    switch (route) {
      case 'country':
        return 'public';
      case 'country/add':
        return 'add_circle';
      case 'country/edit':
        return 'edit';
      case 'state':
        return 'location_city';
      case 'state/add':
        return 'add_location';
      case 'state/edit':
        return 'edit_location';
      case 'city':
        return 'location_on';
      case 'city/add':
        return 'add_location_alt';
      case 'city/edit':
        return 'edit_location_alt';
      case 'employee':
        return 'person';
      case 'employee/add':
        return 'person_add';
      case 'employee/edit':
        return 'person_edit';
      default:
        return 'dashboard';
    }
  }

}
