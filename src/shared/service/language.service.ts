import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  private selectedLangSubject = new BehaviorSubject<string>(this.getStoredLang());
  selectedLang$ = this.selectedLangSubject.asObservable();

  setSelectedLang(lang: string) {
    localStorage.setItem('selectedLang', lang);
    this.selectedLangSubject.next(lang);
  }

  getStoredLang() {
    return localStorage.getItem('selectedLang') || 'en';
  }
}
