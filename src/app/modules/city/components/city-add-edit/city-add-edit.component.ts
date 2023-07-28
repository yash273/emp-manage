import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from 'src/app/modules/state/service/state.service';
import { SharedService } from 'src/shared/service/shared.service';
import { CityService } from '../../service/city.service';

@Component({
  selector: 'app-city-add-edit',
  templateUrl: './city-add-edit.component.html',
  styleUrls: ['./city-add-edit.component.scss']
})
export class CityAddEditComponent implements OnInit {

  states!: any;
  cityForm !: FormGroup;
  cityId!: number;
  prevData: any;

  constructor(
    private sharedService: SharedService,
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private stateService: StateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.stateService.getStates().subscribe((res) => {
      this.states = res;
    });
  }

  ngOnInit(): void {
    this.cityId = this.route.snapshot.params['id'];
    this.initForm();
    if (this.cityId) {
      this.populateForm();
    }
  }

  initForm() {
    this.cityForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      stateId: ['', [Validators.required]]
    })
  }

  populateForm() {
    if (this.cityId) {
      this.cityService.getCityData(this.cityId).subscribe((res) => {
        this.prevData = res;
        this.cityForm.get('stateId')?.disable();
        this.cityForm.patchValue(this.prevData);
      },
        (err) => {
          this.router.navigate(['**']);
        }
      );
    }
  }

  stateChange() {
    this.cityForm.get('name')?.setValue(null);
  }

  addCity() {
    if (this.cityForm.valid) {
      const formData = { ...this.cityForm.value };

      this.cityService.addCities(formData).subscribe((res) => {
        if (res) {
          this.sharedService.showAlert("City Added Successfully!", "success");
        } else {
          this.sharedService.showAlert("Oops! Something Went Wrong!", 'default');
        }
      });
      this.router.navigate(['/dashboard']);
    } else {
      this.sharedService.showAlert('Form is invalid. Please check the fields.', 'error');
    }
  }

  editCity() {
    if (this.cityForm.valid) {
      this.cityForm.get('stateId')?.enable();
      const formData = { ...this.cityForm.value };
      if (this.cityId) {
        this.cityService.updateCity(formData, this.cityId).subscribe((res) => {
          if (res) {
            this.sharedService.showAlert("City Updated Successfully!", "success");
          } else {
            this.sharedService.showAlert("Oops! Something Went Wrong!", 'default');
          }
        });
        this.router.navigate(['/dashboard']);
      }
    } else {
      this.sharedService.showAlert('Form is invalid. Please check the fields.', 'error');
    }
  }
}
