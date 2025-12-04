import { StorageService } from "./storage.service";

export class LocalStorageService implements StorageService {
    setItem<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    };

    getItem<T>(key: string): T | undefined {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) as T : undefined;
    }
}