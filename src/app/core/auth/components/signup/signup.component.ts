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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private EncryptDecryptService: EncryptDecryptService
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
      const pass = formData.password;
      const hashedPassword = this.EncryptDecryptService.hashPassword(pass);

      console.log(formData.password);
      const newData = { ...formData, password: hashedPassword }
      console.log(newData)

      this.authService.registerUser(newData).subscribe((res) => {
        if (res) {
          console.log('registered');
        } else {
          console.log('something went wrong');
        }
      });
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
}
