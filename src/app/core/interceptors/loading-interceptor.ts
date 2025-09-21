import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {Loading} from '../../services/loading';
import {finalize} from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(Loading);
  loadingService.loadingOn();

  return next(req).pipe(
    finalize(() => {
      loadingService.loadingOff();
    })
  );
};
