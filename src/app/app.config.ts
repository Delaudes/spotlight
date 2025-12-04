import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { GAME_PROVIDER } from './game/game.provider';
import { HOME_PROVIDER } from './home/home.provider';
import { AngularRouterService } from './router/angular-router.service';
import { ROUTER_SERVICE_TOKEN } from './router/router.service';
import { LocalStorageService } from './storage/local-storage.service';
import { STORAGE_SERVICE_TOKEN } from './storage/storage.service';
import { TROPHIES_PROVIDER } from './trophies/trophies.provider';

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
    },
    TROPHIES_PROVIDER,
    GAME_PROVIDER,
    HOME_PROVIDER
  ]
};
