import { Component } from '@angular/core';
import { User } from 'src/app/core/auth/interface/user';
import { SharedService } from 'src/shared/service/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  userId!: User

  constructor(
    private sharedService: SharedService
  ) {

  }

  ngOnInit(): void {
    const user = this.sharedService.getUserFromLocal();
    if (user) {
      this.userId = JSON.parse(user)
      console.log(this.userId)
    }
  }
}
