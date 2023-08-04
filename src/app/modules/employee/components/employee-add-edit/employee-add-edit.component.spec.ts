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
    fixture.detectChanges();
  });

  it("Check component", () => {
    expect(component).toBeDefined();
  })

  describe("OnInit", () => {
    it("initializeForm function should be called", () => {
      spyOn(component, 'initializeForm')
      component.ngOnInit();
      expect(component.initializeForm).toHaveBeenCalled();
    })
    it("getAllRoutes function should be called", () => {
      spyOn(component, 'getAllRoutes')
      component.ngOnInit();
      expect(component.getAllRoutes).toHaveBeenCalled();
    })
    it("getFormatFromLocal function should be called", () => {
      spyOn(component, 'getFormatFromLocal')
      component.ngOnInit();
      expect(component.getFormatFromLocal).toHaveBeenCalled();
    })
    it("getCountries function should be called", () => {
      spyOn(component, 'getCountries')
      component.ngOnInit();
      expect(component.getCountries).toHaveBeenCalled();
    })
  })

  it('should update user data and show success alert when form is valid', fakeAsync(() => {
    const mockUser = {
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

    spyOn(authService, 'updateUser').and.returnValue(of(mockUser));
    spyOn(sharedService, 'showAlert');
    const mockRouter = TestBed.inject(Router);
    spyOn(mockRouter, 'navigate');

    component.userForm.patchValue({
      first_name: 'NewJohn',
      last_name: 'Doe',
      email: 'john1.doe@example.com',
      password: 'password!!11PP',
      confirm_password: 'password!!11PP',
      mobile: 1234567890,
      role: 1,
      country: 1,
      state: 2,
      city: 2,
      dob: "2023-08-30T18:30:00.000Z",
      route_rights: [1, 2, 3]
    });

    component.EditUser();

    tick();

    expect(authService.updateUser).toHaveBeenCalled();
    expect(sharedService.showAlert).toHaveBeenCalledWith('User Updated Successfully!', 'success');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/employee']);
  }));

  it('should populate the form for existing user', fakeAsync(() => {
    const userId = 1;
    const user = {
      id: userId,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      mobile: 1234567890,
      role: 1,
      country: 1,
      state: 2,
      city: 2,
      route_rights: [1, 2, 3]
    };

    spyOn(authService, 'getUserData').and.returnValue(of(user));
    component.userId = userId;
    component.populateForm();

    tick();

    expect(component.userForm.get('first_name')?.value).toBe('John');
    expect(component.userForm.get('last_name')?.value).toBe('Doe');
    expect(component.userForm.get('email')?.value).toBe('john.doe@example.com');

  }));

  it('should add a new user and navigate to "/employee"', fakeAsync(() => {
    const mockUser = {
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
      dob: "2023-08-30T18:30:00.000Z",
      route_rights: [1, 2, 3]
    }
    spyOn(authService, 'registerUser').and.returnValue(of(mockUser));
    spyOn(sharedService, 'showAlert');
    const mockRouter = TestBed.inject(Router);
    spyOn(mockRouter, 'navigate');

    component.userForm.patchValue({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password!!11PP',
      confirm_password: 'password!!11PP',
      mobile: 1234567890,
      role: 1,
      country: 1,
      state: 2,
      city: 2,
      dob: "2023-08-30T18:30:00.000Z",
      route_rights: [1, 2, 3]
    });
    component.addUser();


    tick();

    expect(sharedService.showAlert).toHaveBeenCalledWith('User Added!', 'success');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/employee']);
  }));

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






});
