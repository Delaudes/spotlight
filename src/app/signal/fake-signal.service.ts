import { SignalService } from "./signal.service";

export class FakeSignalService<T> implements SignalService<T> {
    private value = undefined as T;

    get(): T {
        return this.value;
    }

    set(value: T): void {
        this.value = value;
    }

    update(updater: (currentValue: T) => T): void {
        this.value = updater(this.value);
    }
}