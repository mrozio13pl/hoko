import { expect, test, describe } from 'vitest';
import { createState } from 'hoko';
import { renderHook, act } from '@testing-library/react';
import React from 'react';

describe('state', () => {
    test('createState basic (numeric)', () => {
        const hook = renderHook(() => {
            const state = createState({ count: 0 });

            React.useEffect(() => {
                state.count++;
            }, []);

            return state;
        });

        expect(hook.result.current.count).toBe(1);
    });

    test('detect changes in state (useEffect)', () => {
        const maxRenders = 3;
        let amountOfRendersSpecific = 0,
            amountOfRendersUnrelated = 0;

        const hook = renderHook(() => {
            const state = createState({ count: 0, unrelated: 0 });

            React.useEffect(() => {
                if (amountOfRendersSpecific < maxRenders) {
                    state.count++;
                }
                amountOfRendersSpecific++;
            }, [state.count]);

            React.useEffect(() => {
                amountOfRendersUnrelated++;
            }, [state.unrelated]);

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
