import React from 'react';
import ReactDOM from 'react-dom/client';
import * as $ from 'hoko';

export default function App() {
    const state = $.state({ count: 0 });

    return (
        <div>
            <h1>Count: {state.count}</h1>
            <button onClick={() => state.count++}>Increment</button>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
