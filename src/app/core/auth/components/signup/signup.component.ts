import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { email, mob, name, pass } from 'src/shared/regex-rules/regex-rule';
import { AuthService } from '../../service/auth.service';
import { EncryptDecryptService } from 'src/shared/service/encrypt-decrypt.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userForm!: FormGroup;
  hide: boolean = true;
  hideConfirm: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private encryptDecryptService: EncryptDecryptService
  ) {

  }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    return this.userForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.pattern(name)]],
      last_name: ['', [Validators.required, Validators.pattern(name)]],
      email: ['', [Validators.required, Validators.pattern(email)]],
      mobile: ['', [Validators.required, Validators.pattern(mob)]],
      role: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(pass)]]
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
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
}
