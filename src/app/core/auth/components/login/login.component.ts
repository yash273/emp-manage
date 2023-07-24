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
    private SharedService: SharedService,
    private EncryptDecryptService: EncryptDecryptService
  ) {

  }

  ngOnInit(): void {
    this.initForm()
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
          const isPasswordValid = this.EncryptDecryptService.comparePasswords(this.loginForm.value.password, storedHashedPassword);
          return a.email === this.loginForm.value.email
            && isPasswordValid
        });
        if (user) {
          console.log('you are successfully login');
          this.loginForm.reset();
          this.SharedService.saveUserToLocal(user)
          this.router.navigate(['dashboard'])
        } else {
          console.log('User Not Found');
        }
      } else {
        console.log('Something was wrong');
      }
    })
  }
}
