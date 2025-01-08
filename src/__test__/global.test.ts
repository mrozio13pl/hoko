import { expect, test, describe } from 'vitest';
import { createGlobals } from 'hoko';
import { act, renderHook } from '@testing-library/react';
import React from 'react';

describe('global', () => {
    test('createGlobals', () => {
        const useGlobalState = createGlobals({
            count: 0,
            user: { name: 'John Doe' },
        });

        renderHook(() => {
            const state = useGlobalState();

            expect(state.count).toBe(0);
            expect(state.user.name).toBe('John Doe');

            state.count++;
            expect(state.count).toBe(1);
            state.user.name = 'Jane Doe';

            expect(state.user.name).toBe('Jane Doe');
        });
    });

    test('detect changes in state (useEffect)', () => {
        const useGlobalState = createGlobals({
            count: 0,
            user: { name: 'John Doe' },
        });

        const maxRenders = 3;
        let amountOfRendersSpecific = 0,
            amountOfRendersUnrelated = 0;

        const hook = renderHook(() => {
            const state = useGlobalState();

            React.useEffect(() => {
                if (amountOfRendersSpecific < maxRenders) {
                    state.count++;
                }
                amountOfRendersSpecific++;
            }, [state.count]);

            React.useEffect(() => {
                amountOfRendersUnrelated++;
            }, [state.user]);

            return state;
        });

        act(() => {
            hook.rerender();
        });

        expect(amountOfRendersSpecific).toBe(4);
        expect(amountOfRendersUnrelated).toBe(1);
        expect(hook.result.current.count).toBe(3);
    });
});
