import { signal } from "@angular/core";
import { SignalService } from "./signal.service";

export class AngularSignalService<T> implements SignalService<T> {
    private _signal = signal<T>(undefined as T)

    get(): T {
        return this._signal();
    }

    set(value: T): void {
        this._signal.set(value);
    }

    update(updater: (currentValue: T) => T): void {
        this._signal.update(updater);
    }
}