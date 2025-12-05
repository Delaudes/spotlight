import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AngularRouterService } from './router/angular-router.service';
import { ROUTER_SERVICE_TOKEN } from './router/router.service';
import { LocalStorageService } from './storage/local-storage.service';
import { STORAGE_SERVICE_TOKEN } from './storage/storage.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: ROUTER_SERVICE_TOKEN,
      useClass: AngularRouterService
    },
    {
      provide: STORAGE_SERVICE_TOKEN,
      useClass: LocalStorageService
    }
  ]
};
