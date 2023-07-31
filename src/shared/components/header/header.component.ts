import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route, User } from 'src/app/core/auth/interface/user';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { SharedService } from 'src/shared/service/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  routes!: Route[];
  filteredRoutes: any[] = [];
  userId!: any;
  currentUser!: User;
  // menuItems: MenuItem[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.userId = this.sharedService.getUserFromLocal();
  }
  logout() {
    this.sharedService.removeLoggedUser();
    this.sharedService.showAlert('Successfully Logged out', "success")
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    this.getAllRoutes();
    this.getUserRoutes()
  }
  getAllRoutes() {
    this.authService.getRoutes().subscribe((res) => {
      this.routes = res;
    });
  }

  getUserRoutes() {
    this.authService.getUserData(this.userId).subscribe((res) => {
      this.currentUser = res;
      if (res && res.route_rights) {
        this.filteredRoutes = this.routes.filter((route) => res.route_rights.includes(route.id) && route.route !== 'dashboard');
      }
    })
  }

}
