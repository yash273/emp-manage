import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { email, mob, name, pass } from 'src/shared/regex-rules/regex-rule';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
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
      console.log(formData);
    } else {
      const formData = { ...this.userForm.value };
      delete formData.confirm_password;
      console.log(formData);
      console.log('Form is invalid. Please check the fields.');
    }
  }
}
