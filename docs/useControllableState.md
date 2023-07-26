# useControllableState Hook

The `useControllableState` hook is a custom React hook that provides a way to manage a stateful value in a controlled or uncontrolled manner. It allows you to specify whether the state should be controlled by a prop or handled internally within the component.

## Usage

```tsx
import React from 'react';
import useControllableState, { IUseControllableStateConfig } from './useControllableState';

// Assuming you have imported the useControllableState hook here...

type MyComponentProps = {
  controlledValue?: string;
  onChange?: (value: string) => void;
};

const MyComponent: React.FC<MyComponentProps> = ({ controlledValue, onChange }) => {
  // Configuration for useControllableState
  const config: IUseControllableStateConfig<string> = {
    defaultValue: 'default value', // Set your default value here or provide a function to calculate it.
    onChange, // Optional onChange callback function to be called when the value changes.
  };

  // Use the useControllableState hook
  const [value, setValue, isControlled] = useControllableState(controlledValue, config);

  // ... Rest of your component logic ...

  return (
    <div>
      {/* Use the 'value' and 'setValue' as needed */}
    </div>
  );
};
```

## API

### `useControllableState<T>(valueProp: T | undefined, config: IUseControllableStateConfig<T>)`

#### Parameters

- `valueProp: T | undefined`: The controlled value, i.e., the value managed externally by the parent component. If provided, the component's state will be controlled, and the `valueProp` will determine the current state value.

- `config: IUseControllableStateConfig<T>`: An object containing configuration options:

  - `defaultValue?: T | (() => T)`: An optional default value for the state when it is uncontrolled (i.e., when `valueProp` is not provided). This can be a constant value of type `T` or a function that returns the default value.

  - `onChange?: (value: T) => void`: An optional callback function to be called whenever the state value changes. It will be called with the updated value as its argument.

  - `shouldUpdate?: (prev: T, next: T) => boolean`: An optional function that determines whether the state should be updated when a new value is set. By default, it checks if the new value is different from the previous value.

#### Returns

- A tuple containing three elements:

  - `value: T`: The current state value, which can be controlled externally through `valueProp` or managed internally using the `defaultValue`.

  - `setValue: React.Dispatch<React.SetStateAction<T>>`: A function to update the state value. When called with a new value or a state updater function, it will update the state based on the provided configuration.

  - `isControlled: boolean`: A boolean value indicating whether the state is controlled (`true`) or uncontrolled (`false`).

## How it Works

1. The `useControllableState` hook takes in a `valueProp` and a configuration object `config`.

2. Inside the hook, it uses the `useState` hook to create an internal state variable `uncontrolledState` and a setter function `setUncontrolledState`. The initial value for `uncontrolledState` is determined based on the `defaultValue` provided in the configuration.

3. It checks whether the component is controlled by examining if `valueProp` is defined (i.e., `valueProp !== undefined`).

4. The hook creates a memoized callback reference for the `onChange` and `shouldUpdate` functions using the `useCallbackRef` hook. This ensures that these callbacks always reference the latest versions.

5. The `setValue` function is defined as a memoized callback that takes in a `next` value or a state updater function. It checks whether the state should be updated based on the `shouldUpdate` function and whether the component is controlled or not.

6. If the component is uncontrolled, the internal state (`uncontrolledState`) is updated with the new value (`nextValue`). If the component is controlled, the `onChange` callback is called with the new value (`nextValue`).

7. The hook returns the current state value (`value`), the `setValue` function, and a boolean flag `isControlled` indicating whether the component is controlled.