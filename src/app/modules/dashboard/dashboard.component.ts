import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { User } from 'src/app/core/auth/interface/user';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { canActivateGuard } from 'src/app/helpers/can-activate.guard';
import { CityService } from 'src/app/modules/city/service/city.service';
import { StateService } from 'src/app/modules/state/service/state.service';
import { SharedService } from 'src/shared/service/shared.service';

interface Result {
  name: string;
  id: number;
  value: number;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  countries: any;
  users: any;
  states: any;
  cities: any;
  data!: Result[];
  multi!: [[]];
  selectedLocation = 'country'
  currentCountry!: any;


  constructor(
    private sharedService: SharedService,
    private authService: AuthService,
    private stateService: StateService,
    private cityService: CityService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.sharedService.getCounties().subscribe((res) => {
      this.countries = res;
    });
    this.stateService.getStates().subscribe((res) => {
      this.states = res;
    });
    this.cityService.getCities().subscribe((res) => {
      this.cities = res;
    });
  }

  ngAfterViewInit(): void {
    this.initFunction();
  }

  initFunction() {
    this.authService.allUsers().subscribe((res) => {
      this.users = res;

      setTimeout(() => {
        this.usersInCountry();
      }, 20)
    });
  }

  view: any = [800, 300];
  piView: any = [500, 300];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showDataLabel = true;
  // yAxisLabel = 'Users';
  colorScheme = 'picnic';
  noBarWhenZero = false;
  legendPosition: any = 'right';
  barPadding = 16;
  wrapTicks = true;
  roundDomains = true;
  piCountryData!: any[];
  piStateData!: any[];
  piCityData!: any[];


  countUsersByLocation(users: any[], locations: any[], locationKey: string): Result[] {
    const countResult: { [locationId: number]: number } = {};

    for (const user of users) {
      if (countResult[user[locationKey]] === undefined) {
        countResult[user[locationKey]] = 1;
      } else {
        countResult[user[locationKey]]++;
      }
    }

    const result: Result[] = locations.map((location: any) => {
      return {
        name: location.name,
        value: countResult[location.id] || 0,
        id: location.id,
      };
    });

    return result;
  }

  usersInCountry() {
    const data = this.countUsersByLocation(this.users, this.countries, 'country');
    Object.assign(this, { data });
    const piCountryData = this.countUsersByLocation(this.users, this.countries, 'country');
    Object.assign(this, { piCountryData });
  }

  usersInState() {
    const data = this.countUsersByLocation(this.users, this.states, 'state');
    Object.assign(this, { data });
  }

  usersInCity() {
    const data = this.countUsersByLocation(this.users, this.cities, 'city');
    Object.assign(this, { data });
  }

  selectedCountry: any;
  selectedState: any;

  onSelectPieCountry(event: any) {
    this.selectedCountry = this.countries.find((country: any) => country.name === event.name);
    if (this.selectedCountry) {
      const currentCountryId = this.selectedCountry.id;
      this.sharedService.getStates(currentCountryId).subscribe((res: any) => {
        const piStateData = this.countUsersByLocation(this.users, res, 'state');
        Object.assign(this, { piStateData });
      })
    };
  }

  onSelectPieState(event: any) {
    this.selectedState = this.states.find((state: any) => state.name === event.name);
    if (this.selectedState) {
      const currentStateId = this.selectedState.id;
      this.sharedService.getCities(currentStateId).subscribe((res: any) => {
        const piCityData = this.countUsersByLocation(this.users, res, 'city');
        Object.assign(this, { piCityData });
      })
    };
  }

}
