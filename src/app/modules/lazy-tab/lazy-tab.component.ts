import { Component, OnInit } from '@angular/core';
import { StateService } from '../state/service/state.service';
import { EmployeeService } from '../employee/service/employee.service';
import { User } from 'src/app/core/auth/interface/user';

@Component({
  selector: 'app-lazy-tab',
  templateUrl: './lazy-tab.component.html',
  styleUrls: ['./lazy-tab.component.scss']
})
export class LazyTabComponent implements OnInit {

  states: any;
  employee!: User[];

  constructor(
    private stateService: StateService,
    private employeeService: EmployeeService
  ) {

  }

  ngOnInit(): void {
    this.getAllStates();
  }

  getAllStates() {
    this.stateService.getStates().subscribe((res) => {
      this.states = res;
      // this.getEmployeeInState(this.states[0].id);
    });
  }

  getEmployeeInState(stateId: number) {
    this.employeeService.getEmployeeInState(stateId).subscribe((res) => {
      this.employee = res;
    })
  }

}
