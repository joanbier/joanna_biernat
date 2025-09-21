import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import {PreloadAllModules, provideRouter, withPreloading} from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {apiInterceptor} from './core/interceptors/api-interceptor';
import {loadingInterceptor} from './core/interceptors/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(withInterceptors([loadingInterceptor, apiInterceptor])),
  ]
};
