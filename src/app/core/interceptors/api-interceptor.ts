import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, throwError} from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Ignore full URLs (ex. https://abc.com)
  if (req.url.startsWith("http")) {
    return next(req);
  }

  const apiReq = req.clone({
    url: `${environment.apiRoot}${req.url}`
  });

  return next(apiReq).pipe(
    catchError((err: HttpErrorResponse) => {
      console.error(err)
      return throwError(() => err);
    })
  );
};
