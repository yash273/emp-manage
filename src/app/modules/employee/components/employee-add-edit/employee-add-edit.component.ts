import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { email, mob, name, pass } from 'src/shared/regex-rules/regex-rule';
import { EncryptDecryptService } from 'src/shared/service/encrypt-decrypt.service';
import { SharedService } from 'src/shared/service/shared.service';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent {
  userForm!: FormGroup;
  hide: boolean = true;
  hideConfirm: boolean = true;
  countries: any;
  states: any;
  cities: any;
  userId!: number;
  previousData!: any;
  routes!: any;
  initialRoutes: { [key: number]: boolean } = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false };

  r = [
    {
      "route": "dashboard",
      "value": false
    },
    {
      "value": false,
      "route": "country"
    },
    {
      "value": false,
      "route": "country/add"
    },
    {
      "value": false,
      "route": "country/edit"
    },
    {
      "value": false,
      "route": "state"
    },
    {
      "value": false,
      "route": "state/add"
    },
    {
      "value": false,
      "route": "state/edit"
    },
    {
      "value": false,
      "route": "city"
    },
    {
      "value": false,
      "route": "city/add"
    },
    {
      "value": false,
      "route": "city/edit"
    },
    {
      "value": false,
      "route": "employee"
    },
    {
      "value": false,
      "route": "employee/add"
    },
    {
      "value": false,
      "route": "employee/edit"
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private encryptDecryptService: EncryptDecryptService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getAllRoutes()

    this.getCountries();
    this.userId = this.route.snapshot.params['id'];
    if (this.userId) {
      this.populateForm();
    };

  }

  initializeForm() {
    return this.userForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.pattern(name)]],
      last_name: ['', [Validators.required, Validators.pattern(name)]],
      email: ['', [Validators.required, Validators.pattern(email)]],
      mobile: ['', [Validators.required, Validators.pattern(mob)]],
      role: [null, [Validators.required]],
      confirm_password: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(pass)]],
      country: [null, [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
      route_rights: this.formBuilder.group({})
    },
      { validator: this.passwordMatchValidator }
    )
  }

  populateForm() {
    this.authService.getUserData(this.userId).subscribe((res) => {
      console.log(res);
      const userRoutes = res.route_rights;

      console.log(userRoutes)
      userRoutes.forEach((key) => {
        if (this.initialRoutes.hasOwnProperty(key)) {
          this.initialRoutes[key] = true;
        }
      });
      // console.log(this.initialRoutes);
      this.initialRoutes;
      const { password, ...previousData } = res;
      previousData.role = res.role.toString();
      this.userForm.removeControl('confirm_password');
      this.userForm.patchValue(previousData);
      this.getStates('update');
      this.getCites('update');
    },
      (err) => {
        this.router.navigate(['**']);
      }
    );
  }

  getAllRoutes() {
    this.authService.getRoutes().subscribe((res) => {
      res.forEach((element) => {
        element.id = element.id.toString();
      })
      this.routes = res;
      const checkboxes = <FormGroup>this.userForm.get('route_rights');
      this.routes.forEach((option: any) => {
        checkboxes.addControl(option.id, new FormControl(false));
      });
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirm_password')?.value;

    if (password !== confirmPassword) {
      form.get('confirm_password')?.setErrors({ 'passwordMismatch': true });
    } else {
      form.get('confirm_password')?.setErrors(null);
    }
    return null;
  }

  addUser() {
    const routeRights = this.userForm.value.route_rights;
    console.log(routeRights)
    const trueRoutes = Object.keys(routeRights)
      .filter((key) => routeRights[Number(key)])
      .map(Number);

    console.log(trueRoutes)

    if (this.userForm.valid) {
      const formData = { ...this.userForm.value };
      delete formData.confirm_password;
      formData.mobile = parseInt(formData.mobile, 10);
      formData.role = parseInt(formData.role, 10);
      formData.route_rights = trueRoutes;

      const hashedPassword = this.encryptDecryptService.hashPassword(formData.password);
      const newData = { ...formData, password: hashedPassword };

      this.authService.registerUser(newData).subscribe((res) => {
        if (res) {
          this.sharedService.showAlert("User Added!", 'success');
        } else {
          this.sharedService.showAlert("Oops! Something Went Wrong!", 'default');
        }
      });
      this.router.navigate(['/dashboard'])
    } else {
      this.sharedService.showAlert("Form is invalid. Please check the fields.", 'error');
    }
  }

  EditUser() {
    const routeRights = this.userForm.value.route_rights;
    console.log(routeRights)
    const trueRoutes = Object.keys(routeRights)
      .filter((key) => routeRights[Number(key)])
      .map(Number);

    console.log(trueRoutes)

    if (this.userForm.valid) {
      const formData = { ...this.userForm.value };
      formData.role = parseInt(formData.role, 10);
      formData.route_rights = trueRoutes;

      const hashedPassword = this.encryptDecryptService.hashPassword(formData.password);
      const newData = { ...formData, password: hashedPassword };

      this.authService.updateUser(newData, this.userId).subscribe((res) => {
        if (res) {
          this.sharedService.showAlert("User Updated Successfully!", "success");
        } else {
          this.sharedService.showAlert("Oops! Something Went Wrong!", 'default');
        }
      });
      this.router.navigate(['/dashboard'])
    } else {
      this.sharedService.showAlert('Form is invalid. Please check the fields.', 'error');
    }

  }

  getCountries() {
    this.sharedService.getCounties().subscribe((res) => {
      this.countries = res;
    })
  }

  getStates(type: string | null) {
    const countryId = this.userForm.get('country')?.value;
    if (countryId) {
      this.sharedService.getStates(countryId).subscribe((res) => {
        this.states = res;
      });
    } else {
      this.states = [];
    } if (!type) {
      this.userForm.get('state')?.setValue(null);
      this.userForm.get('city')?.setValue(null);
    }
  }

  getCites(type: string | null) {
    const stateId = this.userForm.get('state')?.value;
    if (stateId) {
      this.sharedService.getCities(stateId).subscribe((res) => {
        this.cities = res;
      });
    } else {
      this.cities = [];
    } if (!type) {
      this.userForm.get('city')?.setValue(null);
    }
  }



}
