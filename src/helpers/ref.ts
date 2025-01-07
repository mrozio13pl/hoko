import { useRef } from 'react';

export function createRef<T>(initialValue: T = null as T) {
    return useRef<T>(initialValue);
}

export { createRef as ref };
