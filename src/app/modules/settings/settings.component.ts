import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  constructor(
    private router: Router
  ) {

  }

  selectedFormat!: string;
  formats = [
    {
      name: 'MM/DD/YYYY',
      value: "MM/dd/yyyy"
    },
    {
      name: 'DD/MM/YYYY',
      value: "dd/MM/yyyy"
    },
    {
      name: 'YYYY/MM/DD',
      value: "yyyy/MM/dd"
    }
  ]

  ngOnInit(): void {
    const dateFormat = localStorage.getItem("format");
    if (dateFormat) {
      this.selectedFormat = dateFormat
    } else {
      this.selectedFormat = 'MM/dd/yyyy'
    }
  }

  save() {
    localStorage.setItem("format", this.selectedFormat);
    console.log(this.selectedFormat);
    this.router.navigate(['/employee'])
  }



}
