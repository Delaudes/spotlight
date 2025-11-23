
export interface SignalService<T> {
    get(): T
    set(value: T): void
    update(updater: (currentValue: T) => T): void
}

