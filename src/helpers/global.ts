import { useEffect, useState } from 'react';

export type Listener = React.Dispatch<React.SetStateAction<number>>;

export function createGlobals<T extends Record<string, any>>(state: T) {
    const listeners = new Set<Listener>();

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

    const subscribe = () => {
        const listener = useState(0)[1];

        listeners.add(listener);

        // unsubscribe
        return () => {
            listeners.delete(listener);
        };
    };

    const setState = (state: T): void => {
        Object.entries(state).forEach(([key, value]) => {
            proxyState[key as keyof T] = value;
        });
    };

    const api = {
        getState: () => proxyState,
        setState,
        initialState: state,
        subscribe,
    } as const;

    function useGlobalState() {
        const setSignal = useState(0)[1];

        useEffect(() => {
            listeners.add(setSignal);
            return () => {
                listeners.delete(setSignal);
            };
        }, []);

        return proxyState;
    }

    return Object.assign(useGlobalState, api);
}

export { createGlobals as globals };
