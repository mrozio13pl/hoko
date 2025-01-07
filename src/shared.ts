import { useState } from 'react';

export type InitState<T, K extends string> = {
    [x in K]: T;
};

/** @private */
export function initState<T>(
    key: string,
    initialValue: T = void 0 as T
): InitState<T, typeof key> {
    const [value, setValue] = useState<T>(initialValue);

    return {
        get [key]() {
            return value;
        },
        set [key](newValue: T) {
            setValue(newValue);
        },
    };
}
