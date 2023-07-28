import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/modules/state/service/state.service';
import { SharedService } from 'src/shared/service/shared.service';
import { CityService } from '../../service/city.service';

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
    private router: Router
  ) {
    this.stateService.getStates().subscribe((res) => {
      this.states = res;
    })
  }

  ngOnInit(): void {
    this.userId = this.sharedService.getUserFromLocal();
    this.cityService.getCities().subscribe((res) => {
      this.dataSource = res;
    })
  }

  editCity(cityId: number) {
    this.router.navigate([`city/edit/${cityId}`]);
  }

  addCity() {
    this.router.navigate([`city/add`]);
  }
}
