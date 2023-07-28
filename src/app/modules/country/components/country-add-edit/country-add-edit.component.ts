import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../service/country.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/shared/service/shared.service';

@Component({
  selector: 'app-country-add-edit',
  templateUrl: './country-add-edit.component.html',
  styleUrls: ['./country-add-edit.component.scss']
})
export class CountryAddEditComponent implements OnInit {

  countryData: any;
  countryForm!: FormGroup;
  countryId!: number;
  previousData: any;

  constructor(
    private sharedService: SharedService,
    private countryService: CountryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.countryId = this.route.snapshot.params['id'];
    if (this.countryId) {
      this.populateForm();
    }
  }

  initForm() {
    this.countryForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    })
  }

  populateForm() {
    this.countryService.getCountryData(this.countryId).subscribe((res) => {
      this.previousData = res;
      this.countryForm.patchValue(res);
    },
      (err) => {
        this.router.navigate(['**']);
      }
    );
  }

  addCountry() {

    if (this.countryForm.valid) {
      const formData = { ...this.countryForm.value };

      this.countryService.addCountry(formData).subscribe((res) => {
        if (res) {
          this.sharedService.showAlert("Country Added Successfully!", "success");
        } else {
          this.sharedService.showAlert("Oops! Something Went Wrong!", 'default');
        }
      });
      this.router.navigate(['/dashboard'])
    } else {
      this.sharedService.showAlert('Form is invalid. Please check the fields.', 'error');
    }
  }

  editCountry() {
    if (this.countryForm.valid) {
      const formData = { ...this.countryForm.value };
      this.countryService.updateCountry(formData, this.countryId).subscribe((res) => {
        if (res) {
          this.sharedService.showAlert("Country Updated Successfully!", "success");
        } else {
          this.sharedService.showAlert("Oops! Something Went Wrong!", 'default');
        }
      });
      this.router.navigate(['/dashboard'])
    } else {
      this.sharedService.showAlert('Form is invalid. Please check the fields.', 'error');
    }
  }
}
