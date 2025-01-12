import { useState, useCallback } from 'react';

export function rerender() {
    const [, setState] = useState(0);

    return useCallback(() => setState((prev) => prev + 1), []);
}
