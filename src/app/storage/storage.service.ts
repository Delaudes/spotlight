import { InjectionToken } from "@angular/core";

export interface StorageService {
    setItem<T>(key: string, value: T): void;
    getItem<T>(key: string): T | undefined;
}

export const STORAGE_SERVICE_TOKEN = new InjectionToken<StorageService>('STORAGE_SERVICE');