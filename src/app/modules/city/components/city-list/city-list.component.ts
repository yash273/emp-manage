import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/modules/state/service/state.service';
import { SharedService } from 'src/shared/service/shared.service';
import { CityService } from '../../service/city.service';
import { AuthService } from 'src/app/core/auth/service/auth.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {

  dataSource !: any;
  displayedColumns: string[] = ['id', 'name', 'stateId', 'action'];
  states: any;
  userId: any;
  hasAccessToEdit: boolean = false;
  hasAccessToAdd: boolean = false;

  constructor(
    private stateService: StateService,
    private cityService: CityService,
    private sharedService: SharedService,
    private router: Router,
    private authService: AuthService
  ) {
    this.stateService.getStates().subscribe((res) => {
      this.states = res;
    });
    this.userId = this.sharedService.getUserFromLocal();
    this.authService.hasRouteAccess(this.userId, 'city/add').subscribe((res) => {
      this.hasAccessToAdd = res;
    });
    this.authService.hasRouteAccess(this.userId, 'city/edit').subscribe((res) => {
      this.hasAccessToEdit = res;
    });

  }

  ngOnInit(): void {
    this.cityService.getCities().subscribe((res) => {
      this.dataSource = res;
    });


  }

  editCity(cityId: number) {
    this.router.navigate(
      [`city/add`],
      { queryParams: { id: `${cityId}` } }  //using queryParams
    );
  }

  addCity() {
    this.router.navigate([`city/add`]);
  }
}
