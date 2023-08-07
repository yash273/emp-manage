import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EmployeeAddEditComponent } from './employee-add-edit.component';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { SharedService } from 'src/shared/service/shared.service';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialModule } from 'src/shared/material/material.module';
import { HeaderComponent } from 'src/shared/components/header/header.component';
import { SidebarComponent } from 'src/shared/components/sidebar/sidebar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/shared/shared.module';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('EmployeeAddEditComponent', () => {

  let component: EmployeeAddEditComponent;
  let fixture: ComponentFixture<EmployeeAddEditComponent>;
  let authService: AuthService;
  let sharedService: SharedService;
  let mockRouter: Router;

  let mockUser = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    password: 'password',
    mobile: 1234567890,
    role: 1,
    country: 1,
    state: 2,
    city: 2,
    dob: '2023-08-30T18:30:00.000Z',
    route_rights: [1, 2, 3],
  };

  let validUserData = {
    first_name: 'NewJohn',
    last_name: 'Doe',
    email: 'john1.doe@example.com',
    password: 'ZXcv!@34',
    confirm_password: 'ZXcv!@34',
    mobile: 1234567890,
    role: 1,
    country: 1,
    state: 2,
    city: 2,
    dob: '2023-08-30T18:30:00.000Z',
    route_rights: [1, 2, 3],
  }

  let inValidUserData = {
    first_name: 'NewJohn1',
    last_name: 'Doe1',
    email: 'john1@.doe@example.com',
    password: 'ZXcv!@34',
    confirm_password: 'ZXcv!@34',
    mobile: 12345367890,
    role: 1,
    country: 1,
    state: 2,
    city: 2,
    dob: '2023-08-30T18:30:00.000Z',
    route_rights: [1, 2, 3],
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeAddEditComponent,
        HeaderComponent,
        SidebarComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MaterialModule,
        SharedModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        AuthService,
        SharedService,
        TranslateService,
      ]
    });
    fixture = TestBed.createComponent(EmployeeAddEditComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    sharedService = TestBed.inject(SharedService);
    mockRouter = TestBed.inject(Router);
    fixture.detectChanges();

  });

  it("Check component", () => {
    expect(component).toBeDefined();
  })

  describe("Whole form submission", () => {

    it('should update user data and show success alert when form is valid', fakeAsync(() => {
      spyOn(authService, 'updateUser').and.returnValue(of(mockUser));
      spyOn(sharedService, 'showAlert');
      spyOn(mockRouter, 'navigate');

      component.userForm.patchValue(validUserData);
      component.EditUser();

      tick();

      expect(authService.updateUser).toHaveBeenCalled();
      expect(sharedService.showAlert).toHaveBeenCalledWith('User Updated Successfully!', 'success');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/employee']);
    }));

    it('should populate the form for an existing user', fakeAsync(() => {
      spyOn(authService, 'getUserData').and.returnValue(of(mockUser));
      component.userId = 1;
      component.populateForm();

      tick();

      expect(component.userForm.get('first_name')?.value).toBe('John');
      expect(component.userForm.get('last_name')?.value).toBe('Doe');
      expect(component.userForm.get('email')?.value).toBe('john.doe@example.com');
    }));

    it('should add a new user and navigate to "/employee" if entered data is valid', fakeAsync(() => {
      spyOn(authService, 'registerUser').and.returnValue(of(mockUser));
      spyOn(sharedService, 'showAlert');
      spyOn(mockRouter, 'navigate');

      component.userForm.patchValue(validUserData);
      component.addUser();

      tick();

      expect(sharedService.showAlert).toHaveBeenCalledWith('User Added!', 'success');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/employee']);
    }));

    it('show error alert if entered data is invalid', fakeAsync(() => {
      spyOn(sharedService, 'showAlert');

      component.userForm.patchValue(inValidUserData);
      component.addUser();

      tick();

      expect(sharedService.showAlert).toHaveBeenCalledWith('Form is invalid. Please check the fields.', 'error');
    }));

  });

  describe("OnInit", () => {
    it("should call initializeForm function", () => {
      spyOn(component, 'initializeForm');
      component.ngOnInit();
      expect(component.initializeForm).toHaveBeenCalled();
    });

    it("should call getAllRoutes function", () => {
      spyOn(component, 'getAllRoutes');
      component.ngOnInit();
      expect(component.getAllRoutes).toHaveBeenCalled();
    });

    it("should call getFormatFromLocal function", () => {
      spyOn(component, 'getFormatFromLocal');
      component.ngOnInit();
      expect(component.getFormatFromLocal).toHaveBeenCalled();
    });

    it("should call getCountries function", () => {
      spyOn(component, 'getCountries');
      component.ngOnInit();
      expect(component.getCountries).toHaveBeenCalled();
    });

  });

  describe("first_name validation", () => {
    let control: AbstractControl;

    beforeEach(() => {
      control = component.userForm.get('first_name') as AbstractControl;
    });

    it('should mark invalid when it has no value', () => {
      control.setValue(null);
      expect(control.invalid).toBeTruthy();
    });

    it('should mark valid when it has a valid value', () => {
      control.setValue('value');
      expect(control.valid).toBeTruthy();
    });

    it('should mark invalid when it has an invalid value', () => {
      control.setValue('value123');
      expect(control.invalid).toBeTruthy();
    });
  });

  describe("last_name validation", () => {
    let control: AbstractControl;

    beforeEach(() => {
      control = component.userForm.get('last_name') as AbstractControl;
    });

    it('should mark invalid when it has no value', () => {
      control.setValue(null);
      expect(control.invalid).toBeTruthy();
    });

    it('should mark valid when it has a valid value', () => {
      control.setValue('value');
      expect(control.valid).toBeTruthy();
    });

    it('should mark invalid when it has an invalid value', () => {
      control.setValue('value123');
      expect(control.invalid).toBeTruthy();
    });
  });

  describe("email validation", () => {
    let control: AbstractControl;

    beforeEach(() => {
      control = component.userForm.get('email') as AbstractControl;
    });

    it('should mark invalid when it has no value', () => {
      control.setValue(null);
      expect(control.invalid).toBeTruthy();
    });

    it('should mark valid when it has a valid email address', () => {
      control.setValue('valid123@mail.com');
      expect(control.valid).toBeTruthy();
    });

    it('should mark invalid when it has an invalid email address', () => {
      control.setValue('invalid-mail');
      expect(control.invalid).toBeTruthy();
    });
  });

  describe("mobile validation", () => {
    let control: AbstractControl;

    beforeEach(() => {
      control = component.userForm.get('mobile') as AbstractControl;
    });

    it('should mark invalid when it has no value', () => {
      control.setValue(null);
      expect(control.invalid).toBeTruthy();
    });

    it('should mark valid when it has a valid mobile no.', () => {
      control.setValue('1234567899');
      expect(control.valid).toBeTruthy();
    });

    it('should mark invalid when it has an invalid mobile no.', () => {
      control.setValue('99999999999');
      expect(control.invalid).toBeTruthy();
    });
  });

  describe("role validation", () => {
    let control: AbstractControl;

    beforeEach(() => {
      control = component.userForm.get('role') as AbstractControl;
    });

    it('should mark invalid when it has no value', () => {
      control.setValue(null);
      expect(control.invalid).toBeTruthy();
    });

    it('should mark valid when it has a valid role', () => {
      control.setValue('1');
      expect(control.valid).toBeTruthy();
    });

  });

  describe("password validation", () => {
    let control: AbstractControl;

    beforeEach(() => {
      control = component.userForm.get('password') as AbstractControl;
    });

    it('should mark invalid when it has no value', () => {
      control.setValue(null);
      expect(control.invalid).toBeTruthy();
    });

    it('should mark invalid when it has an invalid password', () => {
      control.setValue('99999999999');
      expect(control.invalid).toBeTruthy();
    });

    it('should mark valid when it has a valid password', () => {
      control.setValue('ZXcv!@34');
      expect(control.valid).toBeTruthy();
    });

  });

  describe("password and confirm password validation", () => {
    let passwordControl: AbstractControl;
    let confirmPasswordControl: AbstractControl;
    const validPassword = "ZXcv!@34";

    beforeEach(() => {
      passwordControl = component.userForm.get('password') as AbstractControl;
      confirmPasswordControl = component.userForm.get('confirm_password') as AbstractControl;
    });

    it('should mark invalid when password and confirm password do not match', () => {
      passwordControl.setValue(validPassword);
      confirmPasswordControl.setValue("MismatchedPassword456");
      expect(passwordControl.valid).toBeTruthy();
      expect(confirmPasswordControl.valid).toBeFalsy();
    });

    it('should mark valid when password and confirm password match', () => {
      passwordControl.setValue(validPassword);
      confirmPasswordControl.setValue(validPassword);
      expect(passwordControl.valid).toBeTruthy();
      expect(confirmPasswordControl.valid).toBeTruthy();
    });

    it('should mark invalid when password is valid but confirm password is empty', () => {
      passwordControl.setValue(validPassword);
      confirmPasswordControl.setValue(null);
      expect(passwordControl.valid).toBeTruthy();
      expect(confirmPasswordControl.invalid).toBeTruthy();

    });

    it('should mark invalid when password is empty but confirm password is valid', () => {
      passwordControl.setValue(null);
      confirmPasswordControl.setValue(validPassword);
      expect(passwordControl.valid).toBeFalsy();
      expect(confirmPasswordControl.valid).toBeFalsy();
    });
  });

  describe("dob validation", () => {
    let control: AbstractControl;

    beforeEach(() => {
      control = component.userForm.get('dob') as AbstractControl;
    });

    it('should mark invalid when it has no value', () => {
      control.setValue(null);
      expect(control.invalid).toBeTruthy();
    });

  });

  describe("country validation", () => {
    let control: AbstractControl;

    beforeEach(() => {
      control = component.userForm.get('country') as AbstractControl;
    });

    it('should mark invalid when it has no value', () => {
      control.setValue(null);
      expect(control.invalid).toBeTruthy();
    });

    it('should mark valid when it has a valid country', () => {
      control.setValue('1');
      expect(control.valid).toBeTruthy();
    });

  });

  describe("state validation", () => {
    let control: AbstractControl;

    beforeEach(() => {
      control = component.userForm.get('state') as AbstractControl;
    });

    it('should mark invalid when it has no value', () => {
      control.setValue(null);
      expect(control.invalid).toBeTruthy();
    });

    it('should mark valid when it has a valid state', () => {
      control.setValue('1');
      expect(control.valid).toBeTruthy();
    });

  });

  describe("city validation", () => {
    let control: AbstractControl;

    beforeEach(() => {
      control = component.userForm.get('city') as AbstractControl;
    });

    it('should mark invalid when it has no value', () => {
      control.setValue(null);
      expect(control.invalid).toBeTruthy();
    });

    it('should mark valid when it has a valid city', () => {
      control.setValue('1');
      expect(control.valid).toBeTruthy();
    });

  });

});
