import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { email, mob, name, pass } from 'src/shared/regex-rules/regex-rule';
import { AuthService } from '../../service/auth.service';
import { EncryptDecryptService } from 'src/shared/service/encrypt-decrypt.service';
import { SharedService } from 'src/shared/service/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userForm!: FormGroup;
  hide: boolean = true;
  hideConfirm: boolean = true;
  countries: any;
  states: any;
  cities: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private encryptDecryptService: EncryptDecryptService,
    private sharedService: SharedService,
  ) {

  }

  ngOnInit(): void {
    this.initializeForm();
    this.getCountries();
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


  signup() {

    if (this.userForm.valid) {
      const formData = { ...this.userForm.value };
      delete formData.confirm_password;
      formData.mobile = parseInt(formData.mobile, 10);
      formData.role = parseInt(formData.role, 10);

      const hashedPassword = this.encryptDecryptService.hashPassword(formData.password);
      const newData = { ...formData, password: hashedPassword };

      this.authService.registerUser(newData).subscribe((res) => {
        if (res) {
          this.sharedService.showAlert("Congratulations! You Are Registered!", 'success');
          this.router.navigate(['/login'])
        } else {
          this.sharedService.showAlert("Oops! Something Went Wrong!", 'default');
        }
      });
    } else {
      this.sharedService.showAlert("Form is invalid. Please check the fields.", 'error');
    }
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
