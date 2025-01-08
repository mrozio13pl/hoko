import { initState } from '@/shared';

export function createState<T extends Record<string, any>>(
    value: T
): { [K in keyof T]: T[K] } {
    return Object.entries(value).reduce((acc, [key, initialValue]) => {
        const state = initState(key, initialValue);

        Object.defineProperty(acc, key, {
            get: () => state[key],
            set: (newValue) => (state[key] = newValue),
            enumerable: true,
            configurable: true,
        });

        return acc;
    }, {} as { [K in keyof T]: T[K] });
}

export { createState as state };
