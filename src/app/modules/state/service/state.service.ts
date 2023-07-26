import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(
    private http: HttpClient
  ) { }

  getStates() {
    return this.http.get(environment.baseURL + `states`)
  }

  addState(data: any) {
    return this.http.post(environment.baseURL + `states`, data)
  }

  getStateData(stateId: number) {
    return this.http.get(environment.baseURL + `states/${stateId}`)
  }

  updateState(data: any, stateId: number) {
    return this.http.put(environment.baseURL + `states/${stateId}`, data)
  }
}
