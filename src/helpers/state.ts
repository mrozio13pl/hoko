import { initState } from '@/shared';

export function createState<T extends Record<string, any>>(
    value: T
): { [K in keyof T]: T[K] } {
    return Object.entries(value).reduce(
        (acc, [key, initialValue]) =>
            initState(key, initialValue) as { [K in keyof T]: T[K] },
        {} as { [K in keyof T]: T[K] }
    );
}

export { createState as state };
