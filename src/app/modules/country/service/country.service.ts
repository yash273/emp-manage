import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private http: HttpClient
  ) { }

  addCountry(data: any): Observable<any> {
    return this.http.post<any>(environment.baseURL + `countries`, data);
  }

  updateCountry(data: any, countryId: number): Observable<any> {
    return this.http.put<any>(environment.baseURL + `countries/${countryId}`, data)
  }

  getCountryData(countryId: number) {
    return this.http.get(environment.baseURL + `countries/${countryId}`)
  }

}
