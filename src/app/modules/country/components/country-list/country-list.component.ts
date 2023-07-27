import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/auth/interface/user';
import { SharedService } from 'src/shared/service/shared.service';
import { CountryService } from '../../service/country.service';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {

  dataSource !: any;
  displayedColumns: string[] = ['id', 'name', 'action'];
  userId: any;
  hasAccessToEdit: boolean = false;
  hasAccessToAdd: boolean = false;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private authService: AuthService
  ) {

    this.sharedService.getCounties().subscribe((res) => {
      this.dataSource = res;
    })
  }

  ngOnInit(): void {
    this.userId = this.sharedService.getUserFromLocal();
  }

  addCountry() {
    this.authService.hasRouteAccess(this.userId, 'country/add').subscribe((res) => {
      this.hasAccessToAdd = res;
      if (res === true) {
        this.router.navigate([`country/add`]);
      } else {
        this.router.navigateByUrl('**');
      }
    })
  }
  editCountry(countryId: number) {
    this.authService.hasRouteAccess(this.userId, 'country/edit').subscribe((res) => {
      this.hasAccessToEdit = res;
      if (res === true) {
        this.router.navigate([`country/edit/${countryId}`]);
      } else {
        this.router.navigateByUrl('**');
      }
    })
  }
}
