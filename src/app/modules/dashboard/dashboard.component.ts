import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route, User } from 'src/app/core/auth/interface/user';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { SharedService } from 'src/shared/service/shared.service';

interface SubMenuItem {
  label: string;
  route: string;
}

interface MenuItem {
  label: string;
  subMenuItems: SubMenuItem[];
}

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
    this.router.navigate(['/auth/login'])
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
        this.change()
      }
    })
  }

  menuItems: MenuItem[] = [];

  change() {

    const routes = this.filteredRoutes;
    const groupRoutesByMainMenu = (routes = this.filteredRoutes) => {
      const groupedRoutes: any = {};

      routes.forEach((route) => {
        const mainMenuLabel = route.route.split('/')[0];

        if (!groupedRoutes[mainMenuLabel]) {
          groupedRoutes[mainMenuLabel] = [];
        }

        groupedRoutes[mainMenuLabel].push(route);
      });

      return groupedRoutes;
    };

    const groupedRoutes = groupRoutesByMainMenu(routes);

    // Convert groupedRoutes into menuItems array
    this.menuItems = Object.keys(groupedRoutes).map((mainMenuLabel) => {
      return {
        label: mainMenuLabel,
        subMenuItems: groupedRoutes[mainMenuLabel].map((route: any) => {
          return {
            label: route.route.split('/').slice(1).join(' '),
            route: `${route.route}`
          };
        })
      };
    });

  }

  isLinkActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  getIconForRoute(route: string): string {
    switch (route) {
      case 'country':
        return 'public';
      case 'state':
        return 'location_city';
      case 'city':
        return 'location_on';
      case 'employee':
        return 'person';
      default:
        return 'dashboard';
    }
  }

}
