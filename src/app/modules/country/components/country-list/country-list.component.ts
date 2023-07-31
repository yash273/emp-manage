import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/auth/interface/user';
import { SharedService } from 'src/shared/service/shared.service';
import { CountryService } from '../../service/country.service';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'action'];
  userId: any;
  hasAccessToEdit: boolean = false;
  hasAccessToAdd: boolean = false;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private authService: AuthService
  ) {
    this.sharedService.getCounties().subscribe((res: any) => {
      this.dataSource.data = res;
    })
  }

  ngOnInit(): void {
    this.userId = this.sharedService.getUserFromLocal();
    this.authService.hasRouteAccess(this.userId, 'country/add').subscribe((res) => {
      this.hasAccessToAdd = res;
    });
    this.authService.hasRouteAccess(this.userId, 'country/edit').subscribe((res) => {
      this.hasAccessToEdit = res;
    })
  }

  addCountry() {
    this.router.navigate([`country/add`]);
  }

  editCountry(countryId: number) {
    this.router.navigate([`country/edit/${countryId}`]);
  }
}
