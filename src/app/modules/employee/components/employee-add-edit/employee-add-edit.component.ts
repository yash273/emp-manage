import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/auth/interface/user';
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
  previousData!: User

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
    this.getCountries();
    this.userId = this.route.snapshot.params['id'];
    console.log(this.userId)
    if (this.userId) {
      this.populateForm();
    }
  }

  initializeForm() {
    return this.userForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.pattern(name)]],
      last_name: ['', [Validators.required, Validators.pattern(name)]],
      email: ['', [Validators.required, Validators.pattern(email)]],
      mobile: ['', [Validators.required, Validators.pattern(mob)]],
      role: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(pass)]],
      country: [null, [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]]
    },
      { validator: this.passwordMatchValidator }
    )
  }

  populateForm() {
    this.authService.getUserData(this.userId).subscribe((res) => {
      const { password, ...previousData } = res;
      this.userForm.patchValue(previousData);
    })
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

    if (this.userForm.valid) {
      const formData = { ...this.userForm.value };
      delete formData.confirm_password;
      formData.mobile = parseInt(formData.mobile, 10);
      formData.role = parseInt(formData.role, 10);

      // Hash the password using the service
      const hashedPassword = this.encryptDecryptService.hashPassword(formData.password);
      const newData = { ...formData, password: hashedPassword };

      this.authService.registerUser(newData).subscribe((res) => {
        if (res) {
          console.log('Registered');
        } else {
          console.log('Something went wrong');
        }
      });
      this.router.navigate(['/dashboard'])
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }

  EditUser() {
    console.log(this.userId)
  }

  getCountries() {
    this.sharedService.getCounties().subscribe((res) => {
      this.countries = res;
    })
  }

  getStates() {
    const countryId = this.userForm.get('country')?.value;
    this.sharedService.getStates(countryId).subscribe((res) => {
      this.states = res;
    });
    this.userForm.get('state')?.setValue(null);
    this.userForm.get('city')?.setValue(null);
  }

  getCites() {
    const stateId = this.userForm.get('state')?.value;
    this.sharedService.getCities(stateId).subscribe((res) => {
      this.cities = res;
    });
    this.userForm.get('city')?.setValue(null);
  }

}
