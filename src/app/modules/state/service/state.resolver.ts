import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { StateService } from './state.service';

export const stateResolver: ResolveFn<any> = (route, state) => {
  const stateService = inject(StateService);
  const stateId = route.params['id'];
  return stateService.getStateData(stateId);;
};
