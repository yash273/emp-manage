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

  userId!: any;
  currentUser!: User;

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
    this.getUserData()
  }

  getUserData() {
    this.authService.getUserData(this.userId).subscribe((res) => {
      this.currentUser = res;
    })
  }

}
