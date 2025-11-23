import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AngularRouterService } from './router/angular-router.service';
import { ROUTER_SERVICE_TOKEN } from './router/router.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: ROUTER_SERVICE_TOKEN,
      useClass: AngularRouterService
    },
  ]
};
