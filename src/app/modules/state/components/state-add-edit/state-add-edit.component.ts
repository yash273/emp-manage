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
  stateId!: number | null;
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
    this.stateId = this.route.snapshot.params['id'];
    this.getCountries();
    this.initForm();
    if (this.stateId) {
      this.populateForm();
    }
  }

  initForm() {
    this.stateForm = this.formBuilder.group({
      countryId: ['', Validators.required],
      name: ['', Validators.required]
    })
  }

  countryChange() {
    this.stateForm.get('name')?.setValue(null)
  }

  getCountries() {
    this.sharedService.getCounties().subscribe((res) => {
      this.countries = res;
    })
  }

  populateForm() {
    if (this.stateId) {
      this.stateService.getStateData(this.stateId).subscribe((res) => {
        this.prevData = res;
        this.stateForm.get('countryId')?.disable();
        this.stateForm.patchValue(this.prevData);
      })
    }
  }

  addState() {
    console.log(this.stateForm.value)
    if (this.stateForm.valid) {
      const formData = { ...this.stateForm.value };

      this.stateService.addState(formData).subscribe((res) => {
        if (res) {
          console.log('Added');
        } else {
          console.log('Something went wrong');
        }
      });
      this.router.navigate(['/dashboard'])
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }

  editState() {
    console.log(this.stateForm.value)
    if (this.stateForm.valid) {
      this.stateForm.get('countryId')?.enable();
      const formData = { ...this.stateForm.value };
      if (this.stateId) {

        this.stateService.updateState(formData, this.stateId).subscribe((res) => {
          if (res) {
            console.log('Added');
          } else {
            console.log('Something went wrong');
          }
        });
      }
      this.router.navigate(['/dashboard'])
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }

}
