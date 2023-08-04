import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Route, User } from 'src/app/core/auth/interface/user';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { SharedService } from 'src/shared/service/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  routes!: Route[];
  menuItems!: any[];
  filteredRoutes: any[] = [];
  userId!: any;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router,
    public translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.userId = this.sharedService.getUserFromLocal();
    this.getUserAndFilteredRoutes(this.userId);
  }

  getUserAndFilteredRoutes(userId: any) {
    this.authService.getRoutes().subscribe((routes) => {
      this.routes = routes;
      this.authService.getUserData(userId).subscribe((userData) => {
        if (userData && userData.route_rights) {
          this.filteredRoutes = this.routes.filter((route) => userData.route_rights.includes(route.id) && route.route !== 'dashboard');
          this.groupRoutesByMainMenu();
        }
      });
    });
  }

  groupRoutesByMainMenu() {
    const groupedRoutes: any = {};
    this.filteredRoutes.forEach((route) => {
      const mainMenuLabel = route.route.split('/')[0];
      if (!groupedRoutes[mainMenuLabel]) {
        groupedRoutes[mainMenuLabel] = [];
      }
      groupedRoutes[mainMenuLabel].push(route);
    });
    this.menuItems = Object.keys(groupedRoutes).map((mainMenuLabel) => {
      return {
        label: mainMenuLabel,
        subMenuItems: groupedRoutes[mainMenuLabel]
      };
    });
  }

  getRouterLink(mainMenu: any): any[] {
    const accessibleRoute = mainMenu.subMenuItems.find((r: any) => this.filteredRoutes.find((fr) => fr.route === r.route));
    if (accessibleRoute) {
      return [accessibleRoute.route];
    } else {
      return ['/dashboard'];
    }
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
        return 'add';
    }
  }
}
