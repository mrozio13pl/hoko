import { test, expect } from 'vitest';
import * as $ from 'hoko';

test('exports', () => {
    expect(Object.keys($).length).toBeGreaterThan(0);
    Object.keys($).forEach((module) => {
        expect($[module as keyof typeof $]).toBeDefined();
    });
});
