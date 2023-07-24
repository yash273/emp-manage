import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/auth/interface/user';
import { SharedService } from 'src/shared/service/shared.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(
    private sharedService: SharedService
  ) {

  }

  ngOnInit(): void {

  }
}
