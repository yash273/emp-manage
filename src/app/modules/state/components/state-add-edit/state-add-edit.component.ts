import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/shared/service/shared.service';
import { StateService } from '../../service/state.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-state-add-edit',
  templateUrl: './state-add-edit.component.html',
  styleUrls: ['./state-add-edit.component.scss']
})
export class StateAddEditComponent implements OnInit {

  stateForm!: FormGroup;
  countries: any;
  stateId!: number;
  prevData: any;

  constructor(
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private stateService: StateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getCountries();
    this.initForm();
    this.getStateDataFromResolver();
  }

  initForm() {
    this.stateForm = this.formBuilder.group({
      countryId: ['', Validators.required],
      name: ['', Validators.required]
    })
  }

  getStateDataFromResolver() {
    this.route.data.subscribe((data) => {
      this.prevData = data['state'];
      if (this.prevData) {
        this.stateId = this.prevData.id;
        this.stateForm.get('countryId')?.disable();
        this.stateForm.patchValue(this.prevData);
      }
    });
  }

  countryChange() {
    this.stateForm.get('name')?.setValue(null);
  }

  getCountries() {
    this.sharedService.getCounties().subscribe((res) => {
      this.countries = res;
    })
  }

  addState() {
    if (this.stateForm.valid) {
      const formData = { ...this.stateForm.value };

      this.stateService.addState(formData).subscribe((res) => {
        if (res) {
          this.sharedService.showAlert("State Added Successfully!", "success");
        } else {
          this.sharedService.showAlert("Oops! Something Went Wrong!", 'default');
        }
      });
      this.router.navigate(['/state'])
    } else {
      this.sharedService.showAlert('Form is invalid. Please check the fields.', 'error');
    }
  }

  editState() {
    if (this.stateForm.valid) {
      this.stateForm.get('countryId')?.enable();
      const formData = { ...this.stateForm.value };
      if (this.stateId) {

        this.stateService.updateState(formData, this.stateId).subscribe((res) => {
          if (res) {
            this.sharedService.showAlert("State Updated Successfully!", "success");
          } else {
            this.sharedService.showAlert("Oops! Something Went Wrong!", 'default');
          }
        });
      }
      this.router.navigate(['/state'])
    } else {
      this.sharedService.showAlert('Form is invalid. Please check the fields.', 'error');
    }
  }

}
