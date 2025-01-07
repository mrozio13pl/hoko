import { useEffect, useState } from 'react';

export function createGlobals<T extends Record<string, any>>(state: T) {
    const listeners = new Set<React.Dispatch<React.SetStateAction<number>>>();

    const proxyState = new Proxy(state, {
        get(target, prop) {
            return target[prop as keyof T];
        },
        set(target, prop, value) {
            target[prop as keyof T] = value;

            listeners.forEach((listener) => listener((n) => n + 1));
            return true;
        },
    });

    return function useGlobalState() {
        const setSignal = useState(0)[1];

        useEffect(() => {
            listeners.add(setSignal);
            return () => {
                listeners.delete(setSignal);
            };
        }, []);

        return proxyState;
    };
}

export { createGlobals as globals };
