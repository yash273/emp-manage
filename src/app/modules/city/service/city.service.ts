import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private http: HttpClient
  ) { }

  getCities() {
    return this.http.get(environment.baseURL + `cities`)
  }

  addCities(data: any) {
    return this.http.post(environment.baseURL + `cities`, data)
  }

  getCityData(cityId: number) {
    return this.http.get(environment.baseURL + `cities/${cityId}`)
  }

  updateCity(data: any, cityId: number) {
    return this.http.put(environment.baseURL + `cities/${cityId}`, data)
  }
}
