import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../service/country.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    this.countryService.getCountryData(this.countryId).subscribe((res => {
      this.previousData = res;
      this.countryForm.patchValue(res);
    }))
  }

  addCountry() {
    console.log(this.countryForm)

    if (this.countryForm.valid) {
      const formData = { ...this.countryForm.value };

      this.countryService.addCountry(formData).subscribe((res) => {
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

  editCountry() {
    if (this.countryForm.valid) {
      const formData = { ...this.countryForm.value };
      this.countryService.updateCountry(formData, this.countryId).subscribe((res) => {
        if (res) {
          console.log('Updated');
        } else {
          console.log('Something went wrong');
        }
      });
      this.router.navigate(['/dashboard'])
    } else {
      console.log(this.countryId)
      console.log('Form is invalid. Please check the fields.');
    }
  }
}
