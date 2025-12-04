import { InjectionToken } from "@angular/core";

export interface RouterService {
    navigateTo(path: string): void;
}

export const ROUTER_SERVICE_TOKEN = new InjectionToken<RouterService>('ROUTER_SERVICE');