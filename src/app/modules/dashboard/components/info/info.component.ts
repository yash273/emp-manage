import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/auth/interface/user';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { SharedService } from 'src/shared/service/shared.service';

interface Result {
  name: string;
  id: number;
  value: number;
}

export var single =
  [
    {
      "name": "United States",
      "id": 1,
      "value": 890,
    },
    {
      "name": "Canada",
      "value": 690,
      "id": 2
    },
    {
      "name": "Australia",
      "value": 800,
      "id": 3
    },
    {
      "name": "India",
      "value": 400,
      "id": 4
    },
    {
      "name": "China",
      "value": 200,
      "id": 5
    }
  ]

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  countries: any;
  users: any;

  constructor(
    private sharedService: SharedService,
    private authService: AuthService
  ) {
    this.sharedService.getCounties().subscribe((res) => {
      this.countries = res;
    })
    this.authService.allUsers().subscribe((res) => {
      this.users = res;
      console.log(res)
    })
  }

  ngOnInit(): void {
    this.initFunction()
  }

  initFunction() {
    this.authService.allUsers().subscribe((res) => {
      this.users = res;
      const userCountByCountry: Result[] = this.countUsersByLocation(res, this.countries);
      Object.assign(this, { userCountByCountry });
      console.log(userCountByCountry);
    });
  }

  single!: any[];
  multi!: any[];

  view: any = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Employee';

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  onSelect(event: Event) {
    console.log(event);
  }

  countUsersByLocation(users: User[], countries: any): Result[] {
    const countResult: { [countryId: number]: number } = {};

    for (const user of users) {
      if (countResult[user.country] === undefined) {
        countResult[user.country] = 1;
      } else {
        countResult[user.country]++;
      }
    }

    const result: Result[] = countries.map((country: any) => {
      return {
        name: country.name,
        id: country.id,
        value: countResult[country.id].toString() || 0,
      };
    });

    return result;
  }




}
