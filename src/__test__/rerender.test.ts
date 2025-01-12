import { expect, test, describe } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { rerender as useRerender } from 'hoko';

describe('useRerender', () => {
    test('should trigger component rerender', () => {
        let renderCount = 0;

        const { result } = renderHook(() => {
            const rerender = useRerender();
            renderCount++;
            return rerender;
        });

        expect(renderCount).toBe(1); // initial

        // trigger rerender
        act(() => {
            result.current();
        });

        expect(renderCount).toBe(2);

        act(() => {
            result.current();
        });

        expect(renderCount).toBe(3);
    });
});
