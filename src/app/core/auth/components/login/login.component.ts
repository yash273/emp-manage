import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/shared/service/shared.service';
import { EncryptDecryptService } from 'src/shared/service/encrypt-decrypt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService,
    private encryptDecryptService: EncryptDecryptService
  ) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    return this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    this.authService.allUsers().subscribe((res) => {
      if (res) {
        const user = res.find((a: any) => {
          const storedHashedPassword = a.password;
          const isPasswordValid = this.encryptDecryptService.comparePasswords(this.loginForm.value.password, storedHashedPassword);
          return a.email === this.loginForm.value.email && isPasswordValid;
        });
        if (user) {
          this.sharedService.showAlert("Login Successful!", 'success');
          this.sharedService.saveUserToLocal(user);
          this.router.navigate(['/dashboard']);
        } else {
          this.sharedService.showAlert("User Not Found!", 'error');

        }
      } else {
        this.sharedService.showAlert("Oops! Something Went Wrong!", 'default');
      }
    })
  }
}
