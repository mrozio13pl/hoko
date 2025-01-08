# hoko [![npm](https://img.shields.io/npm/v/hoko?style=plastic&label=%20&color=%23008080)](https://www.npmjs.com/package/hoko) <a href="https://github.com/mrozio13pl/hoko"><img src="./hoko.svg" alt="logo" align="right" /></a>

The jQuery for React.

A small library with utilities and shorthands for React.

## Getting started

To get started, import the library as follows:

```tsx
import * as $ from 'hoko';
```

To create your first state variable, use the `$.state` function:

```tsx
import * as $ from 'hoko'; // 225 B

function Component() {
    const state = $.state({
        count: 0,
    });

    return (
        <div>
            <h1>Count: {state.count}</h1>
            <button onClick={() => state.count++}>Increment</button>
        </div>
    );
}
```

## Installation

Install hoko from `npm` with your package manager of your choice:

```bash
npm install hoko      # npm
yarn add hoko         # yarn
bun add hoko          # bun
pnpm add hoko         # pnpm
```

## API

### State management

##### `$.state({ ... })`

Creates a local state variable inside a React component.<br /> This allows for
managing multiple state variables inside a single hook.

```tsx
const state = $.state({
    count: 0,
});

console.log(state.count); // 0
state.count = 1; // updating the state
```

Alternatively, you can use the `createState` exported from `hoko`.

> NOTE: Unfortunately, due to properties being a
> [setter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)
> and
> [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)
> pair, the state variable is mutable, but cannot be destructured.

```diff
- let { count } = $.state({ count: 0 });
```

##### `$.globals({ ... })`

Creates a global state variable, which is shared between all components.
Similarly to `$.state`, the state variable is mutable, but cannot be
destructured.

```tsx
const useState = $.globals({
    count: 0,
});

function Component() {
    const state = useState();

    return (
        <div>
            <h1>Count: {state.count}</h1>
            <button onClick={() => state.count++}>Increment</button>
        </div>
    );
}
```

Alternatively, you can use the `createGlobals` exported from `hoko`.

### Shorthands

##### `$.ref`

A shorthand for [`React.useRef`](https://react.dev/reference/react/useRef) that
passes `null` as an argument by default.

##### `$.id`

A shorthand for [`React.useId`](https://react.dev/reference/react/useId).

##### `$.effect` or `$.on`

A shorthand for
[`React.useEffect`](https://react.dev/reference/react/useEffect).

##### `$.reducer`

A shorthand for
[`React.useReducer`](https://react.dev/reference/react/useReducer).

##### `$.transition`

A shorthand for
[`React.useTransition`](https://react.dev/reference/react/useTransition).

## License

MIT 💖
