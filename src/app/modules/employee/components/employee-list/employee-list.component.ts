import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { User } from 'src/app/core/auth/interface/user';
import { Router } from '@angular/router';
import { SharedService } from 'src/shared/service/shared.service';
import { AuthService } from 'src/app/core/auth/service/auth.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  dataSource !: User[];
  displayedColumns: string[] = ['id', 'first_name', 'email', 'action'];
  userId: any;
  hasAccessToEdit: boolean = false;
  hasAccessToAdd: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private sharedService: SharedService,
  ) {
    this.employeeService.getEmployees().subscribe((res) => {
      this.dataSource = res;
    });
  }

  ngOnInit(): void {
    this.userId = this.sharedService.getUserFromLocal();
  }

  editEmployee(empId: number) {
    this.router.navigate([`employee/edit/${empId}`]);
  }

  addEmployee() {
    this.router.navigate([`employee/add`]);
  }

}
