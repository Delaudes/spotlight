import { StorageService } from "./storage.service";

export class FakeStorageService implements StorageService {
    store: Map<string, unknown> = new Map();

    setItem<T>(key: string, value: T): void {

        this.store.set(key, value);
    }

    getItem<T>(key: string): T | undefined {
        return this.store.get(key) as T;
    }
}