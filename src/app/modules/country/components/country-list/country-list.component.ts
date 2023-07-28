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
  ) {
    this.sharedService.getCounties().subscribe((res) => {
      this.dataSource = res;
    })
  }

  ngOnInit(): void {
    this.userId = this.sharedService.getUserFromLocal();
  }

  addCountry() {
    this.router.navigate([`country/add`]);
  }

  editCountry(countryId: number) {
    this.router.navigate([`country/edit/${countryId}`]);
  }
}
