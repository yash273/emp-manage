import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Route, User } from 'src/app/core/auth/interface/user';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { SharedService } from 'src/shared/service/shared.service';

const enFlag = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/64px-Flag_of_the_United_Kingdom_%283-5%29.svg.png'
const esFlag = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/64px-Flag_of_Spain.svg.png'
const deFlag = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/64px-Flag_of_Germany.svg.png'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userId!: any;
  currentUser!: User;
  selectedLang!: string;

  languageList = [
    {
      code: 'en',
      label: 'English',
      img: enFlag
    },
    {
      code: 'es',
      label: 'Spanish',
      img: esFlag
    },
    {
      code: 'de',
      label: 'German',
      img: deFlag
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService,
    public translate: TranslateService
  ) {
    this.userId = this.sharedService.getUserFromLocal();

  }

  logout() {
    this.sharedService.removeLoggedUser();
    this.sharedService.showAlert('Successfully Logged out', "success")
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    this.getUserData();
    this.getSelectedLanguage();
  }
  getSelectedLanguage() {
    const storedLang = this.sharedService.getLangFromLocal();
    if (storedLang) {
      console.log(storedLang)
      this.selectedLang = storedLang;
    } else {
      this.selectedLang = 'en';
    }
  }

  getUserData() {
    this.authService.getUserData(this.userId).subscribe((res) => {
      this.currentUser = res;
    })
  }

  switchLang(lang: any) {
    this.translate.use(lang);
    this.selectedLang = lang;
    this.sharedService.saveLangToLocal(lang);
  }

  getFlagIcon(languageCode: string): string {
    switch (languageCode) {
      case 'en':
        return enFlag
      case 'es':
        return esFlag
      case 'de':
        return deFlag
      default:
        return enFlag
    }
  }

}
