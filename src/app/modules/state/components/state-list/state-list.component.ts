import { Component, OnInit } from '@angular/core';
import { StateService } from '../../service/state.service';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { SharedService } from 'src/shared/service/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss']
})
export class StateListComponent implements OnInit {

  dataSource !: any;
  displayedColumns: string[] = ['id', 'name', 'countryId', 'action'];
  countries: any;
  userId: any;
  hasAccessToEdit: boolean = false;
  hasAccessToAdd: boolean = false;

  constructor(
    private stateService: StateService,
    private sharedService: SharedService,
    private authService: AuthService,
    private router: Router
  ) {

    this.sharedService.getCounties().subscribe((res) => {
      this.countries = res;
    })

  }

  ngOnInit(): void {
    this.userId = this.sharedService.getUserFromLocal();
    this.stateService.getStates().subscribe((res) => {
      this.dataSource = res
    })
  }

  addState() {
    this.authService.hasRouteAccess(this.userId, 'state/add').subscribe((res) => {
      this.hasAccessToAdd = res;
      if (res === true) {
        this.router.navigate([`dashboard/state/add`]);
      } else {
        this.router.navigateByUrl('**');
      }
    })
  }

  editState(stateId: number) {
    this.authService.hasRouteAccess(this.userId, 'state/edit').subscribe((res) => {
      this.hasAccessToEdit = res;
      if (res === true) {
        this.router.navigate([`dashboard/state/edit/${stateId}`]);
      } else {
        this.router.navigateByUrl('**');
      }
    })
  }
}
